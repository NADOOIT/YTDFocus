document.getElementById('blockForm').addEventListener('submit', function(event) {
  event.preventDefault();

  let block = document.querySelector('input[name="block"]:checked').value;

  if (block === "yes") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {message: "unblock_video"});
    });
  }
});
