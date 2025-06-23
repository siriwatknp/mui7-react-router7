# Emotion Package Patching Scripts

These scripts add `"type": "module"` to @emotion packages to resolve ESM/CJS compatibility issues with Vite 6 in development.

## Package Manager Compatibility

### ✅ Supported:

- **npm** - Full support
- **pnpm** - Full support (works with symlinks)
- **yarn v1 (classic)** - Full support
- **yarn v2+ with nodeLinker: node-modules** - Full support

### ❌ Not Supported:

- **yarn v2+ with PnP** - Cannot modify packages in PnP mode

## Usage

### Automatic (Recommended)

The `predev` script automatically runs before `npm run dev`:

```bash
npm run dev    # Automatically patches then starts dev server
pnpm dev       # Also works with pnpm
yarn dev       # Also works with yarn
```

### Manual

```bash
# Patch packages
npm run patch:emotion

# Unpatch packages (restore originals)
npm run unpatch:emotion
```

## How It Works

1. **Detects package manager** by checking for lock files
2. **Finds @emotion packages** in `node_modules/@emotion/*`
3. **Modifies package.json** files to add `"type": "module"`
4. **Provides feedback** on success/failure

## Notes

- Patches are lost when reinstalling packages
- The `predev` script ensures patches are reapplied automatically
- For Yarn PnP users: add `nodeLinker: node-modules` to `.yarnrc.yml`
