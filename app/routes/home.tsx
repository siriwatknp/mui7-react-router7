import type { Route } from "./+types/home";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Container from "@mui/material/Container";
import AppAppBar from "../components/AppAppBar";
import MainContent from "../components/MainContent";
import Latest from "../components/Latest";
import Footer from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", py: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
      <Footer />
    </>
  );
}
