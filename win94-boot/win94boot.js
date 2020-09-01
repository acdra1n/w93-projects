/*
Win94 Boot script loader

Created by ctrl+z. Place in /a/boot to use.
*/

(function() {
    var lastBootLog = "Boot started @ " + new Date().toUTCString() + "\n\n";
    const EXT_TO_LOAD = [".css", ".js"];

    // Iterate through each file in /a/win94/boot
    // We don't care about subdirectories - we want to load files in subdirs anyway.

    $file.iterateFolder("/a/win94/boot", async function(path) {
        if($fs.utils.isFolder(path))
            return;
        
        const lowercasePath = path.toLowerCase();

        for(var x = 0; x < EXT_TO_LOAD.length; x++) {
            if(!lowercasePath.endsWith(EXT_TO_LOAD[x]))
                continue;
            
            // Get file contents and load blob
            const script = await localforage.getItem(path);
            const blob = new Blob([script], { type: 'text/javascript' });
            const blobURL = URL.createObjectURL(blob);
            const logEntry = "[Win94Boot] Loading " + path + " (" + blobURL + ")";
            console.log(logEntry);
            lastBootLog += logEntry + "\n";

            // Differentiate between the correct loader
            if(lowercasePath.endsWith(".js"))
                $loader.script(blobURL);
            else
                $loader.css(blobURL);

            await localforage.setItem("win94/boot/lastboot.txt", lastBootLog);
        }
    });
})();