//test group
QUnit.module('Test Grouping');

//unit test grouping for view-more.js file
QUnit.module('view-more.js');

//testing if title of item on showed on frame match title from search result
QUnit.test('test title1', function (assert) {
	let actualTitle = document.getElementById('title1').innerHTML;
	let expectedTitle= title1.innerHTML;
	assert.equal(actualTitle, expectedTitle);
});

//testing that title appears on frame is not more than 40 chars long
QUnit.test('test title length', function (assert) {
	let actualTitle = document.getElementById('title1').innerHTML;
	assert.ok(actualTitle.length <= 40, "Displayed title length less than 41 char");
});

//testing if href of item on showed on frame match href from search result
QUnit.test('test href', function (assert) {
	let actualHref = document.getElementById('title1').href;
	let expectedHref= title1.href;
	assert.equal(actualHref, expectedHref);
});

//testing if author of item on showed on frame match author from search result
QUnit.test('test author', function (assert) {
	let actualAuthor = document.getElementById('author1').innerHTML;
	let expectedAuthor= author1.innerHTML;
	assert.equal(actualAuthor, expectedAuthor);
});

//testing if availability status of item showed on frame match availability from search result
QUnit.test('test availability status', function (assert) {
	let actualAvailabilityStatus = document.getElementById('status1').innerHTML;
	let expectedAvailabilityStatus= status1.innerHTML;
	assert.equal(actualAvailabilityStatus, expectedAvailabilityStatus);
});

QUnit.test('test availability not empty', function (assert) {
	let actualAvailabilityStatus = document.getElementById('status1').innerHTML;
	assert.ok(actualAvailabilityStatus != "", "Availability showed cannot be empty");
});

QUnit.test('test number of view-more items', function (assert) {
	let title2 = document.getElementById('title2');
	assert.ok(title2 != undefined, "No item2 found on view-more")
	let title3 = document.getElementById('title3');
	assert.ok(title3 != undefined, "No item3 found on view-more")
	let title4 = document.getElementById('title4');
	assert.ok(title4 != undefined, "No item4 found on view-more")
})