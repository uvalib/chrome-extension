//test group
QUnit.module('Test Grouping');

//unit test grouping for frame.js file
QUnit.module('frame.js');

//testing if title of item on showed on frame match title from search result
QUnit.test('test title', function (assert) {
	var done = assert.async();
	actualTitle = document.getElementById('full-title').innerHTML;
	expectedTitle = full_title.innerHTML;
	setTimeout(function() {
		assert.equal(actualTitle, expectedTitle);
		done();
	  });
});

//testing that title appears on frame is not more than 40 chars long
QUnit.test('test title length', function (assert) {
	let actualTitle = document.getElementById('short-title').innerHTML;
	assert.ok(actualTitle.length <= 25, "Displayed short title length less than 41 char");
});

//testing if href of item on showed on frame match href from search result
QUnit.test('test href', function (assert) {
	let actualHref = document.getElementById('full-title').href;
	let expectedHref= full_title.href;
	assert.equal(actualHref, expectedHref);
});

//testing if author of item on showed on frame match author from search result
QUnit.test('test author', function (assert) {
	let actualAuthor = document.getElementById('author').innerHTML;
	let expectedAuthor= author.innerHTML;
	assert.equal(actualAuthor, expectedAuthor);
});

//testing if availability status of item showed on frame match availability from search result
QUnit.test('test availability status', function (assert) {
	let actualAvailabilityStatus = document.getElementById('status').innerHTML;
	let expectedAvailabilityStatus= status.innerHTML;
	assert.equal(actualAvailabilityStatus, expectedAvailabilityStatus);
});
/*
QUnit.test('test availability not empty', function (assert) {
	let actualAvailabilityStatus = document.getElementById('status').innerHTML;
	let actualRequest = document.getElementById('leo-request').innerHTML;
	assert.notOk(actualAvailabilityStatus == "" && actualRequest == "", "Availability showed cannot be empty");
});
*/
