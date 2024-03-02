/**
 * Load an HTML template from the disk and populate it with data.
 */
// MODULE'S IMPORTS
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

// MODULE'S CLASSES
export default class Demo_PwaCache_Back_Web_Handler_Z_Loader {
    /**
     * @param {TeqFw_Core_Back_Config} config
     */
    constructor(
        {
            TeqFw_Core_Back_Config$: config,
        }
    ) {
        // FUNCS
        function readFile() {
            const root = config.getPathToRoot();
            const path = join(root, 'web', 'template.html');
            const buffer = readFileSync(path);
            return buffer.toString();
        }

        /**
         * Convert UTC time to HH:MM:SS.MMM.
         * @return {string}
         */
        function time() {
            const date = new Date();
            const h = `${date.getUTCHours()}`.padStart(2, '0');
            const i = `${date.getUTCMinutes()}`.padStart(2, '0');
            const s = `${date.getUTCSeconds()}`.padStart(2, '0');
            const ms = `${date.getUTCMilliseconds()}`.padStart(3, '0');
            return `${h}:${i}:${s}.${ms}`;
        }

        // MAIN
        /**
         * @param {string} title
         * @return {string}
         */
        this.populate = function (title) {
            const tmpl = readFile();
            return tmpl
                .replaceAll('${TITLE}', title)
                .replaceAll('${TIME}', time());
        };
    }

}