const src = chrome.runtime.getURL("js/Cobalt.js");
const cobalt = import(src);

document.addEventListener("yt-player-updated", main);

function main() {
    const regex = /https:\/\/www\.youtube\.com\/watch\?v=/i;
    if (window.location.href.match(regex)) {
        var owner = document.getElementById("top-level-buttons-computed");
    
        var buttonDiv = document.createElement("div");
        buttonDiv.className = "download-button-div";
        buttonDiv.title = "Download";
        owner.appendChild(buttonDiv);

        var button = document.createElement("button");
        button.className = "download-button";
        button.id = "download-button";
        button.addEventListener('click', downloadTrack);
        buttonDiv.appendChild(button);

        var image = document.createElement("img");
        image.id = "download-button-image";
        image.src = chrome.runtime.getURL("icons/lightButton24.png");
        button.appendChild(image);
    }
}

async function downloadTrack() {
    try {
        const url = window.location.href;
        const cobaltResult = await Cobalt(url, false);
        window.open(cobaltResult, '_blank');
    }
    catch {
        console.log("Url doesn't contain watch?v=");   
    }
}