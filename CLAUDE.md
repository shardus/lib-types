# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Build and Compile
- **Build the project**: `npm run build` or `npm run compile` - Compiles TypeScript to JavaScript
- **Clean build artifacts**: `npm run clean` - Removes compiled files
- **Prepare package**: `npm run prepare` - Runs compilation (used before publishing)

### Testing
- **Run all tests**: `npm test` - Runs Jest test suite
- **Run tests with coverage**: `npm run coverage` - Generates coverage report in `coverage/` directory
- **Run a single test file**: `npx jest test/src/path/to/file.test.ts`
- **Run tests in watch mode**: `npx jest --watch`

### Code Quality
- **Lint code**: `npm run lint` - Runs ESLint on TypeScript files in `src/`
- **Format check**: `npm run format-check` - Checks if code is properly formatted
- **Format fix**: `npm run format-fix` - Automatically formats code using Prettier
- **Fix all issues**: `npm run fix` - Runs GTS fix (includes linting and formatting)

### Release Commands
- **Patch release**: `npm run release:patch` - Bumps patch version and publishes
- **Minor release**: `npm run release:minor` - Bumps minor version and publishes
- **Major release**: `npm run release:major` - Bumps major version and publishes
- **Prerelease versions**: Use `release:prepatch`, `release:preminor`, `release:premajor`, or `release:prerelease`

## Architecture Overview

This is a pure TypeScript type definitions library for the Shardus/Shardus ecosystem. It contains no runtime code - only type definitions that ensure type safety across multiple related projects.

### Namespace Organization

The library exports types organized into three main namespaces:

1. **P2P**: Peer-to-peer networking types
   - Located in `src/p2p/` with 20+ modules
   - Includes types for node management, cycles, consensus, snapshots, and network communication
   - Key modules: `P2PTypes`, `NodeListTypes`, `CycleCreatorTypes`, `SnapshotTypes`

2. **StateManager**: State management types
   - Located in `src/state-manager/`
   - Includes `StateManagerTypes`, `StateMetaDataTypes`, and `shardFunctionTypes`

3. **Utils**: Utility functions and types
   - Located in `src/utils/`
   - Contains string manipulation utilities (`safeStringify`, `safeJsonParse`)
   - Type revival functions for deserialization

### Key Type Exports

The main `index.ts` also exports fundamental types used throughout the ecosystem:
- `hexstring` - Hex-encoded string type
- `publicKey`, `secretKey` - Cryptographic key types
- Various utility types and interfaces

### Testing Structure

Tests mirror the source structure in the `test/` directory. Each type module should have corresponding tests that verify:
- Type exports are correctly defined
- Utility functions work as expected
- Type guards and validators function properly

### Important Configuration Notes

1. **TypeScript**: Targets ES2021 with CommonJS modules. Note that strict mode is disabled.
2. **ESLint**: Configured with security plugins but currently ignores `.d.ts` files
3. **Prettier**: Uses single quotes, no semicolons, 120-char line width
4. **Jest**: Uses ts-jest for TypeScript support with coverage collection enabled

### Publishing Workflow

This package is published to npm under `@shardus/lib-types`. The release process:
1. Ensures all tests pass
2. Compiles TypeScript
3. Bumps version in package.json
4. Creates git tag and pushes to repository
5. Publishes to npm registry

When making changes, ensure all type definitions maintain backward compatibility to avoid breaking dependent projects in the Shardus ecosystem.