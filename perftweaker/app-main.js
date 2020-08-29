/*
Performance Tweaker for Windows 93

Created by inverted cat#1194
*/

(async function() {
    // App resources
    /*************************************************************************************************/

    // Profile definitions

    var profiles = {
        high_performance: {
            name: "High Performance",
            description: "Highest Performance profile.<br><br>Disables window animations, window shadow, some gradient colors, and uses a solid color as background.",
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
            description: "Balanced profile.<br><br>Disables window animations and reduces the window shadow.",
            cssApply: `/* Perf Tweaker Balanced Profile */
            .ui_window {
                box-shadow: 1px 0 #000, 0 1px #000, 1px 1px #000, inset 1px 1px #fff, 0 0 10px 1px rgba(255,0,255,.5);
                animation-duration: 0s !important;
            }`
        },

        normal: {
            name: "Normal",
            description: "Normal profile.<br><br>Windows 93 default settings.",
            cssApply: ``
        }
    }

    // Resources (main window html and specs)

    const W_SIZE = {
        height: 320,
        width: 450
    }

    const W_HTML = `
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
    <div class="profiles">
        <!--<button class="pb_hperf">High Performance</button>
        <button class="pb_bal">Balanced</button>
        <button class="pb_norm">Normal</button>-->
    </div>
    <br>
    <br>
    <div class="explanation" style="box-sizing: border-box;width: 100%;height: 68px;border-style: inset;border-width: 1px;padding: 5px;"></div>
    <br>
    <br>
    
    <div style="display: flex;">
        <button style="margin-left: auto;">Save and Reboot</button>
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


    const appWindow = $window("about:blank");

    // Functions

    /**
     * Setup file system for app (create default files with profiles, etc.)
     */
    async function fsSetup() {
        // Create README file
        if($fs.utils.exist("/a/.config/perf_twk/README.txt") !== 0) {
            await localforage.setItem(".config/perf_twk/README.txt", `Performance Tweaker configuration directory
===========================================
profiles.json - Stores all profiles to be used.


Creating custom profiles
========================
As of this version, there is no UI to do this (WIP).
To create your own profile, add an entry to the root JSON object that looks something like this:

  "profile_name": {
    "name": "Profile Name",
    "description": "Profile Description",
    "cssApply": "/* CSS code to change visual effects */"
  }

When done correctly, your new profile should show up next time you launch Performance Tweaker.
If you want to restore default profiles, simply delete profiles.json and restart Performance Tweaker. A new profiles.json file should be created.`);
        }

        // Write profiles json
        if($fs.utils.exist("/a/.config/perf_twk/profiles.json") !== 0)
            await localforage.setItem(".config/perf_twk/profiles.json", JSON.stringify(profiles, null, 4));
        else
            profiles = JSON.parse(await localforage.getItem(".config/perf_twk/profiles.json"));
        
        // Write tweaks json

    }

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
        appWindow.changeIcon("https://github.com/acdra1n/w93-projects/raw/master/perftweaker/resources/icons/PerfTwk16.png");
        appWindow.el.base.style.top = ((window.innerHeight / 2) - (W_SIZE.height / 2)).toString() + "px";
        appWindow.el.base.style.left = ((window.innerWidth / 2) - (W_SIZE.width / 2)).toString() + "px";
        appWindow.el.body.innerHTML = W_HTML;
        appWindow.cfg.resizable = false;

        appWindow.cfg.onclose = function() {
            window._pt_open = false;
            if(window._pt_config.currentProfile)
                applyTweaks(window._pt_config.currentProfile); // Reset to previous profile
            else
                applyTweaks("normal");
        }

        // Setup window controls

        const curProfileLbl = appWindow.el.body.querySelector(".current-profile");
        const explanationLbl = appWindow.el.body.querySelector(".explanation");
        const profilesContainer = appWindow.el.body.querySelector(".profiles");

        // Iterate through profiles
        const profileKeys = Object.keys(profiles);
        profileKeys.forEach((profileKey)=>{
            // Create button for profile and assign events
            (function(profile, key){
                const button = document.createElement("button");
                button.innerText = profile.name;

                button.onmouseenter = function() {
                    explanationLbl.innerHTML = profile.description;
                }

                button.onclick = function() {
                    applyTweaks(key);
                }

                // Add button to profiles container
                profilesContainer.appendChild(button);
            })(profiles[profileKey], profileKey);
        });

        if(window._pt_config.currentProfile == null)
            curProfileLbl.innerText = "(none)";
        else
            curProfileLbl.innerText = profiles[window._pt_config.currentProfile].name;
    }

    await fsSetup();

    // Setup app
    app();
})();