/*
Windows 93 App Store

Created by inverted cat#1194
*/

(function() {
    const APPS_BASE_DIR = "apps";

    const paths = {
        APPS_BASE_DIR,
        CFG_BASE_DIR: APPS_BASE_DIR + "/etc",
        SYS_INSTALLED_BDIR: APPS_BASE_DIR + "/sys",
        USR_INSTALLED_BDIR: APPS_BASE_DIR + "/packages"
    }
    
    if(!le._win94)
        paths.USR_INSTALLED_BDIR = paths.SYS_INSTALLED_BDIR; // Fallback to system app install dir if no multi user session was found (win94 only)

    /**
     * Entry point for app store.
     */
    const _as_app = async function() {
        const ui = {
            appWindow: null
        }

        /**
         * Setup and load data from file system.
         */
        async function loadFs() {
            // Create required files if they do not exist
            if($fs.utils.exist("/a/" + paths.CFG_BASE_DIR + "/repos.json") !== 0) {
                await localforage.setItem(paths.CFG_BASE_DIR + "/repos.json", JSON.stringify([
                    "http://yaboi.wtf/windows93-base",
                    "http://yaboi.wtf/windows93-community"
                ], null, 4));
            }
        }

        /**
         * Function to set up main window.
         */
        function mainWndSetup() {
            /*ui.appWindow = $window({
                url: "about:blank",
                title: "App Store",
                icon: "http://github.com/acdra1n/w93-projects/raw/master/app-store/resources/icons/AppStore16.png",
                height: W_SIZE.height,
                width: W_SIZE.width
            });*/
        }

        // Load FS
        await loadFs();

        // Setup and show main window
        mainWndSetup();
    }

    le._apps.app_store = {
        categories: "Utility",
        exec: _as_app,
        icon: "//github.com/acdra1n/w93-projects/raw/master/app-store/resources/icons/AppStore16.png",
        name: "App Store"
    };
});