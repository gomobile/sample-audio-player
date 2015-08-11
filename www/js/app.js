/*
 * Please see the included README.md file for license terms and conditions.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false, Media:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

function myEventHandler() {
    "use strict";

    var ua = navigator.userAgent;
    var str;

    if (window.Cordova && dev.isDeviceReady.c_cordova_ready__) {
        str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!";
    } else if (window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______) {
        str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!";
    } else {
        str = "Bad device ready, or none available because we're running in a browser.";
    }

    console.log(str);
}

function emulator() {    
        alert("This plays an mp3 file. The emulator only suuports wav and ogg files. Please test on app preview or built app.");
}

function thirdPartyEmulator() {
    alert("This feature uses a third party audio plugin. Third party plugins are not supported on emulator or app preview. Please build app to test.");
}

//Native audio playback plugin methods
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        console.log('deviceready');
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        "use strict";
        var fName = "receivedEvent():";
        console.log(fName, "entry");
        console.log("Preloaded low latency audio");
        try {
            if (window.plugins && window.plugins.LowLatencyAudio) {
                window.plugins.LowLatencyAudio.preloadFX('sounds/boot-sound.wav', 'sounds/boot-sound.wav', function (msg) {}, function (msg) {
                    alert('Error: ' + msg);
                });
                window.plugins.LowLatencyAudio.preloadFX('sounds/sound-bowl.wav', 'sounds/sound-bowl.wav', function (msg) {}, function (msg) {
                    alert('Error: ' + msg);
                });
            }

        } catch (e) {
            console.log(fName, "catch, failure");
        }

        console.log(fName, "exit");

    },

    play: function (aud) {
        "use strict";
        var fName = "app.play():";
        console.log(fName, "entry");
        try {
            if (window.tinyHippos) {
                thirdPartyEmulator();
                console.log(fName, "emulator alert");
            } else {

                window.plugins.LowLatencyAudio.play('sounds/' + aud + '.wav');
            }
        } catch (e) {
            console.log(fName, "catch, failure");
        }

        console.log(fName, "exit");
    },


    playConcurr: function (aud1, aud2) {
        "use strict";
        var fName = "app.playConcurr():";
        console.log(fName, "entry");
        try {
            if (window.tinyHippos) {
                thirdPartyEmulator();
                console.log(fName, "emulator alert");
            } else {
                window.plugins.LowLatencyAudio.play('sounds/' + aud1 + '.wav');
                window.plugins.LowLatencyAudio.play('sounds/' + aud2 + '.wav');
            }
        } catch (e) {
            console.log(fName, "catch, failure");
        }

        console.log(fName, "exit");
    },
};





// Cordova Media API audio player methods
var my_media = null;
var mediaTimer = null;

// Play audio
function playCordovaAudio(src) {
    "use strict";
    var fName = "playCordovaAudio():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            emulator();
            console.log(fName, "emulator alert");
        } else {
            // Create Media object from src
            my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();

            // Update my_media position every second
//            if (mediaTimer === null) {
//                mediaTimer = setInterval(function () {
//                    // get my_media position
//                    my_media.getCurrentPosition(
//                        // success callback
//                        function (position) {
//                            if (position > -1) {
//                                setAudioPosition((position) + " sec");
//                            }
//                        },
//                        // error callback
//                        function (e) {
//                            console.log("Error getting pos=" + e);
//                            setAudioPosition("Error: " + e);
//                        }
//                    );
//                }, 1000);
//            }
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

// Pause audio
function pauseCordovaAudio() {
      "use strict";
    var fName = "pauseCordovaAudio():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            emulator();
            console.log(fName, "emulator alert");
        } else {
          if (my_media) {
                my_media.pause();
            }
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

// Stop audio
function stopCordovaAudio() {
    "use strict";
    var fName = "stopCordovaAudio():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            emulator();
            console.log(fName, "emulator alert");
        } else {
          if (my_media) {
                my_media.pause();
            }
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

// onSuccess Callback
function onSuccess() {
    console.log("playCordovaAudio():Audio Success");
}

// onError Callback 
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Set audio position
//function setAudioPosition(position) {
//    document.getElementById('audio_position').innerHTML = position;
//}


// ...additional event handlers here...