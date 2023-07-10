import indent from 'indent-string';

const normalizeNewLine = (v: string) => {
  return v.replace(/\r\n/g, '\n')
}

const format = (v: string, indentCount: number) => {
  return indent(normalizeNewLine(v), indentCount);
}

export const googleScriptDts = (irun: string, interfaces: string[], endpointsOnly = false) => {
  return normalizeNewLine(`declare namespace google {
    /**
     * Methods available to Google Apps Script
     */
    namespace script {
${format(irun, 8)}
${interfaces.map(i => format(i, 8)).join('\n')}
${endpointsOnly ? '' : format(googleScriptMiscDts, 8)}
    }
}
`);
}

const googleScriptMiscDts = `interface IUrlLocation {
    /**
     * The string value of URL fragment after the # character, or an emptry string if no URL fragment is present
     */
    hash: string;
    /**
     * An object of key/value pairs that correspond to the URL request parameters. Only the first value will be returned for parameters that have multiple values. If no parameters are present, this will be an empty object.
     */
    parameter: { [key: string]: any; };
    /**
     * An object similar to location.parameter, but with an array of values for each key. If no parameters are present, this will be an empty object.
     */
    parameters: { [key: string]: any[]; };
}

/**
* google.script.run is an asynchronous client-side JavaScript API available in HTML-service pages that can call server-side Apps Script functions.
*/
const run: IRun;

/**
 * google.script.history is an asynchronous client-side JavaScript API that can interact with the browser history stack. It can only be used in the context of a web app that uses IFRAME.
 */
namespace history {
    /**
     * Pushes the provided state object, URL parameters and URL fragment onto the browser history stack.
     * @param stateObject An developer-defined object to be associated with a browser history event, and which resurfaces when the state is popped. Typically used to store application state information (such as page data) for future retrieval.
     * @param params An object containing URL parameters to associate with this state. For example, {foo: “bar”, fiz: “baz”} equates to "?foo=bar&fiz=baz". Alternatively, arrays can be used: {foo: [“bar”, “cat”], fiz: “baz”} equates to "?foo=bar&foo=cat&fiz=baz". If null or undefined, the current URL parameters are not changed. If empty, the URL parameters are cleared.
     * @param hash The string URL fragment appearing after the '#' character. If null or undefined, the current URL fragment is not changed. If empty, the URL fragment is cleared.
     */
    function push(stateObject?: any, params?: { [key: string]: any; }, hash?: string): void;
    /**
     * Replaces the top event on the browser history stack with the provided (developer-defined) state object, URL parameters and URL fragment. This is otherwise identical to push().
     * @param stateObject An developer-defined object to be associated with a browser history event, and which resurfaces when the state is popped. Typically used to store application state information (such as page data) for future retrieval.
     * @param params An object containing URL parameters to associate with this state. For example, {foo: “bar”, fiz: “baz”} equates to "?foo=bar&fiz=baz". Alternatively, arrays can be used: {foo: [“bar”, “cat”], fiz: “baz”} equates to "?foo=bar&foo=cat&fiz=baz". If null or undefined, the current URL parameters are not changed. If empty, the URL parameters are cleared.
     * @param hash The string URL fragment appearing after the '#' character. If null or undefined, the current URL fragment is not changed. If empty, the URL fragment is cleared.
     */
    function replace(stateObject?: any, params?: { [key: string]: any; }, hash?: string): void;
    /**
     * Sets a callback function to respond to changes in the browser history. The callback function should take only a single event object as an argument.
     * @param callback a client-side callback function to run upon a history change event, using the event object as the only argument.
     */
    function setChangeHandler(callback: (event: { state: any, location: IUrlLocation }) => void): void;
}

namespace host {
    /**
     * Closes the current dialog or sidebar.
     */
    function close(): void;
    /**
     * Sets the height of the current dialog.
     * @param {number} height the new height, in pixels
     */
    function setHeight(height: number): void;
    /**
     * Sets the width of the current dialog.
     * @param {number} width the new width, in pixels
     */
    function setWidth(width: number): void;
    namespace editor {
        /**
         * Switches browser focus from the dialog or sidebar to the Google Docs, Sheets, or Forms editor.
         */
        function focus(): void;
    }
}
/**
 * google.script.url is an asynchronous client-side JavaScript API that can query URLs to obtain the current URL parameters and fragment. This API supports the google.script.history API. It can only be used in the context of a web app that uses IFRAME.
 */
namespace url {
    /**
     * Gets a URL location object and passes it to the specified callback function (as the only argument).
     * @param callback a client-side callback function to run, using the location object as the only argument.
     */
    function getLocation(callback: (location: IUrlLocation) => void): void;
}`