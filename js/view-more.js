MAX_LENGTH = 30

//Window listener for events from view-more.html
window.addEventListener('DOMContentLoaded', function(){
    document.getElementById('closeViewMoreFrame').addEventListener("click", closeViewMoreFrame);
    document.getElementById('request-purchase').addEventListener('click', renderRequestPurchase);
})

//Close view more frame
function closeViewMoreFrame(){
    //Sending message to content.js to push top-margin back up
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "close view more frame"}, function(response) {
        });
      });
}

//Render purchase request page
function renderRequestPurchase(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "render purchase request"}, function(response) {
        });
      });
}

let itemHref = "";
let mapHref = "https://www.google.com/maps/search/?api=1&query="
var carousel = document.getElementById('carousel')

function min(x, y) {
    return x < y ? x : y
}

function max(x, y) {
    return x > y ? x : y
}

chrome.storage.local.get(["numAdditionalItem"], function(result) {
    numItem = result.numAdditionalItem
    var prev = document.getElementById("prev")
    var next = document.getElementById("next")
    var slide0 = document.getElementById("slide0")
    var slide1 = document.getElementById("slide1")
    var slide2 = document.getElementById("slide2")
    if (numItem < 9) {
        if (slide2 != null) slide2.style.display = "none"
    }
    if (numItem < 5) {
        if (slide0 != null) slide0.style.display = "none"
        if (slide1 != null) slide1.style.display = "none"
        if (prev != null) prev.style.display = "none"
        if (next != null) next.style.display = "none"
    }
    for (pg=1; pg <= max(numItem/4, 1); pg++) {
        //<div class="carousel-item">
        var carousel_item = document.createElement("div")
        if (pg == 1) carousel_item.className = "carousel-item active"
        else carousel_item.className = "carousel-item"

        //<div id='additional-items' class="additional-items">
        var additional_items = document.createElement("div")
        additional_items.className = "additional-items"
        for (item=(pg-1)*4+1; item <=  min((pg-1)*4+4, numItem); item++) {
            var currentID = "id" + item;
            var currentTitle = "title" + item;
            var currentAuthor = "author" + item;
            var currentCoverImage = "cover_image" + item;
            var currentAvailability = "availability" + item;
            var currentLibrary = "library" + item;
            var currentCallNum = "callnum" + item;
            //Because chrome functions are asynchronous, need to call get data separately and sequentially like this instead of in the same function
            getData(currentID, currentTitle, currentAuthor, currentCoverImage, currentAvailability, currentLibrary,  currentCallNum, additional_items)
            //getData(currentID, currentTitle, currentAuthor, currentCoverImage, currentAvailability, currentLibrary,  currentCallNum)
        }
        carousel_item.appendChild(additional_items)
        carousel.appendChild(carousel_item)
    }
    
});

//Assign values from chrome.storage.local to elements in frame.html
function getData(currentID, currentTitle, currentAuthor, currentCoverImage, currentAvailability, currentLibrary,  currentCallNum, additional_items) {
    chrome.storage.local.get([currentID, currentTitle, currentAuthor, currentCoverImage, currentAvailability, currentLibrary,  currentCallNum], function(data){      
        /*
        Below code would generate HTML layout like this:
        <div class="additional-item-details">
            <img class="additional-image" src="">
            <div class="additional-details">
                <a class="item-title" target="_blank" href="">title</a>
                <div>author</div>
                <div class="availability">
                    <div style="float: left; white-space: pre;">Available at </div>
                    <a target="_blank" href="">lib</a>
                <div>
            </div>
        </div>
        */
        var coverImage = document.createElement('img')
        coverImage.className = "additional-image ui image tiny"
        var title = document.createElement('a')
        title.id = currentTitle;
        title.name = currentTitle;
        title.className = "item-title header whiteColor"
        title.target = "_blank"
        var author = document.createElement('div')
        author.className = "meta whiteColor"
        var availability = document.createElement('div')
        availability.style.cssText = "float: left; white-space: pre;"
        availability.className = "whiteColor"
        var lib = document.createElement('a')
        lib.id = currentLibrary
        lib.name = currentLibrary
        lib.className = "whiteColor"
        lib.target = "_blank"
        var callnum = document.createElement('div')
        var leoRequest = document.createElement('a')
        leoRequest.id = "leoRequest"
        leoRequest.target = "_blank"

        var availabilityInfo = document.createElement('div')
        availabilityInfo.className = "availability"
        availabilityInfo.appendChild(availability)
        availabilityInfo.appendChild(lib)
        availabilityInfo.appendChild(callnum)
        availabilityInfo.appendChild(leoRequest)

        var additionalDetails = document.createElement('div')
        additionalDetails.className = "additional-details content"
        additionalDetails.appendChild(title)
        additionalDetails.appendChild(author)
        additionalDetails.appendChild(availabilityInfo)

        var additionalItemDetails = document.createElement('div')
        additionalItemDetails.className = "additional-item-details"
        additionalItemDetails.appendChild(coverImage)
        additionalItemDetails.appendChild(additionalDetails)
        
        additional_items.appendChild(additionalItemDetails)

        //ends generating HTML layout for item info display
        itemHref="http://proxy01.its.virginia.edu/login?url=https://search.lib.virginia.edu/catalog/" + data[currentID];
        if (data[currentTitle].length > MAX_LENGTH)
            title.innerHTML = data[currentTitle].substring(0, MAX_LENGTH) + "...";
        else {
            title.innerHTML = data[currentTitle];
        }
        title.title = data[currentTitle]
        title.href= itemHref;
        if (data[currentAuthor][0].length > MAX_LENGTH)
            author.innerHTML = data[currentAuthor][0].substring(0, MAX_LENGTH) + "...";
        else {
            author.innerHTML = data[currentAuthor][0];
        }
        coverImage.src = data[currentCoverImage];
        if (data[currentTitle].length > 200)
            coverImage.src = '../images/cover_unavailable.png';
        if (data[currentAvailability] == undefined || data[currentAvailability] =='') 
            data[currentAvailability] = "Available";
        else if (data[currentAvailability] == "Online") 
            availability.innerHTML = "Available online";
        else if (data[currentAvailability] == "Request") {
            leoRequest.href =
            "http://proxy01.its.virginia.edu/login?url=https://search.lib.virginia.edu/account_requests/"
            .concat(data[currentID]).concat("/ill_leo");
            leoRequest.innerHTML = data[currentAvailability]
            leoRequest.className = "ui orange button leoHover"
        }
        else {
            availability.innerHTML = data[currentAvailability];
            if (data[currentLibrary] != "" && data[currentLibrary] != undefined) {
                availability.innerHTML = availability.innerHTML + " at ";
            }
            lib.innerHTML = data[currentLibrary];
            lib.href = (mapHref + data[currentLibrary].toString().replace(" ", "+") + "+Library+UVA");
            if (data[currentCallNum] != undefined && data[currentCallNum] != "")
                callnum.innerHTML = "Call number: " + data[currentCallNum];
        }
    })
}

// Source: https://developer.chrome.com/extensions/tut_analytics
 
var _AnalyticsCode = 'UA-143602186-4';

var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

// Track a click on a button using the asynchronous tracking API.
 
function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}

/**
 * Now set up your event handlers for the `button` and 'a' elements once the
 * html's DOM has loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', trackButtonClick);
  }
  var links = document.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', trackButtonClick);
  }
});
