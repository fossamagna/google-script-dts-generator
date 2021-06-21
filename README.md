# google-script-dts-generator [![NPM version][npm-image]][npm-url]

Generate TypeScript declaration (.d.ts) file for [google.script.run](https://developers.google.com/apps-script/guides/html/reference/run)(Client-side API).

## About

`google-script-dts-generator` generates a client-side TypeScript declaration (.d.ts) for the Apps Script function from a server-side TypeScript source that matchs the following conditions:

* function assignment expressions to `global` object. 
* named export functions (when using `namedExportsFiles` option)

## Example

See [example](./example).

server.ts:
```ts
global.echo = (message: string) => {
  return message;
};
```

generate:

```sh
$ google-script-dts-generator --sourcesDir server/ --outputDir client/
```

generated `google-script.d.ts`:
```ts
declare namespace google {
    /**
     * Methods available to Google Apps Script
     */
    namespace script {
        interface IRun {
            echo(message: string): void;
            /**
             * Sets a callback function to run if the server-side function throws an exception. Without a failure handler, failures are logged to the JavaScript console. To override this, call withFailureHandler(null) or supply a failure handler that does nothing.
             * @param callback a client-side callback function to run if the server-side function throws an exception; the Error object is passed to the function as the first argument, and the user object (if any) is passed as a second argument
             */
            withFailureHandler(callback: (error: Error, object?: any)=>void): IRun;
            /**
             * Sets a callback function to run if the server-side function returns successfully.
             * @param callback a client-side callback function to run if the server-side function returns successfully; the server's return value is passed to the function as the first argument, and the user object (if any) is passed as a second argument
             */
            withSuccessHandler(callback: (value: any, object?: any)=>void): IRun;
            /**
             * Sets an object to pass as a second parameter to the success and failure handlers.
             * @param {Object} object an object to pass as a second parameter to the success and failure handlers; because user objects are not sent to the server, they are not subject to the restrictions on parameters and return values for server calls. User objects cannot, however, be objects constructed with the new operator
             */
            withUserObject(object: object): IRun;
        }
        
        const run: IRun;

        // omitted below
}
```

## Installation

```sh
$ npm install gas-webpack-plugin --save-dev
```

or 

```
$ yarn add google-script-dts-generator
```

## Usage

### CLI

```sh
$ google-script-dts-generator --sourcesDir server --outputDir client
```

### Options

* [`--sourcesDir <sources>`](#--sourcesDir-sources)
* [`--outputDir <outputDir>`](#--outputDir-outputDir)
* [`--namedExportsFiles <glob>`](#--namedExportsFiles-glob)
* [`--endpointsOnly`](#--endpointsOnly)

#### `--sourcesDir <sources>`

Path to TypeScript sources directory.

```sh
$ google-script-dts-generator --outputDir ./example/client --sourcesDir ./example/server
```

#### `--outputDir <outputDir>`

Path to a generated `d.ts` file output directory.

```sh
$ google-script-dts-generator --outputDir ./example/client --sourcesDir ./example/server
```

#### `--namedExportsFiles <glob>`

A glob path pattern to generates a client-side TypeScript declaration (.d.ts) from named exports.

```sh
$ google-script-dts-generator --outputDir ./example/client --sourcesDir ./example/server --namedExportsFiles './example/server/**/*.ts'
```

### `--endpointsOnly`

When use [@types/google.script.client-side](https://www.npmjs.com/package/@types/google.script.client-side), User needs define specify functions as PublicEndpoints.
google-script-dts-generator support generate only PublicEndpoint interfaces.

```
yarn google-script-dts-generator -s ./src/server/ -o ./src/client/ --namedExportsFiles "./src/server/**/*.ts" --endpointsOnly
```

Output:
```ts
declare namespace google {
  namespace script {
    interface PublicEndpoints {
        doGet(): void;
        myFunction(param1: string, param2: boolean): void;
    }
  }
}
```

[npm-image]: https://badge.fury.io/js/google-script-dts-generator.svg
[npm-url]: https://npmjs.org/package/google-script-dts-generator