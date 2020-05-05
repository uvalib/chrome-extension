//Window listener for events from view-more.html
window.addEventListener('DOMContentLoaded', function(){
    document.getElementById('closePurchaseRequestFrame').addEventListener("click", closePurchaseRequestFrame);
    document.getElementById('backToViewMore').addEventListener('click', backToViewMore);
    document.getElementById('submitRequest').addEventListener('click', checkRequired);
})

//Close request purchase frame
function closePurchaseRequestFrame(){
    //Sending message to content.js to push top-margin back up
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "close purchase request frame"}, function(response) {
        });
      });
}

//Go back to view-more frame
function backToViewMore(){
    //Sending message to content.js to push top-margin back up
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "back to view more"}, function(response) {
        });
      });
}

/** if there are less than 1 addtional option,
 * don't display backToViewMore button
 */
chrome.storage.local.get(["numAdditionalItem"], function(result) {
    var backToViewMore = document.getElementById("backToViewMore")
    if (result.numAdditionalItem < 1) {
        backToViewMore.style.display = "none"
    }
})

function checkRequired() {
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    var publisher = document.getElementById('publisher').value
    var isCourseReserve = document.getElementById('is-course-reserve').value
    if (title == "") {
        return false;
    }
    if (author== "") {
        return false;
    }
    if (publisher == "") {
        return false;
    }
    if (isCourseReserve == "") {
        return false;
    }
    else {
        submitRequest();
        return true; 
    }
}

//Handle submission for purchase request
function submitRequest() {
    var submitButton = document.getElementById('submitRequest')
    var title = document.getElementById('title').value
    var author = document.getElementById('author').value
    var publisher = document.getElementById('publisher').value
    var format = document.getElementById('format').value
    var isCourseReserve = document.getElementById('is-course-reserve')
    let emailAddress = "lib-collections@virginia.edu"
    if (isCourseReserve != "yes")
        emailAddress = "lib-reserves@virginia.edu"
    var href = "mailto:" + emailAddress + "?subject=Purchase Request from Browser Extension User&body=Title: " + title + 
    " %0D%0AAuthor: "+ author + "%0D%0APublisher: " + publisher + "%0D%0AFormat: " + format
    var sendEmail = document.createElement('a')
    sendEmail.id = "sendEmail"
    sendEmail.href = href;
    sendEmail.click();
    backToViewMore();
}