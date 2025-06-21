const addScript = async (fileName, path = modulesPath) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL(path + fileName);
        script.type = "module";
        script.onload = function () {
            //console.log(`Script loaded: ${fileName}!`);
            this.remove();
            resolve();
        }
        document.documentElement.appendChild(script);
    });
}

/**
 * Constructs the correct path for loading module scripts.
 * 
 * Prerequisites:
 * - "add-API.js" must be registered in manifest.json under content_scripts
 * - Must specify "run_at": "document_start" in the content script configuration
 * - Module files should be located one directory level up from the "add-API.js"
 * 
 * @returns {string} The base path for module loading
 */
const getModulesPath = () => {
    const content_scripts = chrome.runtime.getManifest().content_scripts;
    for (const script of content_scripts) {
        if (script.run_at !== "document_start") continue;

        const addApiPath = script.js.find(paht => paht.endsWith("add-API.js"));
        if (addApiPath) {
            return addApiPath.split("/").slice(0, -2).join("/").concat("/");
        }
    }

    throw new Error('add-API.js not found in content_scripts');
}

const modulesPath = getModulesPath();
const modules = ["controller.js", "utils.js", "extracted-data.js", "api-utils.js"];

const modulesLoaded = Promise.all(modules.map(module => addScript(module)));
document.addEventListener("DOMContentLoaded", () => {
    modulesLoaded.then(() => addScript("externalAPI.js"));
});