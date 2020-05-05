// // Test for Authorization
// const { test } = QUnit;

// QUnit.module("Authorization Tests");
// test("testing if auth fails", function(assert) {
//   let authorization = sendAuthorizationRequest();
//   assert.notEqual(authorization.response, undefined);
// });

// // Search Request Test
// QUnit.module("Search Request Test");
// test("testing if search request fails", function(assert) {
//   var done = assert.async();
//   let newPool = "";
//   setTimeout(function() {
//     searchOnePool("keyword", "books").then(pool => (newPool = pool));
//     assert.notEqual(newPool, undefined);
//     done();
//   }, 500);
// });

// // Books Tests
// QUnit.module("Book Tests");
// test("testing against first result", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("Babel", "books").then(pool => (testBooks = pool));

//   var booksA = {
//     title: "Babel",
//     availability: "Request",
//     author: "Couperus, Louis  [1863-1923]",
//     subject: "Internet videos",
//     language: "Dutch"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0])
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].author[0], booksA.author);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].language[0], booksA.language);
//     done();
//   }, 500);
// });

// test("testing against second result", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("coding", "books").then(pool => (testBooks = pool));

//   var booksA = {
//     title: "Information theory",
//     author: "Csiszár, Imre",
//     availability: "On shelf",
//     subject: "English",
//     library: "Math"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0])
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].author[0], booksA.author);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].library[0], booksA.library);
//     done();
//   }, 500);
// });

// // Articles Tests
// QUnit.module("Article Tests");
// test("testing against first article", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("AI in Cybersecurity", "articles").then(
//     pool => (testBooks = pool)
//   );

//   var booksA = {
//     title:
//       "Reinforcement learning for cyber-physical systems with cybersecurity case studies",
//     author: "Li, Chong  [1985-] (author)",
//     availability: "Online",
//     subject: "Reinforcement learning",
//     language: "English",
//     publication_date: "2019",
//     published: "Boca Raton, Florida : CRC Press, [2019]"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0])
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].author[0], booksA.author);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].subject[0], booksA.subject);
//     assert.equal(testBooks[0].language[0], booksA.language);
//     assert.equal(testBooks[0].published[0], booksA.published);
//     assert.equal(testBooks[0].publication_date[0], booksA.publication_date);
//     done();
//   }, 500);
// });

// // Video Tests
// QUnit.module("Video Tests");
// test("testing against first video", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("hello", "video").then(pool => (testBooks = pool));

//   var booksA = {
//     id: "u2253656",
//     title: "Les usages de l'éternité",
//     subtitle: "essai sur Ernest Hello",
//     author: "Kéchichian, Patrick  [1951-]",
//     format: "Book",
//     availability: "Request",
//     location: "Clemons Stacks",
//     call_number: "PN6084.C44 B76 2012",
//     language: "French",
//     published: "Paris : Seuil, c1993"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0])
//     assert.equal(testBooks[0].id[0], booksA.id);
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].subtitle[0], booksA.subtitle);
//     assert.equal(testBooks[0].author[0], booksA.author);
//     assert.equal(testBooks[0].format[0], booksA.format);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].language[0], booksA.language);
//     assert.equal(testBooks[0].published[0], booksA.published);
//     done();
//   }, 500);
// });

// // Music Recordings Tests
// QUnit.module("Music Recordings Tests");
// test("testing against first music recordings", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("justin", "music recordings").then(pool => (testBooks = pool));

//   var booksA = {
//     id: "u1977502",
//     title: "Justin",
//     subtitle: "l'itinéraire philosophique",
//     author: "Robillard, Edmond  [1917-2007]",
//     publication_date: "1989",
//     format: "Book",
//     availability: "Request",
//     language: "French"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0]);
//     assert.equal(testBooks[0].id[0], booksA.id);
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].author[0], booksA.author);
//     assert.equal(testBooks[0].subtitle[0], booksA.subtitle);
//     assert.equal(testBooks[0].publication_date[0], booksA.publication_date);
//     assert.equal(testBooks[0].format[0], booksA.format);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].language[0], booksA.language);
//     done();
//   }, 500);
// });

// //Rare book Tests
// QUnit.module("Rare book Tests");
// test("testing against first Rare book", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("Hary", "rarebooks").then(pool => (testBooks = pool));

//   var booksA = {
//     id: "u2021540",
//     title: "Multiglossia in Judeo-Arabic",
//     subtitle:
//       "with an edition, translation and grammatical study of the Cairene Purim scroll",
//     author: "Hary, Benjamin H.",
//     publication_date: "1992",
//     format: "Book",
//     availability: "Request",
//     language: "English",
//     published: "Leiden ; New York : E.J. Brill, 1992"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0]);
//     assert.equal(testBooks[0].id[0], booksA.id);
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].author[0], booksA.author);
//     assert.equal(testBooks[0].subtitle[0], booksA.subtitle);
//     assert.equal(testBooks[0].publication_date[0], booksA.publication_date);
//     assert.equal(testBooks[0].format[0], booksA.format);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].language[0], booksA.language);
//     assert.equal(testBooks[0].published[0], booksA.published);
//     done();
//   }, 500);
// });

// //Journals Tests
// QUnit.module("Journals Tests");
// test("testing against first Journals", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("stuff", "Journals").then(pool => (testBooks = pool));

//   var booksA = {
//     id: "007683258",
//     title: "Stuff",
//     subtitle: "an anthology of verse",
//     publication_date: "1919",
//     format: "Book",
//     availability: "Online",
//     language: "English",
//     published: "Boston, The Four seas company, 1919"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0]);
//     assert.equal(testBooks[0].id[0], booksA.id);
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].subtitle[0], booksA.subtitle);
//     assert.equal(testBooks[0].publication_date[0], booksA.publication_date);
//     assert.equal(testBooks[0].format[0], booksA.format);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].language[0], booksA.language);
//     assert.equal(testBooks[0].published[0], booksA.published);
//     done();
//   }, 500);
// });

// //Musical Scores Tests
// QUnit.module("Musical Scores Tests");
// test("testing against first Musical Scores", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("A", "musical-scores").then(pool => (testBooks = pool));

//   var booksA = {
//     id: "u3824846",
//     title: "Block & lot maps-- Queens Community District ... atlas",
//     subtitle: "",
//     author: "New York (N.Y.) Department of City Planning",
//     publication_date: "1990",
//     format: "Book",
//     availability: "Request",
//     language: "English",
//     published: "New York, N.Y. : The Dept., c1990"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0]);
//     assert.equal(testBooks[0].id[0], booksA.id);
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].author[0], booksA.author);
//     assert.equal(testBooks[0].subtitle[0], booksA.subtitle);
//     assert.equal(testBooks[0].publication_date[0], booksA.publication_date);
//     assert.equal(testBooks[0].format[0], booksA.format);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].language[0], booksA.language);
//     assert.equal(testBooks[0].publication_date[0], booksA.publication_date);
//     done();
//   }, 500);
// });

// //Archives Tests
// QUnit.module("Archives Tests");
// test("testing against first Archives", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("Snails", "archival").then(pool => (testBooks = pool));

//   var booksA = {
//     id: "u1794392",
//     title: "Snails",
//     subtitle: "",
//     author: "Rutter, M. F. (Mark Francis)  [1961-]",
//     publication_date: "1990",
//     format: "Book",
//     availability: "Request",
//     language: "English",
//     published: "Middlesbrough : Paranoia, 1990"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0]);
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].author[0], booksA.author);
//     assert.equal(testBooks[0].subtitle[0], booksA.subtitle);
//     assert.equal(testBooks[0].publication_date[0], booksA.publication_date);
//     assert.equal(testBooks[0].format[0], booksA.format);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].language[0], booksA.language);
//     assert.equal(testBooks[0].id[0], booksA.id);
//     assert.equal(testBooks[0].published[0], booksA.published);
//     done();
//   }, 100);
// });

// //Thesis Tests
// QUnit.module("Theses Tests");
// test("testing against first Theses", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("random", "thesis").then(pool => (testBooks = pool));

//   var booksA = {
//     id: "u6211590",
//     title: "Randomness",
//     subtitle: "",
//     author: "Bennett, Deborah J.  [1950-]",
//     publication_date: "1998",
//     format: "EBook",
//     availability: "Online",
//     language: "English"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0]);
//     assert.equal(testBooks[0].id[0], booksA.id);
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].author[0], booksA.author);
//     assert.equal(testBooks[0].subtitle[0], booksA.subtitle);
//     assert.equal(testBooks[0].publication_date[0], booksA.publication_date);
//     assert.equal(testBooks[0].format[0], booksA.format);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].language[0], booksA.language);
//     done();
//   }, 500);
// });

// //Sound Recordings Tests
// QUnit.module("Sound Recordings Tests");
// test("testing against first Sound Recordings", function(assert) {
//   var done = assert.async();
//   let testBooks = "";
//   searchOnePool("adele", "sound-recordings").then(pool => (testBooks = pool));

//   var booksA = {
//     id: "u204842",
//     title: "Adele",
//     subtitle: "frammenti di un romanzo",
//     author: "Tozzi, Federigo  [1883-1920]",
//     publication_date: "1979",
//     format: "Book",
//     availability: "Request",
//     language: "Italian",
//     published: "Firenze : Vallecchi, 1979"
//   };
//   assert.notEqual(testBooks, undefined);
//   setTimeout(function() {
//     //console.log(testBooks[0]);
//     assert.equal(testBooks[0].id[0], booksA.id);
//     assert.equal(testBooks[0].title[0], booksA.title);
//     assert.equal(testBooks[0].author[0], booksA.author);
//     assert.equal(testBooks[0].subtitle[0], booksA.subtitle);
//     assert.equal(testBooks[0].publication_date[0], booksA.publication_date);
//     assert.equal(testBooks[0].format[0], booksA.format);
//     assert.equal(testBooks[0].availability[0], booksA.availability);
//     assert.equal(testBooks[0].language[0], booksA.language);
//     done();
//   }, 500);
// });
