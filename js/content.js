const SHEET_ID = "1Gt6TmuzUjQ1zFiIL1YnpceFY-5nyb4TeIAuSXKS_8n0";
var spreadSheetData;
let resourceAvailable = false;
selectionGlobal = "books";

//Checks to see what Movie Mode is set as mode is set in options and makes the required changes.
//This is super long rn,  but in the future I'll simplify it down.

async function checkMode() {
    //console.log("running the mode changer");
    chrome.storage.local.get("accessMode", function(data) {
        //console.log("We've returned from checking chrome local storage");
        if (data.accessMode) {
            // Break this out into non chained
            //console.log("You've selected Movie Mode");
            selectionGlobal = "video";
            changeSelection("video"); //these havev been converted to use the change selection method
        } else {
            chrome.storage.local.get("rareMode", function(data) {
                //console.log("We've returned from checking chrome local storage 2");
                if (data.rareMode) {
                    //console.log("You've selected Rare Books Mode");
                    selectionGlobal = "rarebooks";
                    changeSelection("rarebooks");
                } else {
                    //console.log("We've returned from checking chrome local storage 3");
                    chrome.storage.local.get("articleMode", function(data) {
                        if (data.articleMode) {
                            //console.log("You've selected Articles Mode");
                            selectionGlobal = "articles";
                            changeSelection("articles");
                        } else {
                            chrome.storage.local.get("musicrecordingMode", function(data) {
                                if (data.musicrecordingMode) {
                                    //console.log("You've selected Music-Recording Mode");
                                    selectionGlobal = "music-recordings";
                                    changeSelection("music-recordings");
                                } else {
                                    chrome.storage.local.get("musicalscoresMode", function(
                                        data
                                    ) {
                                        if (data.musicalscoresMode) {
                                            //console.log("You've selected Musical Scores Mode");
                                            selectionGlobal = "musical-scores";
                                            changeSelection("musical-scores");
                                        } else {
                                            chrome.storage.local.get("journalsMode", function(data) {
                                                if (data.journalsMode) {
                                                    //console.log("You've selected Journals Mode");
                                                    selectionGlobal = "journals";
                                                    changeSelection("journals");
                                                } else {
                                                    chrome.storage.local.get(
                                                        "soundrecordingsMode",
                                                        function(data) {
                                                            if (data.soundrecordingsMode) {
                                                                //console.log("You've selected Sound Recordings Mode");
                                                                selectionGlobal = "sound-recordings";
                                                                changeSelection("sound-recordings");
                                                            } else {
                                                                chrome.storage.local.get(
                                                                    "thesesMode",
                                                                    function(data) {
                                                                        if (data.thesesMode) {
                                                                            //console.log("You've selected Theses Mode");
                                                                            selectionGlobal = "thesis";
                                                                            changeSelection("thesis");
                                                                        } else {
                                                                            chrome.storage.local.get(
                                                                                "archivalMode",
                                                                                function(data) {
                                                                                    if (data.archivalMode) {
                                                                                        //console.log("You've selected Archival Mode");
                                                                                        selectionGlobal = "archival";
                                                                                        changeSelection("archival");
                                                                                    } else {//console.log("You've selected Book Mode");
                                                                                        changeSelection("books");
                                                                                    }
                                                                                }
                                                                            );
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                        }
                                                    );
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    //this promise doesn't actually do anything but it's here to make sure that this function runs asynchrounously

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, 1);
    });
}

//asnyc function that checks the article mode in google chrome storage, then changes the global selection variable if needed
async function checkArticleMode() {
    chrome.storage.local.get("articleMode", function(data) {
        if (data.articleMode) {
            //console.log("You've selected Article Mode");
            changeSelection("article");
        }
    });
}

//asnyc function that checks the video mode in google chrome storage, then changes the global selection variable if needed
async function checkVideoMode() {
    chrome.storage.local.get("accessMode", function(data) {
        if (data.accessMode) {
            //console.log("You've selected Video Mode");
            changeSelection("video");
        }
    });
}

//asnyc function that checks the rare books mode in google chrome storage, then changes the global selection variable if needed
async function checkRareBooksMode() {
    chrome.storage.local.get("rareMode", function(data) {
        if (data.rareMode) {
            //console.log("You've selected Rare Books Mode");
            changeSelection("rarebooks");
        }
    });
}

//asnyc function that checks the music recordings mode in google chrome storage, then changes the global selection variable if needed
async function checkMusicRecordingMode() {
    chrome.storage.local.get("musicrecordingMode", function(data) {
        if (data.musicrecordingMode) {
            //console.log("You've selected Music Recording Mode");
            changeSelection("music-recordings");
        }
    });
}

//asnyc function that checks the musical scores mode in google chrome storage, then changes the global selection variable if needed
async function checkMusicalScoresMode() {
    chrome.storage.local.get("musicalscoresMode", function(data) {
        if (data.musicalscoresMode) {
            //console.log("You've selected Music Scores Mode");
            changeSelection("musical-scores");
        }
    });
}

//asnyc function that checks the journals mode in google chrome storage, then changes the global selection variable if needed
async function checkJournalsMode() {
    chrome.storage.local.get("journalsMode", function(data) {
        if (data.journalsMode) {
            //console.log("You've selected Journals Mode");
            changeSelection("journals");
        }
    });
}

//asnyc function that checks the sound recordings mode in google chrome storage, then changes the global selection variable if needed
async function checkSoundRecordingsMode() {
    chrome.storage.local.get("soundrecordingsMode", function(data) {
        if (data.soundrecordingsMode) {
            //console.log("You've selected Sound Recordings Mode");
            changeSelection("sound-recordings");
        }
    });
}

//asnyc function that checks the theses mode in google chrome storage, then changes the global selection variable if needed
async function checkThesesMode() {
    chrome.storage.local.get("thesesMode", function(data) {
        if (data.thesesMode) {
            //console.log("You've selected Thesis Mode");
            changeSelection("thesis");
        }
    });
}

//asnyc function that checks the archival mode in google chrome storage, then changes the global selection variable if needed
async function checkArchivalMode() {
    chrome.storage.local.get("archivalMode", function(data) {
        if (data.archivalMode) {
            //console.log("You've selected Archival Mode");
            selectionGlobal = "archival";
            changeSelection("archival");
        }
    });
}

//asnyc function that checks the books mode in google chrome storage, then changes the global selection variable if needed
async function checkBookMode() {
    chrome.storage.local.get("bookMode", function(data) {
        if (data.booksMode) {
            //console.log("You've selected Book Mode");
            changeSelection("books");
        }
    });
}

//new async function to run the actual mode changer in the hopes that it will actually do what we wish it to do
async function selectionChangerCall() {
    //console.log("Running selection changer");
    checkArchivalMode();
    await checkThesesMode();
    await checkSoundRecordingsMode();
    await checkJournalsMode();
    await checkMusicalScoresMode();
    await checkMusicRecordingMode();
    await checkRareBooksMode();
    await checkVideoMode();
    await checkArticleMode();
    await checkBookMode();
    const result = await checkMode();
    //console.log(result);
    // expected output: 'resolved'
}

//this shouuld call the selection Changer Call automatically, which will then call the async mode function handler
//selectionChangerCall();

//Checks to see what Color mode is set in options and makes the required changes.
chrome.storage.local.get("lightMode", function(data) {
    // //console.log(data.lightMode);
    if (data.lightMode) {
        lightmoderunner();
    } else {
        darkmoderunner();
    }
});

//basic function to change the global selection variable
function changeSelection(selection) {
    selectionGlobal = selection;
}

//this method sets the lightmode for the popup
function lightmoderunner() {
    //changeSelection("video");
    let colElements = document.querySelectorAll(".col-8");
    for (let i = 0; i < colElements.length; i++) {
        colElements[i].style.backgroundColor = "white";
    }

    let rowElements = document.querySelectorAll(".row");
    for (let i = 0; i < rowElements.length; i++) {
        rowElements[i].style.marginTop = "10px";
    }

    let listElements = document.querySelectorAll("li");
    for (let i = 0; i < listElements.length; i++) {
        listElements[i].style.color = "#232d4b";
    }
}
// this method sets the dark mode for the popup
function darkmoderunner() {
    let colElements = document.querySelectorAll(".col-8");
    for (let i = 0; i < colElements.length; i++) {
        colElements[i].style.backgroundColor = "#232d4b";
    }

    let rowElements = document.querySelectorAll(".row");
    for (let i = 0; i < rowElements.length; i++) {
        rowElements[i].style.marginTop = "0px";
    }

    let listElements = document.querySelectorAll("li");
    for (let i = 0; i < listElements.length; i++) {
        listElements[i].style.color = "white";
    }
}

// Main function wraps overall execution for URL parsing & API calls
(function() {
    let url = window.location.toString();
    let keyword = parseUrl(url);

    // localStorage.removeItem('searchHistory')
    if (localStorage.getItem("searchHistory")) {
        let tempArray = localStorage.getItem("searchHistory");
        tempArray = tempArray ? tempArray.split(",") : [];
        //console.log("Last Item: " + tempArray[tempArray.length - 1]);
    }

    // Async handler to parse and store JSON data from the Virgo API response
    // Search by keyword and which pool of resource to search in
    //console.log(keyword);
    if (keyword != null && keyword != "") {
        sendAuthorizationRequest().then((token) => {
            //console.log("serverresp", token);
            searchOnePool(keyword, selectionGlobal, token).then(async(pool) => {
                ////console.log("Server response", auth.response);
                //console.log("SHOW POOL TEST", pool);
                await getSheetValues(keyword);
                await storeSpreadSheetResource(spreadSheetData);
                await storeResponseDataforPopup(pool);
                await storeResponseDataforFrame(pool);
            });
        });
    }
})();

async function storeResponseDataforSearch(allBooks) {
    if (allBooks.length > 0) {
        storeResponseDataGenericBook(allBooks[0], "_0");
    } else {
        clearResponseDataGenericBook("_0");
    }
    if (allBooks.length > 1) {
        storeResponseDataGenericBook(allBooks[1], "_1");
    } else {
        clearResponseDataGenericBook("_1");
    }
    if (allBooks.length > 2) {
        storeResponseDataGenericBook(allBooks[2], "_2");
    } else {
        clearResponseDataGenericBook("_2");
    }
    // //console.log("Search done");
}

//gets isbn number of the book from amazon
function getIsbnFromAmazon() {
    let allinfo = ""
    var arr;

    try {
        allinfo = document.getElementById("printEditionIsbn_feature_div").innerText;
    } catch (error) {}

    if (allinfo == "") {
        try {
            allinfo = document.querySelector("#productDetailsTable").innerText;

        } catch (error) {}
    }


    arr = allinfo.split("\n");

    let indexofisbn = -1;
    let counter = 0;
    while (counter < arr.length) {
        if (arr[counter].includes("ISBN-13")) {
            indexofisbn = counter;
            break;
        }
        counter++;
    }
    let title = getTitleAmazon();
    if (indexofisbn != -1) {
        let isbn = arr[indexofisbn];
        isbn = isbn.substr(9)
        storeToViewedItems({
            isbn: isbn,
            title: title,
            site: "Amazon",
            url: window.location.toString(),
        });

        let isbnAndTitle = isbn + "} OR keyword: {" + title;
        return isbnAndTitle;
    }
    return title;
}

// Any time a website query pings the extension script, the search term
// as well as the website name and url get logged for searchHistory lookup
async function storeToSearchHistory(item) {
    chrome.storage.local.get({ searchHistory: [] }, function(result) {
        let searchHistory = result.searchHistory;
        searchHistory.unshift(item);
        searchHistory.length = 5;
        chrome.storage.local.set({ searchHistory: searchHistory }, function() {
        });
    });
}

// When an item on a domain that uses our content script is viewed,
// the item details (currently ISBN, name, author, url) are logged for item history
async function storeToViewedItems(item) {
    chrome.storage.local.get({ viewedItems: [] }, function(result) {
        let viewedItems = result.viewedItems;
        viewedItems.unshift(item);
        viewedItems.length = 5;
        chrome.storage.local.set({ viewedItems: viewedItems }, function() {
            //console.log("Item isbn " + item.isbn + " added to Recently Viewed Items");
            //console.log(viewedItems);
        });
    });
}

//gets isbn number from barnes
function getIsbnFromBarnes() {
    //sleep(1000);
    if (document.querySelector("#ProductDetailsTab") != null) {
        let allinfo = document.querySelector("#ProductDetailsTab").innerText;
        let arr = allinfo.split("\n");

        let indexofisbn = -1;
        let counter = 0;
        while (counter < arr.length) {
            if (arr[counter].includes("ISBN-13")) {
                indexofisbn = counter;
            }
            counter++;
        }
        let title = getTitleBarnes();
        if (title != null) {
            if (indexofisbn != -1) {
            let isbn = arr[indexofisbn];
            let isbnstringarray = isbn.split("\t");
            let isbnAndTitle = isbnstringarray[1] + "} OR keyword: {" + title;
            storeToViewedItems({
                isbn: isbnstringarray[1],
                title: title,
                site: "Barnes & Noble",
                url: window.location.toString(),
            });
            return isbnAndTitle;
            }
        }
        return title;
    }
}

function getTitleAmazon() {

    let bookTitle = "";



    try {
        bookTitle = document.querySelector("#productTitle").innerText;
        bookTitle = bookTitle.replace("(", "");
        bookTitle = bookTitle.replace(")", "");
        return bookTitle;
    } catch (error) {}


    if (bookTitle == "") {
        try {
            var title = document.getElementById("ebooksProductTitle").innerText;
            return title;

        } catch (error) {

        }
    }

    if (bookTitle == "") {
        try {
            var title = document.getElementsByClassName("av-detail-section")[0].innerText;
            selectionGlobal = "video"
            var arr = title.split("\n");
            //console.log(arr[0])
            return arr[0];

        } catch (error) {

        }
    }

    return "";
}

function getTitleBarnes() {
    let bookinfo = document.querySelector("#pdp-header-info").innerText;
    let allbookinfoarr = bookinfo.split("\n");
    return allbookinfoarr[0];
}

/*
Function for obtaining the search value from the chrome URL
*/
function parseUrl(url) {
    //let url = window.location.toString();
    let addr = new URL(url);
    // dispatch based on the domain
    if (url.includes("amazon")) {
        return parseAmazonUrl(addr, url);
    } else if (url.includes("google")) {
        return parseScholarUrl(addr);
    } else if (url.includes("barnes")) {
        return parseBarnesUrl(addr, url);
    } else {
        return addr.searchParams.get("q");
    }
}

function parseAmazonUrl(addr, url) {
    if (url.includes("?k=")) {
        let searchval = document.querySelector("#twotabsearchtextbox").value;
        storeToSearchHistory({ keyword: searchval, site: "Amazon", url: url });
        return searchval;
    }
    keyword = getIsbnFromAmazon();
    return keyword;
}

function parseScholarUrl(addr) {
    let searchValue = document.querySelector("#gs_hdr_tsi").value;
    storeToSearchHistory({
        keyword: searchValue,
        site: "Google Scholar",
        url: addr.toString(),
    });
    return searchValue;
}

function parseBarnesUrl(addr, url) {
    if (url.includes("/s/")) {
        keyword = document.querySelector("#searchBarBN").value;
        storeToSearchHistory({
            keyword: keyword,
            site: "Barnes & Noble",
            url: url,
        });
        return keyword;
    } else {
        keyword = getIsbnFromBarnes();
        return keyword;
    }
}

// done first, to get the authorization for each search
async function sendAuthorizationRequest() {
    let token = "";
    await fetch("https://v4.lib.virginia.edu/authorize", {
            method: "POST",
        })
        .then((response) => {
            return response.text();
        })
        .then((serverToken) => {
            token = serverToken;
        })
        .catch((error) => {
            console.error(error);
        });
    return token;
}

// Extract JSON fields for each book
// Fields extracted: ID, Title, Author, Availability, Subject, Library, Cover Image
// AJAX setup to make Virgo API requests on page load
// Search for an Item by keyword and whichever form of resource
async function searchOnePool(keyword, poolID, token) {
    // multi dimensional array to store current pool
    let pool = [];
    ////console.log("2 print token", token);
    // Set up for Search Request
    // Can Exclude or Include a Pool
    // See Virgo API for more filter
    const searchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token,
        },
        body: '{"query":"keyword: {' +
            keyword +
            '}","pagination":{"start":0,"rows":13}}',
    };

    // Do The POST Request to fetch response
    // the response will have the search results
    // await checkMode();
    await selectionChangerCall();

    setTimeout((poolID = selectionGlobal), 5000);

    await checkMode();
    //console.log("SHOW POOL ID ", poolID);
    await fetch(
            "https://search-ws.internal.lib.virginia.edu/api/search",
            searchOptions
        )
        .then((response) => {
            // Retreieve Response
            return response.text();
        })
        .then((response) => {
            // Reduce information
            // Take each fields' name and make it an object
            // Take the value of the field and store it as a key to the object
            // obj = { "field.name": field.value }
            // created an array because some fields have multiple authors, subject, etc.
            // Send this to the front end thereafter

            let formattedResponse = JSON.parse(response);
            for (poolResult of formattedResponse["pool_results"]) {
                if (poolResult.pool_id == poolID && poolResult.pagination.total != 0) {
                    for (groupList of poolResult["group_list"]) {
                        let newItem = {};
                        for (recordList of groupList["record_list"]) {
                            for (fields of recordList["fields"]) {
                                if (newItem.hasOwnProperty(fields.name)) {
                                    newItem[fields.name].push(fields.value);
                                } else {
                                    newItem[fields.name] = [];
                                    newItem[fields.name].push(fields.value);
                                }
                            }
                            break;
                        }
                        pool.push(newItem);
                    }
                    return pool;
                }
            }
        })
        .catch((err) => {
            console.error(err);
        });
    //console.log("SHOW POOL ID ", poolID);
    return pool;
}

// Check if some resources are undefined
let checkUndefined = (list) => {
    if (list == undefined) {
        return true;
    } else return false;
};

// Function which stores data for a single book to Chrome's Local Storage
// Data is stored with an appended "index" tag on the end of each field
async function storeResponseDataGenericBook(book, index) {
    let obj = new Object();
    var id = "id".concat(index);
    obj[id] = checkUndefined(book.id) ? "" : book.id[0];

    var title = "title".concat(index);
    obj[title] = book.title[0];

    var author = "author".concat(index);
    for (a in book.author) {
        authorName = book.author[a];
        authorArray = authorName.split(",");
        if (authorArray.length > 1) {
            authorName = authorArray[1].trim() + " " + authorArray[0].trim();
            authorName = authorName.replace(/ \[.*?\] /g, "");
            authorName = authorName.replace(/ \(.*?\) /g, " ");
        }
        book.author[a] = authorName;
    }
    obj[author] = checkUndefined(book.author) ? "" : book.author;

    var availability = "availability".concat(index);
    obj[availability] = checkUndefined(book.availability) ?
        "" :
        book.availability[0];

    var callNumber = "callNumber".concat(index);
    obj[callNumber] = checkUndefined(book.call_number) ? "" : book.call_number[0];

    var url = "url".concat(index);
    obj[url] = checkUndefined(book.sirsi_url) ? "" : book.sirsi_url[0];

    var subject = "subject".concat(index);
    obj[subject] = checkUndefined(book.subject) ? "" : book.subject[0];

    var library = "library".concat(index);
    obj[library] = checkUndefined(book.library) ? "" : book.library;

    var cover_image = "cover_image".concat(index);
    obj[cover_image] = checkUndefined(book.cover_image) ?
        "" :
        book.cover_image[0];

    await chrome.storage.local.set(obj, function() {});
}

async function clearResponseDataGenericBook(index) {
    var arr = new Array();

    var id = "id".concat(index);
    arr.push(id);

    var title = "title".concat(index);
    arr.push(title);

    var author = "author".concat(index);
    arr.push(author);

    var availability = "availability".concat(index);
    arr.push(availability);

    var callNumber = "callNumber".concat(index);
    arr.push(callNumber);

    var url = "url".concat(index);
    arr.push(url);

    var subject = "subject".concat(index);
    arr.push(subject);

    var library = "library".concat(index);
    arr.push(library);

    var cover_image = "cover_image".concat(index);
    arr.push(cover_image);

    var isbn = "isbn".concat(index);
    arr.push(isbn);

    await chrome.storage.local.remove(arr, function() {});
}

//store the matched resource in chrome's local storage
async function storeSpreadSheetResource(resource) {
    //console.log(resource);
    var obj = new Object();
    if (resource != null) {
        obj["name"] = resource[0];
        obj["location"] = resource[2];
        obj["link"] = resource[3];
        obj["image"] = resource[4];
        //console.log(resource[2]);
        //console.log(resource[1]);
        //console.log(resource[0]);
    } else {
        obj["name"] = "";
        obj["location"] = "";
        obj["image"] = "";
        obj["link"] = "";
    }
    await chrome.storage.local.set(obj, function() {});
}

// Log and Store data (through Chrome local storage API) for the first 3 books retrieved,
// to then be retrievable for the popup
async function storeResponseDataforPopup(allBooks) {
    /*
      if (allBooks.length > 0) {
        storeResponseDataGenericBook(allBooks[0], "_0");
      } else {
        clearResponseDataGenericBook("_0");
      }
      if (allBooks.length > 1) {
        storeResponseDataGenericBook(allBooks[1], "_1");
      } else {
        clearResponseDataGenericBook("_1");
      }
      if (allBooks.length > 2) {
        storeResponseDataGenericBook(allBooks[2], "_2");
      } else {
        clearResponseDataGenericBook("_2");
      }
      */
    for (i = 0; i < allBooks.length; i++) {
        if (allBooks.length > i) {
            storeResponseDataGenericBook(allBooks[i], "_" + i.toString());
        } else {
            clearResponseDataGenericBook("_" + i.toString());
        }
    }
    chrome.storage.local.set({ numItemOnPopUp: allBooks.length },
        function() {}
    );
}

// Log and Store data (through Chrome local storage API) for the first book retrieved,
// to then be retrievable for the banner frame
var maxnumAdditionalItem = 12;
var numAdditionalItem = 0;

function storeResponseDataforFrame(allBooks) {
    //first item. go on frame
    if (allBooks.length > 0) {
        storeResponseDataGenericBook(allBooks[0], "");
        renderFrame();
        renderRequestPurchase();
    } else if (allBooks.length == 0 && resourceAvailable) {
        clearResponseDataGenericBook("");
        renderFrame();

    } else {
        clearResponseDataGenericBook("");
    }

    //next 12 items, go on view more
    for (i = 1; i <= maxnumAdditionalItem; i++) {
        if (allBooks.length > i) {
            storeResponseDataGenericBook(allBooks[i], i.toString());
            numAdditionalItem++;
        } else {
            clearResponseDataGenericBook(i.toString());
        }
    }
    chrome.storage.local.set({ numAdditionalItem: numAdditionalItem },
        function() {}
    );
    if (numAdditionalItem > 0) {
        renderViewMore();
    }
}

//if search return is not null, create frame on main page to show first related item from Virgo
function renderFrame() {
    var extensionOrigin = "chrome-extension://" + chrome.runtime.id;
    if (!location.ancestorOrigins.contains(extensionOrigin) &&
        document.body != null
    ) {
        pushTopDown();
        var frame = document.createElement("iframe");
        frame.src = chrome.runtime.getURL("../html/frame.html");
        frame.id = "frame";
        frame.style.backgroundColor = "transparent";
        frame.style.border = "0px";
        frame.style.overflow = "visible";
        frame.style.padding = "0px";
        frame.style.width = "100%";
        frame.style.height = "80px";
        frame.style.top = "0px";
        frame.style.right = "auto";
        frame.style.left = "auto";
        frame.style.zIndex = "2147483647";
        frame.style.boxShadow = "rgba(0, 0, 0, 0.6) 0px 3px 3px";
        frame.style.position = "fixed";
        frame.style.opacity = "1";
        frame.style.display = "inline";
        document.body.appendChild(frame);
    }
}

function renderViewMore() {
    //console.log("in render viewmore");
    var viewMoreFrame = document.createElement("iframe");
    viewMoreFrame.src = chrome.runtime.getURL("../html/view-more.html");
    viewMoreFrame.id = "viewMoreFrame";
    viewMoreFrame.style.backgroundColor = "#232d4b";
    viewMoreFrame.style.borderWidth = "0px 0px 3px";
    viewMoreFrame.style.borderColor = "#232d4b";
    viewMoreFrame.style.overflow = "visible";
    viewMoreFrame.style.padding = "0px";
    viewMoreFrame.style.right = "auto";
    viewMoreFrame.width = "100%";
    viewMoreFrame.style.left = "0px";
    viewMoreFrame.style.height = "250px";
    viewMoreFrame.style.top = "80px";
    viewMoreFrame.style.zIndex = "2147483647";
    viewMoreFrame.style.boxShadow = "rgba(0, 0, 0, 0.6) 0px 3px 3px";
    viewMoreFrame.style.position = "fixed";
    viewMoreFrame.style.opacity = "1";
    viewMoreFrame.style.maxHeight = "562px";
    viewMoreFrame.style.display = "none";
    document.body.appendChild(viewMoreFrame);
}

function renderRequestPurchase() {
    var requestPurchase = document.createElement("iframe");
    requestPurchase.id = "purchaseRequest";
    requestPurchase.src = chrome.runtime.getURL("../html/purchase-request.html");
    requestPurchase.style.backgroundColor = "white";
    requestPurchase.style.borderWidth = "0px 0px 3px";
    requestPurchase.style.borderColor = "#232d4b";
    requestPurchase.style.overflow = "visible";
    requestPurchase.style.padding = "0px";
    requestPurchase.style.right = "auto";
    requestPurchase.width = "100%";
    requestPurchase.style.left = "0px";
    requestPurchase.style.height = "340px";
    requestPurchase.style.top = "80px";
    requestPurchase.style.zIndex = "2147483647";
    requestPurchase.style.boxShadow = "rgba(0, 0, 0, 0.6) 0px 3px 3px";
    requestPurchase.style.position = "fixed";
    requestPurchase.style.opacity = "1";
    requestPurchase.style.maxHeight = "562px";
    requestPurchase.style.display = "none";
    document.body.appendChild(requestPurchase);
}

//Push margin-top down 80px when frame is inserted
function pushTopDown() {
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "margin-top: 80px !important");
}

//Push margin-top back up 80px when frame is closed
function pushTopUp() {
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "margin-top: 0px !important");
}

//Chrome listener for messages from other js files
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // //console.log(sender.tab ?
    // "from a content script:" + sender.tab.url :
    // "from the extension");
    // if message from frame.js to close frame then push top up
    if (request.command == "close frame") {
        pushTopUp();
        sendResponse({ echo: "closed, pushed top up" });
        //these two lines actually remove the frame from view
        var frame = document.getElementById("frame");
        var viewMoreFrame = document.getElementById("viewMoreFrame");
        var purchaseRequestFrame = document.getElementById("purchaseRequest");
        frame.style.display = "none";
        if (viewMoreFrame != null) viewMoreFrame.style.display = "none";
        if (purchaseRequestFrame != null)
            purchaseRequestFrame.style.display = "none";
    }
    // if message from frame.js to view more items
    if (request.command == "view more items") {
        var viewMoreFrame = document.getElementById("viewMoreFrame");
        if (viewMoreFrame.style.display == "none")
            viewMoreFrame.style.display = "inline";
        else viewMoreFrame.style.display = "none";
        sendResponse({ echo: "show more items" });
    }
    // if mesaage from view-more.js to close view more frame
    if (request.command == "close view more frame") {
        var viewMoreFrame = document.getElementById("viewMoreFrame");
        if (viewMoreFrame != null) viewMoreFrame.style.display = "none";
        sendResponse({ echo: "closed view more frame" });
    }
    // if mesaage from view-more.js to render purchase request
    if (request.command == "render purchase request") {
        //console.log("in render purchase request");
        var purchaseRequestFrame = document.getElementById("purchaseRequest");
        var viewMoreFrame = document.getElementById("viewMoreFrame");
        if (viewMoreFrame != null && viewMoreFrame.style.display == "inline")
            viewMoreFrame.style.display = "none";
        /*
                if (purchaseRequestFrame != null && purchaseRequestFrame.style.display == 'none')
                    purchaseRequestFrame.style.display = 'inline';
                else if (purchaseRequestFrame != null && purchaseRequestFrame.style.display == 'inline')
                    purchaseRequestFrame.style.display = 'none';
                */
        if (purchaseRequestFrame.style.display == "none")
            purchaseRequestFrame.style.display = "inline";
        else purchaseRequestFrame.style.display = "none";
        sendResponse({ echo: "show purchase request frame" });
    }
    // if mesaage from purchase-request.js to close puchase request frame
    if (request.command == "close purchase request frame") {
        var purchaseRequestFrame = document.getElementById("purchaseRequest");
        if (purchaseRequestFrame != null)
            purchaseRequestFrame.style.display = "none";
        sendResponse({ echo: "closed purchase request frame" });
    }
    // if message from purchase-request.js to go back to view-more.html
    if (request.command == "back to view more") {
        var purchaseRequestFrame = document.getElementById("purchaseRequest");
        var viewMoreFrame = document.getElementById("viewMoreFrame");
        if (viewMoreFrame != null && viewMoreFrame.style.display != null)
            viewMoreFrame.style.display = "inline";
        if (
            purchaseRequestFrame != null &&
            purchaseRequestFrame.style.display == "inline"
        )
            purchaseRequestFrame.style.display = "none";
        sendResponse({ echo: "back to view more from purchase request" });
    }
});

//End of Frame Closure Code

function sendVirgoRequest(searchRequest, keyword) {
    return searchRequest.send(
        '{"query":"keyword: {' + keyword + '}","pagination":{"start":0,"rows":10}}'
    );
}

//Checks to see what Color mode is set in options and makes the required changes.
chrome.storage.local.get("lightMode", function(data) {
    // //console.log(data.lightMode);
    if (data.lightMode) {
        lightmoderunner();
    } else {
        darkmoderunner();
    }
});

//basic function to change the global selection variable
function changeSelection(selection) {
    selectionGlobal = selection;
}

//this method sets the lightmode for the popup
function lightmoderunner() {
    //changeSelection("video");
    let colElements = document.querySelectorAll(".col-8");
    for (let i = 0; i < colElements.length; i++) {
        colElements[i].style.backgroundColor = "white";
    }

    let rowElements = document.querySelectorAll(".row");
    for (let i = 0; i < rowElements.length; i++) {
        rowElements[i].style.marginTop = "10px";
    }

    let listElements = document.querySelectorAll("li");
    for (let i = 0; i < listElements.length; i++) {
        listElements[i].style.color = "#232d4b";
    }
}
// this method sets the dark mode for the popup
function darkmoderunner() {
    let colElements = document.querySelectorAll(".col-8");
    for (let i = 0; i < colElements.length; i++) {
        colElements[i].style.backgroundColor = "#232d4b";
    }

    let rowElements = document.querySelectorAll(".row");
    for (let i = 0; i < rowElements.length; i++) {
        rowElements[i].style.marginTop = "0px";
    }

    let listElements = document.querySelectorAll("li");
    for (let i = 0; i < listElements.length; i++) {
        listElements[i].style.color = "white";
    }
}

//this mode changes the global pool to run the movie selection rather than the book pool
function moviemoderunner() {
    changeSelection("video");
}

//this function changes the globalselection variable back to Book pool rather than movie pool
function bookmoderunner() {
    changeSelection("books");
}

function articlesmoderunner() {
    changeSelection("articles");
}

function rarebooksmoderunner() {
    changeSelection("rarebooks");
}


//get values from google sheet using sheetsapi
async function getSheetValues(keyword) {
    const request = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A:E?key=AIzaSyCrSJlUYTRg2F8kjEg_kymI-OtJfuXKu5A`, {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    spreadSheetData = await request.json();
    ////console.log(spreadSheetData);

    //temp = await getSheetValues();


    if (keyword != null || keyword != "") {
        keyword = keyword.toLowerCase();
        for (i = 1; i < spreadSheetData.values.length; i++) {

            //check if spreadsheet data contains keyword
            if (spreadSheetData.values[i][0].toLowerCase() == keyword || spreadSheetData.values[i][1].toLowerCase().includes(keyword)) {
                resourceAvailable = true;
                spreadSheetData = spreadSheetData.values[i];
                //console.log("SS Data");
                //console.log(spreadSheetData);
                //console.log("Resource is available in UVA");
                return spreadSheetData;
            }
        }
        if (!resourceAvailable) {
            spreadSheetData = null;
        }

        return spreadSheetData;
    }

    return null;
}