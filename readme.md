# Overview

Shardus types includes the typescript type definitions for the shardus server, shardus crypto utils and shardus archive server. These type definitions are essential for ensuring type safety and compatibility when working with Shardus codebases.

## Installation

You can use Shardus Types in your projects by either installing it as a dependency or by cloning the repository and linking it to your project. Shardus Types is already used as a dependency whenever you run a validator. However, if you wish to utilize it for your own projects, you have the flexibility to do so by following the installation instructions provided below:

### Installation as a Dependency

To install Shardus Types as a dependency, simply run:

```bash
npm install @shardus/types
```

### Cloning and Linking

If you prefer to clone the repository and link it to your project, follow these steps:

1. Clone and navigate into the cloned repository:

```bash
git clone git@gitlab.com:shardus/shardus-types.git
cd types
```

2. Install dependencies and prepare the package:

```bash
npm ci
npm run prepare
```

3. Link the package to your project:

```bash
npm link
```

Once installed or linked, you can import the Shardus type definitions in your TypeScript files:

```bash
import { ShardusType } from '@shardus/types';
```

## Contributing

For any issues or suggestions regarding Shardus Types, feel free to submit an issue on the GitHub repository. We welcome your feedback!

Contributions to Shardeum Explorer are highly encouraged! We welcome everyone to participate in our codebases, issue trackers, and any other form of communication. However, we expect all contributors to adhere to our [code of conduct](./CODE_OF_CONDUCT.md) to ensure a positive and collaborative environment for all involved in the project.