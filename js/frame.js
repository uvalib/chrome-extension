//Window listener for events from frame.html
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('closeFrame').addEventListener("click", closeFrame);
    document.getElementById('viewMore').addEventListener("click", viewMore);
    document.getElementById('requestPurchase').addEventListener("click", renderRequestPurchase);
})

//Close frame
function closeFrame() {
    //Sending message to content.js to push top-margin back up
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "close frame" }, function(response) {
            //   console.log(response.echo);
        });
    });
}

//View more items
function viewMore() {
    //Sending message to content.js to create view for view more items
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "view more items" }, function(response) {
            //   console.log(response.echo);
        });
    });
}

//Render purchase request page
function renderRequestPurchase() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "render purchase request" }, function(response) {});
    });
}

//Get value from frame.html
let full_title = document.getElementById('full-title')
let short_title = document.getElementById('short-title')
let author = document.getElementById('author')
let coverImage = document.getElementById('cover_image')
let status = document.getElementById('status')
let lib = document.getElementById('library')
let callnum = document.getElementById('callnum')
let leoRequest = document.getElementById('leo-request')
let moreItemsImage = document.getElementById('more-items-image')

//Assign values from chrome.storage.local to elements in frame.html
let itemHref = "";
let mapHref = "https://www.google.com/maps/search/?api=1&query="

chrome.storage.local.get(['id', 'title', 'author', 'cover_image', 'availability', 'library', 'callNumber'], function(data) {
    itemHref = "http://proxy01.its.virginia.edu/login?url=https://search.lib.virginia.edu/catalog/".concat(data.id);
    short_title.innerHTML = data.title.substring(0, 25) + "...";
    full_title.innerHTML = data.title;

    coverImage.alt = data.title;
    short_title.href = itemHref;
    full_title.href = itemHref;
    if (data.author[0].length > 100)
        author.innerHTML = data.author[0].substring(0, 100) + "...";
    else {
        author.innerHTML = data.author[0];
    }
    coverImage.src = data.cover_image;
    if (data.title.length > 200)
        coverImage.src = '../images/cover_unavailable.png';
    if (data['availability'] == undefined || data['availability'] == '')
        data['availability'] = "Available";
    else if (data['availability'] == "Online")
        status.innerHTML = "Available online";
    else if (data['availability'] == "Request") {
        leoRequest.href =
            "http://proxy01.its.virginia.edu/login?url=https://search.lib.virginia.edu/account_requests/"
            .concat(data.id).concat("/ill_leo");
        leoRequest.innerHTML = data['availability']
    } else
        status.innerHTML = data['availability'];
    if (data.library != "") status.innerHTML = status.innerHTML + " at ";
    lib.innerHTML = data.library;
    lib.href = (mapHref + data.library.toString().replace(" ", "+") + "+Library+UVA");
    if (data.callNumber != 'undefined' && data.callNumber != "")
        callnum.innerHTML = ". Call number: " + data.callNumber;
})



// for resource
chrome.storage.local.get(['name', 'location', 'link', 'image'], function(data) {
    /*
    <img class="item-image2" src = "" id="cover_imageResource">
    <div class="item-details">
        <a class="item-title" id="title1" href="" target="_blank"></a></div>
        <div id="author1"></div>
        <div class="availability"></div>
    </div>
    */
    if (data.name != undefined && data.name != "") {
        let resource_img = document.createElement("img")
        resource_img.className = "item-image2"

        let resource_details = document.createElement("div")
        resource_details.className = "item-details"

        let resource_title = document.createElement("a")
        resource_title.className = "item-title-resource"

        let note = document.createElement("div")
        note.style.color = "#e57200"
        note.innerHTML = "(Resource)"

        let resource_location = document.createElement("a")
        resource_location.className = "availability"

        resource_details.appendChild(resource_title)
        resource_details.appendChild(note)
        resource_details.appendChild(resource_location)
        var content = document.getElementById("content-box")
        content.appendChild(resource_img)
        content.appendChild(resource_details)

        resource_title.innerText = data.name;
        resource_location.innerText = data.location;
        resource_location.target = '_blank';
        resource_location.setAttribute('href', mapHref + data.location);
        resource_title.target = '_blank';
        resource_title.setAttribute('href', data.link)

        //set images to default if not available otherwise get from the chrome storage and set it
        if (data.image == "Not Available") {
            resource_img.src = '../images/cover_unavailable.png';
        } else {
            resource_img.src = data.image;
        }
    }

})

//check if there's less than 1 additional items, if so don't show view more option
//but display request purchase option
chrome.storage.local.get(["numAdditionalItem"], function(result) {
    var viewMoreBox = document.getElementById("more-items-box")
    var requestPurchase = document.getElementById("requestPurchaseOnFrame")
    if (result.numAdditionalItem < 1) {
        viewMoreBox.style.display = "none"
        requestPurchase.style.display = "inline"
    }
})

//Checks to see what Accessibility mode is set in options and makes the required changes.
chrome.storage.local.get('accessMode', function(data) {
    if (data.accessMode) {
        //remove the hover and make the object clickable
        document.getElementById("QmarkText").style.visibility = "hidden";
        document.getElementById("questionMark").addEventListener("click", accessQuestionMark);
    }
})

//checks the accessMode (now video mode because the OG video mode doesn't work any longer) and runs the runners in content.js
/*chrome.storage.local.get('accessMode', function(data){
    if(data.accessMode){
        moviemoderunner();
    }else{
        bookmoderunner();
    }
  })*/

//changes the lightmode in the frame and runs the content.js darkmode and lightmode runners
chrome.storage.local.get('lightMode', function(data) {
    if (data.lightMode) {
        document.querySelectorAll(".icon-image")[0].src = "../images/753px-University_of_Virginia_Rotunda_logo.svg.png";
        document.querySelectorAll(".icon-box")[0].style.backgroundColor = "white";
        document.querySelectorAll(".icon-box")[0].style.borderRight = "2px solid #e57200";
        document.querySelectorAll(".content-box")[0].style.border = "var(--uva-orange-border)";
        lightmoderunner();
    } else {
        document.querySelectorAll(".icon-image")[0].src = "../images/icon_edited.png";
        document.querySelectorAll(".icon-box")[0].style.borderRight = "0px solid white";
        document.querySelectorAll(".icon-box")[0].style.backgroundColor = "var(--uva-blue)";
        document.querySelectorAll(".content-box")[0].style.border = "var(--uva-blue-border)";
        darkmoderunner();
    }
})


//Accessibility handler for tab clicking on the Question mark
function accessQuestionMark() {
    var checkDisplayStatus = document.getElementById("QmarkText").style.visibility;
    if (checkDisplayStatus === "hidden") {
        document.getElementById("QmarkText").style.visibility = "visible";
    } else if (checkDisplayStatus === "visible") {
        document.getElementById("QmarkText").style.visibility = "hidden";
    }
}

chrome.storage.local.get('cover_image1', function(data) {
    moreItemsImage.src = data.cover_image1;
})

/**
 * Source: https://developer.chrome.com/extensions/tut_analytics
 */
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

/**
 * Track a click on a button using the asynchronous tracking API.
 *
 * See http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html
 * for information on how to use the asynchronous tracking API.
 */
function trackButtonClick(e) {
    _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}

/**
 * Now set up your event handlers for the `button` and 'a' elements once the
 * html's DOM has loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', trackButtonClick);
    }
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', trackButtonClick);
    }
});