QUnit.module('Mouseover function tests');
QUnit.test('checking if the mouseover is working', function (assert) {
    searchvalue = "#e47106#e47106#232d4b"
    let testing = mouseover(row1, col1, id_0, leo_0, ci_0);
    assert.equal(testing, searchvalue, "mouseover is working");
});

QUnit.module('Mouseout function tests');
QUnit.test('checking if the mouseout is working', function (assert) {
    searchvalue = ""
    let testing = mouseout(row1, col1, id_0, leo_0, ci_0);
    assert.equal(testing, searchvalue, "mouseout is working");
});