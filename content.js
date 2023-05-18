let videoId = new URLSearchParams(window.location.search).get('v');
let videoTitleElement = document.querySelector('#title ytd-watch-metadata');
let videoTitle = videoTitleElement ? videoTitleElement.textContent : 'defaultTitle';

// Hide the video by default
let videoElement = document.querySelector('#player-theater-container');
if (videoElement) {
    videoElement.style.display = 'none';
}

// Send a message to the background script to add this video to the block list
chrome.runtime.sendMessage({message: "add_to_block_list", title: videoTitle, id: videoId});

// When a message is received from the background script or popup script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "unblock_video") {
      // Show the video if the video element is present
      if (videoElement) {
          videoElement.style.display = 'block';
      }
    }
  }
);

// Send a "ready" message to the background script
chrome.runtime.sendMessage({message: "content_script_ready"});
