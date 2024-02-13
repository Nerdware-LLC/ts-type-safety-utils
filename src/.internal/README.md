## Internal Modules

This dir contains internal modules which provide cross-environment compatibility. These modules parse the execution environment and convert missing globals into no-op functions or empty objects, thereby making it possible for this library to be used in both NodeJS and browser environments without issue.

Most of these internal modules were either copied from [`lodash`](https://github.com/lodash/lodash/tree/main/src/.internal) or reflect the same approach to providing cross-environment compatibility.
