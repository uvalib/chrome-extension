
// Saves options to chrome.storage
function save_options() {//all of the search modes that we're usinn
    var accessmode = document.getElementById('accessmode').checked;
    var lightmode = document.getElementById('lightmode').checked;
    var raremode = document.getElementById('raremode').checked;
    var articlemode = document.getElementById('articlemode').checked;
    var videomode = document.getElementById('videomode').checked;
    var musicrecordingmode = document.getElementById('musicrecordingmode').checked;
    var musicalscoresmode = document.getElementById('musicalscoresmode').checked;
    var journalsmode = document.getElementById('journalsmode').checked;
    var soundrecordingsmode = document.getElementById('soundrecordingsmode').checked;
    var thesesmode = document.getElementById('thesesmode').checked;
    var archivalmode = document.getElementById('archivalmode').checked;
    chrome.storage.local.set({
      accessMode: accessmode,
      lightMode: lightmode,
      videoMode: videomode,
      rareMode: raremode,
      articleMode: articlemode,
      musicrecordingMode: musicrecordingmode,
      musicalscoresMode: musicalscoresmode,
      journalsMode: journalsmode,
      soundrecordingsMode: soundrecordingsmode,
      thesesMode: thesesmode,
      archivalMode: archivalmode,
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    if(window.chrome != undefined){
      window.chrome.storage.local.get({
        accessMode: false,
        lightMode: false,
        videoMode: false,
        rareMode: false,
        articleMode: false,
        musicrecordingMode: false,
        musicalscoresMode: false,
        journalsMode: false,
        soundrecordingsMode: false,
        thesesMode: false,
        archivalMode: false,
      }, function(items) {
        if (items != null) {
          try {
            document.getElementById('accessmode').checked = items.accessMode;
            document.getElementById('lightmode').checked = items.lightMode;
            document.getElementById('videomode').checked = items.videoMode;
            document.getElementById('raremode').checked = items.rareMode;
            document.getElementById('articlemode').checked = items.articleMode;
            document.getElementById('musicrecordingmode').checked = items.musicrecordingMode;
            document.getElementById('musicalscoresmode').checked = items.musicalscoresMode;
            document.getElementById('journalsmode').checked = items.journalsMode;
            document.getElementById('soundrecordingsmode').checked = items.soundrecordingsMode;
            document.getElementById('thesesmode').checked = items.thesesMode;
            document.getElementById('archivalmode').checked = items.archivalMode;
          }
          catch (err) {
            console.log("Setting is not open.");
          }
        }
      });
      }
  }

  
  document.addEventListener('DOMContentLoaded', restore_options);
  if (document.getElementById('save') != null)
    document.getElementById('save').addEventListener('click', save_options);