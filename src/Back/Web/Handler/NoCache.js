/**
 * Return HTML with headers that disable caching in the browser.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';

// MODULE'S VARS
const {
    HTTP2_METHOD_GET,
    HTTP_STATUS_OK,
} = H2;


// MODULE'S CLASSES
// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class Demo_PwaCache_Back_Web_Handler_NoCache {
    /**
     * @param {Demo_PwaCache_Back_Defaults} DEF
     * @param {Demo_PwaCache_Back_Web_Handler_Z_Loader} loader
     */
    constructor(
        {
            Demo_PwaCache_Back_Defaults$: DEF,
            Demo_PwaCache_Back_Web_Handler_Z_Loader$: loader,
        }
    ) {

        // FUNCS
        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf Demo_PwaCache_Back_Web_Handler_NoCache
         */
        async function process(req, res) {
            if (!res.headersSent) {
                const body = loader.populate('No Cache');
                res.setHeader('Content-Length', body.length);
                res.setHeader('Content-Type', 'text/html');
                res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
                res.writeHead(HTTP_STATUS_OK);
                res.end(body);
            }
        }

        // INSTANCE METHODS

        this.getProcessor = () => process;

        this.init = async function () { };

        this.canProcess = function ({method, address} = {}) {
            return (
                (method === HTTP2_METHOD_GET)
                && ((address?.space === DEF.SPACE_NO_CACHE) || (address?.space === DEF.SPACE_SW))
            );
        };
    }
}
