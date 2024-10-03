// @grant           GM_xmlhttpRequest

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
image.src = chrome.runtime.getURL("icons/button24.png");
button.appendChild(image);

function Cobalt(videoUrl, audioOnly = false) {
    return new Promise((resolve, reject) => {
        fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: encodeURI(videoUrl),
                vQuality: localStorage.getItem('ytdl-quality') ?? 'max',
                filenamePattern: 'basic', // file name = video title
                isAudioOnly: audioOnly,
                disableMetadata: true, // privacy
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data?.url) resolve(data.url);
            else reject(data);
        })
        .catch(err => reject(err));
    });
}

async function downloadTrack() {
    const url = window.location.href.replace('music.youtube.com', 'www.youtube.com');
    const cobaltResult = await Cobalt(url, true);
    window.open(cobaltResult, '_blank');
}