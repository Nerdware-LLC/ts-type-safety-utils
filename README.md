<div align="center">

  <a href="https://www.youtube.com/@nerdware-io">
    <img src="https://github.com/Nerdware-LLC/.github/blob/main/profile/nerdware_logo.png" height="120" alt="Nerdware logo" />
  </a>

  <h1>Nerdware TypeScript Type-Safety Utils</h1>

**TypeScript type-guards and other type-safety utils for any environment 🎉**<br>ESM ✅ CommonJS ✅ NodeJS ✅ browsers ✅

[![npm package][npm-badge]](https://www.npmjs.com/package/@nerdware/ts-type-safety-utils "View this project on npm")
[![Test Workflow][gh-test-badge]](.github/workflows/test.yaml "View Test Workflow file")
[![CodeCov][codecov-badge]](https://codecov.io/gh/Nerdware-LLC/ts-type-safety-utils "View CodeCov Report")
[![pre-commit][pre-commit-badge]](https://pre-commit.com "pre-commit.com")
[![semantic-release][semantic-badge]](https://github.com/semantic-release/semantic-release "github.com: semantic-release")
[![License: MIT][license-badge]](/LICENSE "View License")

<!--   BADGE LINKS   -->

[npm-badge]: https://img.shields.io/npm/v/@nerdware/ts-type-safety-utils?logo=npm&label=npm%40latest
[gh-test-badge]: https://github.com/Nerdware-LLC/ts-type-safety-utils/actions/workflows/test.yaml/badge.svg?branch=main
[codecov-badge]: https://codecov.io/gh/Nerdware-LLC/ts-type-safety-utils/graph/badge.svg?token=3I4RH7DAZX
[pre-commit-badge]: https://img.shields.io/badge/pre--commit-F8B424.svg?logo=pre-commit&logoColor=F8B424&labelColor=gray
[semantic-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-E10079.svg
[license-badge]: https://img.shields.io/badge/License-MIT-000080.svg

</div>

- [🚀 Getting Started](#-getting-started)
  - [📦 Installation](#-installation)
  - [🛠️ Usage](#️-usage)
- [⚙️ API](#️-api)
  - [Is-x type-guards](#is-x-type-guards)
  - [Other type-guards](#other-type-guards)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [💬 Contact](#-contact)

## 🚀 Getting Started

This package provides a lightweight set of TypeScript type-guards and other type-safety utils to suit common use cases.

### 📦 Installation

Install the package using your package manager of choice:

**npm**:

```bash
npm install @nerdware/ts-type-safety-utils
```

**yarn**:

```bash
yarn add @nerdware/ts-type-safety-utils
```

### 🛠️ Usage

```typescript
import { isPlainObject } from "@nerdware/ts-type-safety-utils";

// or const { isPlainObject } = require("@nerdware/ts-type-safety-utils");

const fooFn = (input: unknown) => {
  if (isPlainObject(input)) {
    // TS knows `input` is a plain object
  } else {
    // TS knows `input` is not a plain object
  }
};
```

## ⚙️ API

### Is-x type-guards

| Function                                  | Description                                                                      |
| :---------------------------------------- | :------------------------------------------------------------------------------- |
| [`isArray`](src/isArray.ts)               | Checks if a value is an array or readonly array                                  |
| [`isBigInt`](src/isBigInt.ts)             | Checks if a value is a BigInt                                                    |
| [`isBoolean`](src/isBoolean.ts)           | Checks if a value is a boolean                                                   |
| [`isBuffer`](src/isBuffer.ts)             | Checks if a value is a NodeJS Buffer (this is a no-op in browser envs)           |
| [`isDate`](src/isDate.ts)                 | Checks if a value is a Date                                                      |
| [`isError`](src/isError.ts)               | Checks if a value is an Error, an Error subclass, or DOMException                |
| [`isFunction`](src/isFunction.ts)         | Checks if a value is a function                                                  |
| [`isNull`](src/isNull.ts)                 | Checks if a value is null                                                        |
| [`isObjectLike`](src/isObjectLike.ts)     | Checks if a value is "object-like" (typeof "object" and not null)                |
| [`isPlainObject`](src/isPlainObject.ts)   | Checks if a value is a plain object                                              |
| [`isSafeInteger`](src/isSafeInteger.ts)   | Checks if a value is a safe integer                                              |
| [`isString`](src/isString.ts)             | Checks if a value is a string                                                    |
| [`isSymbol`](src/isSymbol.ts)             | Checks if a value is a symbol                                                    |
| [`isUndefined`](src/isUndefined.ts)       | Checks if a value is undefined                                                   |
| [`isUnsafeNumber`](src/isUnsafeNumber.ts) | Checks if a value is typeof "number" (🚨 allows `NaN` and other "number" values) |

### Other type-guards

| Function                                        | Description                                                                                          |
| :---------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| [`getTypeSafeError`](src/getTypeSafeError.ts)   | Converts any argument into an `Error` object                                                         |
| [`hasKey`](src/hasKey.ts)                       | Checks if an object contains the provided `key`                                                      |
| [`hasKeys`](src/hasKeys.ts)                     | Checks if an object contains all provided `keys`                                                     |
| [`safeJsonStringify`](src/safeJsonStringify.ts) | Type-safe `JSON.stringify` which will not throw if the input contains circular references or BigInts |

## 🤝 Contributing

Pull requests are welcome! Before you begin, please check existing [GitHub Issues](https://github.com/Nerdware-LLC/ts-type-safety-utils/issues) and [Pull Requests](https://github.com/Nerdware-LLC/ts-type-safety-utils/pulls) to see if your idea is already in the pipeline. If not, [here's a guide on how to contribute to this project](./CONTRIBUTING.md). Thank you!

## 📝 License

All files, scripts, and source code contained herein are open-source software licensed under an [MIT License](/LICENSE).

See [LICENSE](/LICENSE) for more information.

<div align="center">

## 💬 Contact

Trevor Anderson — [Trevor@Nerdware.cloud](mailto:trevor@nerdware.cloud) — [@trevor-anderson](https://github.com/trevor-anderson)

[<img src="https://github.com/trevor-anderson/trevor-anderson/blob/main/assets/github_logo_white.svg" height="40" alt="Check out Nerdware on GitHub" />](https://github.com/Nerdware-LLC)
&emsp;
[<img src="https://github.com/trevor-anderson/trevor-anderson/blob/main/assets/YouTube_icon_circle.svg" height="40" alt="Check out Nerdware on YouTube" />](https://www.youtube.com/@nerdware-io)
&emsp;
[<img src="https://github.com/trevor-anderson/trevor-anderson/blob/main/assets/LinkedIn_icon_circle.svg" height="40" alt="Trevor Anderson's LinkedIn" />](https://www.linkedin.com/in/meet-trevor-anderson/)
&emsp;
[<img src="https://github.com/trevor-anderson/trevor-anderson/blob/main/assets/email_icon_circle.svg" height="40" alt="Email Trevor Anderson" />](mailto:trevor@nerdware.cloud)

[**_Dare Mighty Things._**](https://www.youtube.com/watch?v=GO5FwsblpT8)

</div>
