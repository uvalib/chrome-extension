//test group
QUnit.module('Popup.js');

//Initialization Unit Tests
/*
QUnit.test('Popup.js Title initialization test', function (assert) {
	let actualTitle = document.getElementById('title_0').innerHTML;
	let expectedTitle= title_0.href;
	assert.equal(actualTitle, expectedTitle);
	console.log(actualTitle)
});

QUnit.test('Popup.js Title Length Test', function (assert) {
	let actualTitle = document.getElementById('title_0').innerHTML;
	assert.ok(actualTitle.length <= 200, "Displayed title length less than 201 char");
});

QUnit.test('Popup.js Author 0 initialization test', function (assert) {
	let actualAuthor = document.getElementById('author_0').innerHTML;
	let expectedAuthor= author_0.href;
	assert.equal(actualAuthor, expectedAuthor);
});

QUnit.test('Popup.js Id 0 initialization test', function (assert) {
	let actualHref = document.getElementById('id_0').href;
	let expectedHref= id_0.href;
	assert.equal(actualHref, expectedHref);
});

QUnit.test('Popup.js Cover Image 0 initialization test', function (assert) {
	let actualImg = document.getElementById('cover_image_0').src;
	let expectedImg= cover_image_0.href;
	assert.equal(actualImg, expectedImg);
});

QUnit.test('Popup.js Availability 0 initialization test', function (assert) {
	let actualAvailability = document.getElementById('availability_0').innerHTML;
	let expectedAvailability= availability_0.innerHTML;
	assert.equal(actualAvailability, expectedAvailability);
});
*/
QUnit.test('Testing whether the global selection variable is changed to rarebooks pool', function (assert) {
	changeSelection("rarebooks");
	assert.equal(selectionGlobal, "rarebooks");
});

QUnit.test('Testing whether the global selection variable is changed to articles pool', function (assert) {
	changeSelection("articles");
	assert.equal(selectionGlobal, "articles");
});

QUnit.test('Testing whether the global selection variable is changed to book pool', function (assert) {
	changeSelection("books");
	assert.equal(selectionGlobal, "books");
});

QUnit.test('Testing whether the global selection variable is changed to video pool', function (assert) {
	changeSelection("video");
	assert.equal(selectionGlobal, "video");
});

QUnit.test('Testing whether the global selection variable is changed to archival pool', function (assert) {
	changeSelection("archival");
	assert.equal(selectionGlobal, "archival");
});

QUnit.test('Testing whether the global selection variable is changed to music-recordings pool', function (assert) {
	changeSelection("music-recordings");
	assert.equal(selectionGlobal, "music-recordings");
});

QUnit.test('Testing whether the global selection variable is changed to musical-scores pool', function (assert) {
	changeSelection("musical-scores");
	assert.equal(selectionGlobal, "musical-scores");
});

QUnit.test('Testing whether the global selection variable is changed to sound recordings pool', function (assert) {
	changeSelection("sound-recordings");
	assert.equal(selectionGlobal, "sound-recordings");
});



