const path = 'js/externalAPI/';
const pathChunks = path + 'chunks/';
const scriptToLoad = ['StateControl.js']; // 'TogglesLike.js', 'Toggles.js', 

const addScript = function (path, fileName) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL(path + fileName);
        script.async = false;
        script.onload = function () {
            this.remove();
            resolve();
        }
        document.documentElement.appendChild(script);
    });
};

(async() => {
    for (const script of scriptToLoad) {
        await addScript(pathChunks, script);
        console.log(`Script loaded: ${script}!`);
    }
    await addScript(path, "Controller.js");
    console.log(`Script loaded: Controller.js!`);
})();

document.addEventListener("DOMContentLoaded", () => {
    addScript(path, "externalAPI.js").then(() => console.log("injcet externalAPI.js, onload"));
});


window.onload = function(){
    const topBanner = document.querySelector(".TopAdvertBanner_root__aAZ0o");
    const sideBanner = document.querySelector(".SideAdvertBanner_root__hT1jJ");
    if (!topBanner) return;
    topBanner.style.display = "none";
    sideBanner.style.display = "none";
    console.log("Hide banner!");
}