let blockList = [];

// Load blockList from local storage when the extension is loaded
chrome.storage.local.get(['blockList'], function(result) {
  blockList = result.blockList || [];
});

// Handle messages from the content script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "add_to_block_list") {
      blockList.push({title: request.title, id: request.id});
      // Save blockList to local storage
      chrome.storage.local.set({blockList: blockList}, function() {
        console.log('Block list saved');
      });
    } else if (request.message === "unblock_video") {
      let videoIndex = blockList.findIndex(video => video.id === request.id);
      if (videoIndex !== -1) {
        blockList.splice(videoIndex, 1);
        // Save blockList to local storage
        chrome.storage.local.set({blockList: blockList}, function() {
          console.log('Block list saved');
        });
      }
    } else if (request.message === "content_script_ready") {
      chrome.tabs.sendMessage(sender.tab.id, {message: "block_video"});
    }
  }
);
