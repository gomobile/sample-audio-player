/*
 * Please see the included README.md file for license terms and conditions.
 */

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false */
/*global cordova:false, Media:false, getWebRoot:false */


window.app = window.app || {} ;         // there should only be one of these...


// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.


// Native audio playback plugin methods

app.initNativeAudio = function() {
    "use strict";
    var fName = "app.initNativeAudio():";
    app.consoleLog(fName, "entry");

    var items, i, asset ;
    function success(msg) { app.consoleLog(fName, msg) ; }
    function error(msg)   { app.consoleLog(fName, 'Error: ' + msg) ; }

    if( window.plugins && window.plugins.NativeAudio ) {
        try {
            items = ['boot-sound', 'sound-bowl'];
            for( i = 0; i < items.length; i++ ) {
                asset = 'sounds/' + items[i] + '.wav' ;
//                asset = getWebRoot() + '/sounds/' + items[i] + '.wav' ;
                app.consoleLog(fName, "Preloading ", asset);
                window.plugins.NativeAudio.preloadSimple(items[i], asset, success, error) ;
            }
            app.consoleLog(fName, "Preloaded low latency audio");
        }
        catch(e) {
            app.consoleLog(fName, "catch, failure");
        }
    }

    app.consoleLog(fName, "exit");
} ;



app.playNativeAudioButton = function() { app.playNativeAudio(this.getAttribute("data-sound")); } ;
app.playNativeAudio = function(aud) {
    "use strict";
    var fName = "app.playNativeAudio():";
    app.consoleLog(fName, "entry");

    if( window.tinyHippos )
        app.thirdPartyAlert(fName) ;

    else if( /file:\/\/.*\/com\.intel\.html5tools\.apppreview/i.test(getWebRoot()) )
        app.debugAlert(fName) ;

    else if( !(window.plugins) || !(window.plugins.NativeAudio) )
        app.thirdPartyAlert() ;

    else {
        try {
            window.plugins.NativeAudio.play(aud);
        }
        catch (e) {
            app.thirdPartyAlert();
            app.consoleLog(fName, "catch, failure");
        }
    }

    app.consoleLog(fName, "exit");
} ;



app.playConcurrentButton = function() { app.playConcurrent(this.getAttribute("data-sound1"),this.getAttribute("data-sound2")); } ;
app.playConcurrent = function(aud1, aud2) {
    "use strict";
    var fName = "app.playConcurrent():";
    app.consoleLog(fName, "entry");

    if( window.tinyHippos )
        app.thirdPartyAlert(fName) ;

    else if( /file:\/\/.*\/com\.intel\.html5tools\.apppreview/i.test(getWebRoot()) )
        app.debugAlert(fName) ;

    else if( !(window.plugins) || !(window.plugins.NativeAudio) )
        app.thirdPartyAlert() ;

    else {
        try {
            window.plugins.NativeAudio.play(aud1);
            window.plugins.NativeAudio.play(aud2);
        }
        catch (e) {
            app.thirdPartyAlert();
            app.consoleLog(fName, "catch, failure");
        }
    }

    app.consoleLog(fName, "exit");
} ;



// Cordova Media API audio player methods

app.my_media = null;
app.mediaTimer = null;

app.playCordovaAudioButton = function() { app.playCordovaAudio(this.getAttribute("data-sound")); } ;
app.playCordovaAudio = function(src) {
    "use strict";
    var fName = "app.playCordovaAudio():";
    app.consoleLog(fName, "entry");

    var x = navigator.userAgent ;
    var z = getWebRoot() ;

    if( window.cordova && cordova.file ) {                  // if Cordova file plugin present
        if( !(/^https?:/i.test(src)) ) {                    // if local file to be played...
            if( x.match(/(ios)|(iphone)|(ipod)|(ipad)/ig) ) { // if on iOS device...
                if( window.tinyHippos )                     // ...AND in the Emulate tab
                    src = z + "/" + src ;                   // correct file location for Emulate tab
            }
            else                                            // for everything else...
                src = z + "/" + src ;                       // add absolute path prefix on non-iOS
        }

        if( window.tinyHippos && /.*\.mp3$/i.test(src) )    // if mp3 file AND in Emulate tab
            app.emulateAlert(fName) ;                       // no-can-do... (won't play mp3 files)

        else {
            try {
                app.my_media = new Media(src, mediaSuccess, mediaError, mediaStatus) ;
                app.my_media.play() ;
            }
            catch (e) {
                app.consoleLog(fName, "catch, failure");
            }
        }
    }

    else
        app.missingPluginAlert(fName) ;                     // no file plugin, in a browser?


// private functions for our media object

    function mediaSuccess() {
        app.my_media.stop() ;
        app.my_media.release() ;
        app.consoleLog(fName, "mediaSuccess") ;
    }
    function mediaError(err) {
        app.my_media.stop() ;
        app.my_media.release() ;
        var msg = "undefined" ;
        switch(status) {
            case 1:     msg = "MEDIA_ERR_ABORTED" ;         break ;
            case 2:     msg = "MEDIA_ERR_NETWORK" ;         break ;
            case 3:     msg = "MEDIA_ERR_DECODE" ;          break ;
            case 4:     msg = "MEDIA_ERR_NONE_SUPPORTED" ;  break ;
            default:    msg = "MEDIA_ERR_undefined" ;
        }
        app.consoleLog(fName, "mediaError:err.code: " + err.code + ": " + msg + " ; " + "mediaError:err.message: " + err.message) ;
    }
    function mediaStatus(status) {
        var msg = "undefined" ;
        switch(status) {
            case 0:     msg = "MEDIA_NONE" ;        break ;
            case 1:     msg = "MEDIA_STARTING" ;    break ;
            case 2:     msg = "MEDIA_RUNNING" ;     break ;
            case 3:     msg = "MEDIA_PAUSED" ;      break ;
            case 4:     msg = "MEDIA_STOPPED" ;     break ;
            default:    msg = "MEDIA_undefined" ;
        }
        app.consoleLog(fName, "mediaStatus: " + status + " = " + msg) ;
    }

    app.consoleLog(fName, "exit");
} ;



app.pauseCordovaAudio = function() {
    "use strict";
    var fName = "app.pauseCordovaAudio():";
    app.consoleLog(fName, "entry");

    if( window.cordova && cordova.file ) {                  // if Cordova file plugin present
        try {
            app.my_media.pause() ;
        }
        catch (e) {
            app.consoleLog(fName, "catch, failure");
        }
    }
    else
        app.missingPluginAlert(fName) ;                     // no file plugin, in a browser?

    app.consoleLog(fName, "exit");
} ;



app.stopCordovaAudio = function() {
    "use strict";
    var fName = "app.stopCordovaAudio():";
    app.consoleLog(fName, "entry");

    if( window.cordova && cordova.file ) {                  // if Cordova file plugin present
        try {
            app.my_media.stop() ;
            app.my_media.release() ;
        }
        catch (e) {
            app.consoleLog(fName, "catch, failure");
        }
    }
    else
        app.missingPluginAlert(fName) ;                     // no file plugin, in a browser?

    app.consoleLog(fName, "exit");
} ;



// HTML5 audio
// see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

app.playHtml5AudioButton = function() { app.playHtml5Audio(this.getAttribute("data-id")); } ;
app.playHtml5Audio = function(id) {
    "use strict" ;
    var fName = "app.playHtml5Audio():" ;
    app.consoleLog(fName, "entry") ;

    if( window.tinyHippos && id == "id_audio-url" )
        app.emulateAlert(fName) ;

    else {
        var a = document.getElementById(id) ;
        a.play() ;
    }

    app.consoleLog(fName, "exit") ;
} ;



app.pauseHtml5AudioButton = function() { app.pauseHtml5Audio(this.getAttribute("data-id")); } ;
app.pauseHtml5Audio = function(id) {
    "use strict" ;
    var fName = "app.pauseHtml5Audio():" ;
    app.consoleLog(fName, "entry") ;

    var a = document.getElementById(id) ;
    a.pause() ;

    app.consoleLog(fName, "exit") ;
} ;



app.restartHtml5AudioButton = function() { app.restartHtml5Audio(this.getAttribute("data-id")); } ;
app.restartHtml5Audio = function(id) {
    "use strict" ;
    var fName = "app.restartHtml5Audio():" ;
    app.consoleLog(fName, "entry") ;

    var a = document.getElementById(id) ;
    a.load() ;

    app.consoleLog(fName, "exit") ;
} ;



// just a bunch of helper functions

app.emulateAlert = function(fName) {
    var str = "This demo component plays an mp3 file. The Emulate tab only supports wav and ogg files. Please test using Intel App Preview or in a built app." ;
    alert(str) ;
    app.consoleLog(fName, str) ;
} ;

app.debugAlert = function(fName) {
    var str = "This demo component is incompatible with the Debug tab. Please test it in a built app." ;
    alert(str) ;
    app.consoleLog(fName, str) ;
} ;

app.thirdPartyAlert = function(fName) {
    var str = "This feature uses a third party audio plugin. Third party plugins are not supported in the Emulate tab or Intel App Preview. Please build the app to test this feature." ;
    alert(str) ;
    app.consoleLog(fName, str) ;
} ;

app.missingPluginAlert = function(fName) {
    var str = "This feature requires a Cordova plugin that is not present. You may be running in a browser or forgot to include the plugin in your app configuration." ;
    alert(str) ;
    app.consoleLog(fName, str) ;
} ;
