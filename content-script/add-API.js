addScript(path, "externalAPI.js").then(() => console.log("injcet externalAPI.js, onload"));

window.onload = function(){
    const topBanner = document.querySelector(".TopAdvertBanner_root__aAZ0o");
    const sideBanner = document.querySelector(".SideAdvertBanner_root__hT1jJ");
    topBanner.style.display = "none";
    sideBanner.style.display = "none";
    console.log("Hide banner!");
}