## Prerequisites

In order to run the application, you will need to fit few requirments. This package uses a few plugins for serverless e.g.serverless-dynamodb-local which require Java Runtime.
In order to run dynamodb locally, you need to install fresh [Java](https://java.com/en/).

To make things consistent it is recommended to use Yarn instead of npm. You can get yarn from [here](https://yarnpkg.com/).

Then coming to packages, install serverless globally with following command:

```
npm install -g serverless
```

Then run:

```bash
$ yarn install
```

## Running the app

To start the application please run following command inside of the project dir

```
sls offline start
```

## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```
