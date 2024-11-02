var rightControls = document.querySelector(".right-controls-buttons.style-scope.ytmusic-player-bar");

var buttonDiv = document.createElement("div");
buttonDiv.className = "download-button-div";
buttonDiv.title = "Disable player";
rightControls.appendChild(buttonDiv);

var button = document.createElement("button");
button.className = "download-button";
button.id = "disable-player-button";
button.addEventListener('click', disablePlayer);
buttonDiv.appendChild(button);

var image = document.createElement("img");
image.id = "disable-player-button-image";
image.src = chrome.runtime.getURL("icons/enabledPB.png");
button.appendChild(image);

function disablePlayer()
{
    var button = document.querySelector("#disable-player-button");
    var buttonImage = document.querySelector("#disable-player-button-image");
    var player = document.querySelector("#player");
    var nodes = player.getElementsByTagName("*");
    for(var i = 0; i < nodes.length; i++){
        nodes[i].remove();
   }
   player.remove();
   button.disabled = true;
   buttonImage.src = chrome.runtime.getURL("icons/disabledPB.png");
}