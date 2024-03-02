/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Demo_PwaCache_Back_Defaults {

    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    SPACE_CACHED = 'cached';
    SPACE_NO_CACHE = 'no_cache';
    SPACE_SW = 'sw';

    constructor(
        {
            TeqFw_Web_Back_Defaults$: MOD_WEB,
        }
    ) {
        this.MOD_WEB = MOD_WEB;
        Object.freeze(this);
    }
}
