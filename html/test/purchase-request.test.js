//test group
QUnit.module('Test Grouping');

//unit test grouping for view-more.js file
QUnit.module('purchase-request.js');

var title = document.getElementById('title').value
var author = document.getElementById('author').value
var publisher = document.getElementById('publisher').value
var format = document.getElementById('format').value
var isCourseReserve = document.getElementById('is-course-reserve')
var sendEmail = document.getElementById('sendEmail')

var formElements = document.forms["request-form"].elements;

//testing that checkRequired returns true only when all required fields are filled
QUnit.test('test form required contents not empty', function (assert) {
	if (checkRequired) {
        for (element in formElements) {
            if (element.required)
                assertNotEqual(element.value, "", element.id + " cannot be empty.")
        }
    }
});

//testing correct mailto email address according to course reserve option
QUnit.test('test collect mailto email address', function (assert) {
    if (isCourseReserve == "yes") {
        assertEqual(sendEmail.href.substr(0, sendEmail.href.indexOf('?')), "lib-reserves@virginia.edu", "Incorrect email address for course reserve purchase request")
    }
});

