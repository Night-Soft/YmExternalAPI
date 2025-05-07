const path = 'js/externalAPI/';
const modules = ["controller.js", "utils.js", "extracted-data.js", "api-utils.js"];

const addScript = function (path, fileName) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL(path + fileName);
        script.type = "module";
        //script.async = false;
        script.onload = function () {
            // console.log(`Script loaded: ${fileName}!`);
            this.remove();
            resolve();
        }
        document.documentElement.appendChild(script);
    });
};

const promises = [];
(async () => {
     for(const file of modules) {
         const promise = addScript(path, file);
         promises.push(promise);
         await promise;
     }
})();
// todo promises
document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all(promises);
    addScript(path, "externalAPI.js");

});