QUnit.module('Item pushed in array');
QUnit.test('testing last item pushed in array', function (assert) {
    searchvalue = "last-item"
    let x =  storeSearchValueLocally(searchvalue);
    assert.equal(x[x.length-1], searchvalue, "item push test passed");
});

QUnit.module('Item pushed in array');
QUnit.test('testing last item pushed in array', function (assert) {
    searchvalue = "last-item2"
    let x =  storeSearchValueLocally(searchvalue);
    assert.equal(x[x.length-1], searchvalue, "item push 2 test passed");
});

QUnit.module('Item pushed in array');
QUnit.test('testing last item pushed in array', function (assert) {
    searchvalue = "last-item3"
    let x =  storeSearchValueLocally(searchvalue);
    assert.equal(x[x.length-1], searchvalue, "item push 3 test passed ");
});