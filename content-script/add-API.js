const modules = ["controller.js", "utils.js", "extracted-data.js", "api-utils.js"];

const addScript = async (fileName, path = 'js/externalAPI/') => {
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

const modulesLoaded = Promise.all(modules.map(module => addScript(module)));
document.addEventListener("DOMContentLoaded", () => {
    modulesLoaded.then(() => addScript("externalAPI.js"));
});