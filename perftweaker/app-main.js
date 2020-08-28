/*
Performance Tweaker for Windows 93

Created by inverted cat#1194
*/

(function() {
    // App resources
    /*************************************************************************************************/

    // Profile definitions

    var profiles = {
        high_performance: {
            name: "High Performance",
            cssApply: `/* Perf Tweaker High Performance Profile */
            .ui_window {
                box-shadow: 1px 0 #000, 0 1px #000, 1px 1px #000, inset 1px 1px #fff;
                animation-duration: 0s !important;
            }

            header.ui_window__head {
                background: #00192b;
            }

            .ui_window--active .ui_window__head {
                background: #d023d0;
            }

            .skin_background {
                background: #837CFF !important;
            }`
        },

        balanced: {
            name: "Balanced",
            cssApply: `/* Perf Tweaker Balanced Profile */
            .ui_window {
                box-shadow: 1px 0 #000, 0 1px #000, 1px 1px #000, inset 1px 1px #fff, 0 0 10px 1px rgba(255,0,255,.5);
                animation-duration: 0s !important;
            }`
        },

        normal: {
            name: "Normal",
            cssApply: ``
        }
    }

    // Resources (main window html and specs)

    var W_SIZE = {
        height: 320,
        width: 450
    }

    var W_HTML = `
<div style="padding: 10px;">
    <b>Welcome to Performance Tweaker!</b><br><br>
    Using this tool, you can improve the graphical performance of Windows 93 on your computer.<br>
    <br>
    <hr>
    <br>
    <b>Select a profile</b>
    <br>
    Current Profile: <span class="current-profile">(None)</span>
    <br>
    <br>
    <button class="pb_hperf">High Performance</button>
    <button class="pb_bal">Balanced</button>
    <button class="pb_norm">Normal</button>
    <br>
    <br>
    <div class="explanation" style="box-sizing: border-box;width: 100%;height: 68px;border-style: inset;border-width: 1px;padding: 5px;"></div>
    <br>
    <br>
    
    <div style="display: flex;">
        <button style="margin-left: auto;">Apply and Reboot</button>
    </div>
</div>
`;

    /*************************************************************************************************/

    // Check if another instance is opened
    if(window._pt_open) {
        $alert("Another instance of Performance Tweaker is already running!");
        return;
    }

    window._pt_open = true;

    // Config

    if(!window._pt_config) {
        window._pt_config = {
            currentProfile: null
        }
    }


    var appWindow = $window("about:blank");

    // Functions

    /**
     * Applies the specified tweaks to the current session.
     * @param {String} profileName The name of the profile to apply tweaks from.
     */
    function applyTweaks(profileName) {
        var pftwEl = document.querySelector("#_ptwk_cssApply");
        if(!pftwEl) {
            pftwEl = document.createElement('style');
            pftwEl.setAttribute("id", "_ptwk_cssApply");
            document.body.appendChild(pftwEl);
        }

        pftwEl.innerHTML = profiles[profileName].cssApply;
    }

    /**
     * Main application entry point.
     */
    function app() {
        // Setup main window

        appWindow.changeTitle("Performance Tweaker");
        appWindow.changeSize(W_SIZE);
        appWindow.el.base.style.top = ((window.innerHeight / 2) - (W_SIZE.height / 2)).toString() + "px";
        appWindow.el.base.style.left = ((window.innerWidth / 2) - (W_SIZE.width / 2)).toString() + "px";
        appWindow.el.body.innerHTML = W_HTML;
        appWindow.cfg.resizable = false;

        appWindow.cfg.onclose = function() {
            window._pt_open = false;
        }

        // Setup window controls

        var curProfileLbl = appWindow.el.body.querySelector(".current-profile");
        var explanationLbl = appWindow.el.body.querySelector(".explanation");
        var hperfBtn = appWindow.el.body.querySelector(".pb_hperf");
        var balBtn = appWindow.el.body.querySelector(".pb_bal");
        var normalBtn = appWindow.el.body.querySelector(".pb_norm");

        if(window._pt_config.currentProfile == null)
            curProfileLbl.innerText = "(none)";
        else
            curProfileLbl.innerText = profiles[window._pt_config.currentProfile].name;
    
        // Set explanations
        hperfBtn.onmouseenter = function() {
            explanationLbl.innerHTML = "Highest Performance profile.<br><br>Disables window animations, window shadow, some gradient colors, and uses a solid color as background.";
        }

        balBtn.onmouseenter = function() {
            explanationLbl.innerHTML = "Balanced profile.<br><br>Disables window animations and reduces the window shadow.";
        }

        normalBtn.onmouseenter = function() {
            explanationLbl.innerHTML = "Normal profile.<br><br>Windows 93 default settings.";
        }

        // Set button events
        hperfBtn.onclick = function() {
            applyTweaks("high_performance");
        }

        balBtn.onclick = function() {
            applyTweaks("balanced");
        }

        normalBtn.onclick = function() {
            applyTweaks("normal");
        }
    }

    // Setup app
    app();
})();