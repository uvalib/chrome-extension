// QUnit.module('Authorizationrequest');
// QUnit.test('testing authorization request', function (assert) {
//     var x = sendAuthorizationRequest();
//     assert.notEqual(x.response, null, "authorization request passed");
// });

// QUnit.module('setupvirgo');
// QUnit.test('testing setup virgo return type', function(assert){
//     var x = setupVirgoRequest();
//     assert.equal(typeof x, "object", "correct type");
// });

// QUnit.module('parseResponseData');
// QUnit.test('testing setup virgo status check', function(assert){
//     var done = assert.async();
//     sendAuthorizationRequest();
//     var status = setupVirgoRequest();
//     sendVirgoRequest(status, "avengers");
//     setTimeout(function(){
//         assert.equal(status.readyState, "4", "test: ready status check");
//         assert.equal(status.responseURL, "https://search-ws.internal.lib.virginia.edu/api/search", "test: calling the virgo api url passed");
//         done();
//     }, 3000)
// });

// QUnit.module('popup search bar');
// QUnit.test('Testing input parse', function(assert){
//     var test = replaceSpace("google chrome browser extension")
//     assert.equal(test, "google+chrome+browser+extension", "test: search bar input parse passed");
// });
