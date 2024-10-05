const src = chrome.runtime.getURL("js/Cobalt.js");
const cobalt = import(src);

var rightControls = document.querySelector(".right-controls-buttons.style-scope.ytmusic-player-bar");

var buttonDiv = document.createElement("div");
buttonDiv.className = "download-button-div";
buttonDiv.title = "Download";
rightControls.appendChild(buttonDiv);

var button = document.createElement("button");
button.className = "download-button";
button.id = "download-button";
button.addEventListener('click', downloadTrack);
buttonDiv.appendChild(button);

var image = document.createElement("img");
image.id = "download-button-image";
image.src = chrome.runtime.getURL("icons/button24.png");
button.appendChild(image);

let currentUrl = location.href;

setInterval(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    tryShowButton();
  }
}, 500);

function tryShowButton()
{
    var button = document.getElementById("download-button");
    var image = document.getElementById("download-button-image");
    const regex = /https:\/\/music\.youtube\.com\/watch\?v=/i;
    
    if (window.location.href.match(regex)) {
        button.disabled = false;
        image.src = chrome.runtime.getURL("icons/button24.png");
    }
    else {
        button.disabled = true;
        image.src = chrome.runtime.getURL("icons/disabledButton24.png");
    }
}

async function downloadTrack() {
    try {
        const url = window.location.href.replace('music.youtube.com', 'www.youtube.com');
        const cobaltResult = await Cobalt(url, true);
        window.open(cobaltResult, '_blank');
    }
    catch {
        console.log("Url doesn't contain watch?v=");   
    }
}