/*
Windows 93 App Store

Created by inverted cat#1194
*/

(function() {
    /**
     * Entry point for app store.
     */
    const _as_app = async function() {
        const W_SIZE = {
            height: 430,
            width: 610
        }

        const appWindow = $window({
            url: "about:blank",
            title: "App Store",
            icon: "http://github.com/acdra1n/w93-projects/raw/master/app-store/resources/icons/AppStore16.png",
            height: W_SIZE.height,
            width: W_SIZE.width
        });

        /**
         * Function to set up main window.
         */
        function ui_setup() {
            //appWindow.el
        }


    }

    le._apps.app_store = {
        categories: "Utility",
        exec: _as_app,
        icon: "//github.com/acdra1n/w93-projects/raw/master/app-store/resources/icons/AppStore16.png",
        name: "App Store"
    };
});