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

    alert(str);
}

function emulator() {
    if (window.tinyHippos) {
        alert("This plays an mp3 file. The emulator only suuports wav and ogg files. Please test on app preview or built app.");
    }
}

function thirdPartyEmulator() {
    if (window.tinyHippos) {
        alert("This feature uses a third party audio plugin. Third party plugins are not supported on emulator or app preview. Please build app to test.");
    }
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
        app.receivedEvent('deviceready');
        console.log('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

        if (window.plugins && window.plugins.LowLatencyAudio) {
            window.plugins.LowLatencyAudio.preloadFX('sounds/boot-sound.wav', 'sounds/boot-sound.wav', function (msg) {}, function (msg) {
                alert('Error: ' + msg);
            });
            window.plugins.LowLatencyAudio.preloadFX('sounds/sound-bowl.wav', 'sounds/sound-bowl.wav', function (msg) {}, function (msg) {
                alert('Error: ' + msg);
            });
        }

    },

    play: function (aud) {
        //Emulator alert
        thirdPartyEmulator();

        document.getElementById(aud).className = 'audio activated';
        window.plugins.LowLatencyAudio.play('sounds/' + aud + '.wav');
    },

    playConcurr: function (aud1, aud2) {
    //Emulator alert
    thirdPartyEmulator();

//    document.getElementById(aud).className = 'audio activated';
    window.plugins.LowLatencyAudio.play('sounds/' + aud1 + '.wav');
        window.plugins.LowLatencyAudio.play('sounds/' + aud2 + '.wav');
},
};





// Cordova Media API audio player methods
var my_media = null;
var mediaTimer = null;

// Play audio
function playAudio(src) {
    //Emulator alert
    emulator();

    // Create Media object from src
    my_media = new Media(src, onSuccess, onError);

    // Play audio
    my_media.play();

    // Update my_media position every second
    if (mediaTimer === null) {
        mediaTimer = setInterval(function () {
            // get my_media position
            my_media.getCurrentPosition(
                // success callback
                function (position) {
                    if (position > -1) {
                        setAudioPosition((position) + " sec");
                    }
                },
                // error callback
                function (e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e);
                }
            );
        }, 1000);
    }
}

// Pause audio
function pauseAudio() {
    //Emulator alert
    emulator();

    if (my_media) {
        my_media.pause();
    }
}

// Stop audio
function stopAudio() {
    //Emulator alert
    emulator();

    if (my_media) {
        my_media.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
}

// onSuccess Callback
function onSuccess() {
    console.log("playAudio():Audio Success");
}

// onError Callback 
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Set audio position
function setAudioPosition(position) {
    document.getElementById('audio_position').innerHTML = position;
}


// ...additional event handlers here...