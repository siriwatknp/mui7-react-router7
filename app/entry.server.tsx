import { PassThrough, Transform } from "node:stream";

import type { AppLoadContext, EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import createEmotionCache from "@emotion/cache";
import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";

export const streamTimeout = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
  // If you have middleware enabled:
  // loadContext: unstable_RouterContextProvider
) {
  const emotionCache = createEmotionCache({ key: "mui" });
  const { extractCriticalToChunks } = createEmotionServer(emotionCache);

  const html = renderToString(
    <EmotionCacheProvider value={emotionCache}>
      <ServerRouter context={routerContext} url={request.url} />
    </EmotionCacheProvider>
  );

  const { styles } = extractCriticalToChunks(html);

  responseHeaders.set("Content-Type", "text/html");

  return new Response(`<!DOCTYPE html>${html}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    let readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode
        ? "onAllReady"
        : "onShellReady";

    // const { pipe, abort } = renderToPipeableStream(
    //   <EmotionCacheProvider value={emotionCache}>
    //     <ServerRouter context={routerContext} url={request.url} />
    //   </EmotionCacheProvider>,
    //   {
    //     onAllReady() {
    //       shellRendered = true;
    //       const body = new PassThrough();
    //       const stream = createReadableStreamFromReadable(body);

    //       // body.on("data", (chunk) => {
    //       //   // console.log("chunk", chunk);
    //       //   // console.log(`Passing through ${chunk.length} bytes`);
    //       // });

    //       // const bodyWithStyles = emotionServer.renderStylesToNodeStream();

    //       // console.log(bodyWithStyles);

    //       // body.pipe(bodyWithStyles);
    //       responseHeaders.set("Content-Type", "text/html");

    //       resolve(
    //         // @ts-ignore
    //         new Response(stream, {
    //           headers: responseHeaders,
    //           status: responseStatusCode,
    //         })
    //       );

    //       pipe(body);
    //     },
    //     onShellError(error: unknown) {
    //       reject(error);
    //     },
    //     onError(error: unknown) {
    //       responseStatusCode = 500;
    //       // Log streaming rendering errors from inside the shell.  Don't log
    //       // errors encountered during initial shell rendering since they'll
    //       // reject and get logged in handleDocumentRequest.
    //       if (shellRendered) {
    //         console.error(error);
    //       }
    //     },
    //   }
    // );

    // Abort the rendering stream after the `streamTimeout` so it has time to
    // flush down the rejected boundaries
    // setTimeout(abort, streamTimeout + 1000);
  });
}
