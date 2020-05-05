"use strict";

let max_title_characters = 20;

const matchList = document.getElementById("match-list");
let mapHref = "https://www.google.com/maps/search/?api=1&query=";

let searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchFunction);

// when the search button is pressed
let searchbutton = document.getElementById("searchButton");
searchbutton.addEventListener("click", function () {
  clicked(searchbar.value);
});

function searchFunction(e) {
  let searchvalue = e.target.value; // get the value in the search text
  var code = e.keyCode ? e.keyCode : e.which; // check which key is being pressed
  if (code == "13") {
    // when enter is pressed
    clicked(searchvalue);
  }
}

// this function is invoked when the search button or enter is pressed
function clicked(searchvalue) {
  // default search mode is book
  let mode = "books";
  // checking if the video checkbox is checked
  if (document.getElementById("accessmode").checked) {
    mode = "video";
  }
  // checking if the rare books checkbox is checked
  else if (document.getElementById("raremode").checked) {
    mode = "rarebooks";
  }
  // checking if the articles checkbox is checked
  else if (document.getElementById("articlemode").checked) {
    mode = "articles";
  }
  // if no checkbox is checked, do nothing
  else {
  }
  // look for the value in the search input bar
  if (searchvalue != null) {
    sendAuthorizationRequest().then((token) => {
      searchOnePool(searchvalue, mode, token).then(async (pool) => {
        // store data for the popup
        await storeResponseDataforPopup(pool);
        // store input text locally for dataset
        storeSearchValueLocally(searchvalue);
        // reload the popup after everything is done
        window.location.reload();
      });
    });
  }
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

// store the searched word in localstorage as an array
function storeSearchValueLocally(searchvalue) {
  let tempArray = [];
  if (localStorage.getItem("searchHistory")) {
    tempArray = localStorage.getItem("searchHistory");
    tempArray = tempArray ? tempArray.split(",") : [];
    if (tempArray.indexOf(searchvalue) !== -1) {
      tempArray = arrayRemove(tempArray, searchvalue);
    }
  }
  tempArray.push(searchvalue);
  localStorage.setItem("searchHistory", tempArray);
  return tempArray;
}

// when ever you type for something, it filters out the array
const searchInput = (searchtxt) => {
  if (localStorage.getItem("searchHistory")) {
    var existing = localStorage.getItem("searchHistory");
    existing = existing ? existing.split(",") : [];
  }
  let matches = existing.filter((tempValue) => {
    const regex = new RegExp(`^${searchtxt}`, "gi");
    return tempValue.match(regex);
  });

  if (searchtxt.length === 0) {
    matches = [];
  }
  outputHtml(matches.reverse());
};

//show results in search recommandation
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
      <option value="${match}">
    `
      )
      .join("");
    // console.log(html)
    matchList.innerHTML = html;
  }
};

searchbar.addEventListener("input", () => searchInput(searchbar.value));

function replaceSpace(searchvalue) {
  while (searchvalue.includes(" ")) {
    searchvalue = searchvalue.replace(" ", "+");
  }
  return searchvalue;
}

async function stringtest(value, index) {
  var obj = new Object();
  var title = "title".concat(index);
  obj[title] = value;
  await chrome.storage.local.set(obj, function () {});
}

function min(x, y) {
  return x < y ? x : y;
}

//var maxItemsOnPopup = 3;

chrome.storage.local.get(["numItemOnPopUp"], function (result) {
  let numItem = result.numItemOnPopUp;
  //console.log("numItem ", numItem);
  //Start create contents for recommend items
  let item = 0;
  //for (item; item < min(numItem, maxItemsOnPopup); item++) {
  for (item; item < numItem; item++) {
    var currentID = "id_" + item;
    var currentTitle = "title_" + item;
    var currentAuthor = "author_" + item;
    var currentCoverImage = "cover_image_" + item;
    var currentAvailability = "availability_" + item;
    var currentLibrary = "library_" + item;
    //Because chrome functions are asynchronous, need to call get data seperately and sequentially like this instead of in the same function
    getData(
      currentID,
      currentTitle,
      currentAuthor,
      currentCoverImage,
      currentAvailability,
      currentLibrary
    );
  }
});

var item_list = document.getElementById("item-list");
function getData(
  currentID,
  currentTitle,
  currentAuthor,
  currentCoverImage,
  currentAvailability,
  currentLibrary
) {
  /*Create contents to populate popup.html recommend items section. The html code generated looks like below
  <div class="item">
    <img style="margin:10px" class="ui middle aligned tiny bordered image">
    <div class="content">
        <li class="ui medium header">Title</li>
        <li class="ui sub header">Author</li>
        <li style="white-space:nowrap;width:29vh;overflow:hidden;text-overflow:clip;" class="ui orange sub header">Availability</li>
        <div class="extra">
            <a class="ui blue floated button" href="" target="_blank">Virgo</a>
            <a class="ui orange floated button" href="" target="_blank">Request</a>
        </div>
    </div>
  </div>
  */
  chrome.storage.local.get(
    [
      currentID,
      currentTitle,
      currentAuthor,
      currentCoverImage,
      currentAvailability,
      currentLibrary,
    ],
    function (data) {
      var img = document.createElement("img");
      img.className = "ui middle aligned tiny bordered image";
      img.style.margin = "10px";
      img.id = currentCoverImage;
      var title = document.createElement("li");
      title.id = currentTitle;
      title.className = "ui medium header";
      title.style.color = "white";
      var author = document.createElement("li");
      author.className = "ui sub header";
      author.style.color = "white";
      author.id = currentAuthor;
      var availability = document.createElement("li");
      availability.className = "ui orange sub header";
      availability.style =
        "white-space:nowrap;width:29vh;overflow:hidden;text-overflow:clip";
      availability.id = currentAvailability;

      var virgo_btn = document.createElement("a");
      virgo_btn.className = "ui blue foated button";
      virgo_btn.innerHTML = "Details";
      virgo_btn.target = "_blank";
      virgo_btn.id = currentID;
      var request_btn = document.createElement("a");
      request_btn.className = "ui orange floated button";
      request_btn.innerHTML = "Request";
      request_btn.target = "_blank";
      var extra = document.createElement("div");
      extra.className = "extra";
      extra.appendChild(virgo_btn);
      extra.appendChild(request_btn);

      var content = document.createElement("div");
      content.className = "content";
      content.appendChild(title);
      content.appendChild(author);
      content.appendChild(availability);
      content.appendChild(extra);

      var item = document.createElement("div");
      item.className = "item";
      item.appendChild(img);
      item.appendChild(content);
      item_list.appendChild(item);

      title.innerHTML = data[currentTitle];
      /*if (data[currentTitle].length > max_title_characters)
        title.innerHTML =
          data[currentTitle].substring(0, max_title_characters) + "...";
          */
      img.alt = "Cover image for the book: " + data[currentTitle]; // set image alt text as book title
      author.innerHTML = data[currentAuthor][0];
      if (data[currentAuthor][0].length > max_title_characters)
        author.innerHTML =
          data[currentAuthor][0].substring(0, max_title_characters) + "...";

      virgo_btn.href = "http://proxy01.its.virginia.edu/login?url=https://search.lib.virginia.edu/catalog/".concat(
        data[currentID]
      );

      request_btn.href =
        "http://proxy01.its.virginia.edu/login?url=https://search.lib.virginia.edu/account_requests/" +
        data[currentID] +
        "/ill_leo";

      img.src = data[currentCoverImage];
      if (data[currentAvailability] != "Request")
        request_btn.style.display = "none";
      if (data[currentAvailability] == "Online") {
        availability.innerHTML = "Available online";
        bool_0 = true;
      } else {
        if (data[currentLibrary] != "" && data[currentLibrary] != undefined)
          availability.innerHTML =
            data[currentAvailability] + " at " + data[currentLibrary];
        else availability.innerHTML = data[currentAvailability];
      }
    }
  );
}

chrome.storage.local.get({ searchHistory: [] }, appendHistoryHTML);

// Gets search history from chrome storage
// and renders HTML list elements with buttons
function appendHistoryHTML(data) {
  var searchHistory = data.searchHistory;
  var dropdownElements = document.getElementById("searchHistory");
  for (let i = 0; i < 5; i++) {
    if (!searchHistory[i]) {
      continue;
    }
    var node = document.createElement("LI");
    var link = document.createElement("a");
    link.href = searchHistory[i].url;
    link.className = "ui fluid blue floated button";
    link.target = "_blank";
    var textnode = document.createTextNode(
      searchHistory[i].keyword + " - " + searchHistory[i].site
    );
    link.appendChild(textnode);
    node.appendChild(link);
    dropdownElements.appendChild(node);
  }
}

chrome.storage.local.get({ viewedItems: [] }, appendViewedItemsHTML);

// Gets viewed item history from chrome storage
// and renders HTML list elements with buttons
function appendViewedItemsHTML(data) {
  var viewedItems = data.viewedItems;
  var listElements = document.getElementById("viewedItems");
  for (let j = 0; j < 5; j++) {
    if (!viewedItems[j]) {
      continue;
    }
    var node = document.createElement("LI");
    var link = document.createElement("a");
    link.href = viewedItems[j].url;
    link.className = "ui fluid blue floated button";
    link.target = "_blank";
    var textNode = document.createTextNode(
      viewedItems[j].title + " - " + viewedItems[j].site
    );
    link.appendChild(textNode);
    node.appendChild(link);
    listElements.appendChild(node);
  }
}

// Clears the backend chrome storage history lists (can't be called by tests)
function clearHistory() {
  chrome.storage.local.set({ viewedItems: [] }, function () {});
  chrome.storage.local.set({ searchHistory: [] }, function () {});
  clearHistoryUI();
}

// Helper function to clear the frontend HTML (called by tests)
function clearHistoryUI() {
  document.getElementById("viewedItems").innerHTML = "";
  document.getElementById("searchHistory").innerHTML = "";
}

function itemstabhandler(e) {
  document.getElementById("histab").style.display = "none";
  document.getElementById("setstab").style.display = "none";
  document.getElementById("rectab").style.display = "block";
}

// Change CSS style to show the History tab, hiding other tabs
// Activated when the My History Items button is clicked
function historytabhandler(e) {
  document.getElementById("histab").style.display = "block";
  document.getElementById("setstab").style.display = "none";
  document.getElementById("rectab").style.display = "none";
}

// Change CSS style to show the Settings tab, hiding other tabs
// Activated when the Settings button is clicked
function settingstabhandler(e) {
  document.getElementById("histab").style.display = "none";
  document.getElementById("setstab").style.display = "block";
  document.getElementById("rectab").style.display = "none";
}

/*Googe API initializer and tracker*/
//Source: https://developer.chrome.com/extensions/tut_analytics
var _AnalyticsCode = "UA-143602186-4";

var _gaq = _gaq || [];
_gaq.push(["_setAccount", _AnalyticsCode]);
_gaq.push(["_trackPageview"]);

(function () {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src = "https://ssl.google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();

// Track a click on a button using the asynchronous tracking API.

function trackButtonClick(e) {
  _gaq.push(["_trackEvent", e.target.id, "clicked"]);
}

/**
 * Now set up your event handlers for the `button` and 'a' elements once the
 * html's DOM has loaded.
 *
 * This event listener also checks for the popup button tab clicks.
 */
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("itembutton")
    .addEventListener("click", itemstabhandler);
  document
    .getElementById("hisbutton")
    .addEventListener("click", historytabhandler);
  document
    .getElementById("setbutton")
    .addEventListener("click", settingstabhandler);
  document
    .getElementById("clearHistory")
    .addEventListener("click", clearHistory);
  console.log("we loaded the functions!");

  var buttons = document.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", trackButtonClick);
  }
  var links = document.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", trackButtonClick);
  }
});

var mode;
// this function changes the background the given paramater when the mouse is on the given row
function mouseover(row, col, id, leo, ci) {
  row.style.backgroundColor = "#e47106"; // changes the background of row
  // row.style.transition = "all .1s ease-in-out";
  col.style.backgroundColor = "#e47106"; // changes the background of col
  // col.style.transition = "all .1s ease-in-out";
  id.style.backgroundColor = "#232d4b"; // changes the background of id
  leo.style.backgroundColor = "#232d4b"; // changes the background of leo button
  ci.style.boxShadow = "1px 1px white, 2px 2px white, 3px 3px white"; // this puts shadow around the book cover
  ci.style.webkitTransform = "translateX(-3px)"; // moves the book cover 3px towards right
  ci.style.transform = "translateX(-3px)"; // moves the book cover 3px towards right
  ci.style.borderLeft = "1px solid white"; // adds border to the left
  ci.style.borderTop = "1px solid white"; // adds border to the top
  ci.style.backgroundColor = "var(--uva-blue)"; // changes the background color to --uva-blue
  // id.style.transition = "all .1s ease-in-out";
  return (
    row.style.backgroundColor +
    col.style.backgroundColor +
    id.style.backgroundColor
  );
}

// this function will resets all the styles added using mouseover function when the mouse is moved out of the row
function mouseout(row, col, id, leo, ci) {
  row.style.backgroundColor = ""; // resets the background
  col.style.backgroundColor = "";
  id.style.backgroundColor = "";
  leo.style.backgroundColor = "";
  ci.style.boxShadow = ""; // no shadow anymore
  ci.style.webkitTransform = ""; // goes back to where it was
  ci.style.transform = ""; // goes back to where it was
  ci.style.borderLeft = "0px solid white"; // no border to the left
  ci.style.borderTop = "0px solid white"; // no border to the top
  ci.style.backgroundColor = ""; // background color resets
  return (
    row.style.backgroundColor + col.style.background + id.style.backgroundColor
  );
}

// calls the mouseover when the mouse is over the specified row
row1.addEventListener("mouseover", function (e) {
  mouseover(row1, col1, id_0, leo_0, ci_0);
});
// calls the mouseover when the mouse is moved away the specified row
row1.addEventListener("mouseout", function (e) {
  mouseout(row1, col1, id_0, leo_0, ci_0);
});

// calls the mouseover when the mouse is over the specified row
row2.addEventListener("mouseover", function (e) {
  mouseover(row2, col2, id_1, leo_1, ci_1);
});
// calls the mouseover when the mouse is moved away the specified row
row2.addEventListener("mouseout", function (e) {
  mouseout(row2, col2, id_1, leo_1, ci_1);
});

// calls the mouseover when the mouse is over the specified row
row3.addEventListener("mouseover", function (e) {
  mouseover(row3, col3, id_2, leo_2, ci_2);
});
// calls the mouseover when the mouse is moved away the specified row
row3.addEventListener("mouseout", function (e) {
  mouseout(row3, col3, id_2, leo_2, ci_2);
});
