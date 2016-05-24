Audio Player App with Cordova Media API and Low Latency Audio Plugin
--------------------------------------------------------------------

*The source code for this sample can be found here:*
<https://github.com/gomobile/sample-audio-player> *or* [download the Intel®
XDK](http://xdk.intel.com)\* to check out all of the sample apps and
templates.\*

Introduction
------------

The Intel XDK is an HTML5 hybrid application development environment that
facilitates development, debugging, testing and building projects for mobile
platforms. The development environment includes templates and samples intended
for running on various mobile devices and platforms. To get started, see the
[Intel XDK
Overview](https://software.intel.com/en-us/xdk/docs/intel-xdk-overview).

The App
-------

By leveraging [Apache Cordova\* plugins](http://plugins.cordova.io/#/), you can
develop compelling HTML5 hybrid apps for many popular mobile platforms. [Apache
Cordova](http://cordova.apache.org/) plugins are a means by which device APIs
can be added to a hybrid mobile HTML5 app, providing access to native device
functions from your app’s JavaScript, such as the camera or accelerometer. In
addition to the standard or “core” Cordova plugin APIs, many third-party plugins
can be found in the [Apache Cordova Plugins
Registry](http://plugins.cordova.io/#/) as well as in many open-source GitHub
repos.

This sample app illustrates the use of the Apache Cordova Media API, a
third-party low-latency audio plugin and the standard HTML5 `<audio>` tag. All
three APIs can be used to playback audio files on a device. The low-latency
plugin only supports iOS and Android devices.

The app demonstrates the following API methods:

### [Cordova Media API](https://github.com/apache/cordova-plugin-media)

Located in the Cordova NPM registry as
[cordova-plugin-media](https://www.npmjs.com/package/cordova-plugin-media).

-   `media.play()` : start or resume audio playback

-   `media.pause()` : pause audio playback

-   `media.stop()` : stop audio playback

-   `media.release()` : release audio object resources

### [Cordova Native Audio Plugin](https://github.com/floatinghotpot/cordova-plugin-nativeaudio)

Located in the Cordova NPM registry as
[cordova-plugin-nativeaudio](https://www.npmjs.com/package/cordova-plugin-nativeaudio).

-   `preloadSimple()` : preloads an audio file for playback

-   `play()` : plays one or more preloaded audio files

### [HTML5 \<audio\> Tag](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video)

This is not a Cordova plugin, but the [W3C standard \<audio\>
tag](https://www.w3.org/TR/html5/embedded-content-0.html#the-audio-element).

-   `audio.play()` : start or resume audio playback

-   `audio.pause()` : pause audio playback

-   `audio.load()` : restart audio playback

Each button in the app is bound to a method that encapsulates the function of
the named plugin or API. These bound methods can be found in
[app.js](../www/js/app.js). The file named [init-app.js](../www/js/init-app.js)
configures the bindings between the buttons and the methods defined in
[app.js](../www/js/app.js).

The file named [init-dev.js](../www/xdk/init-dev.js) generates an `app.Ready`
event that insures that all low-level initialization is complete before app
initialization begins. In essence, that function watches for the standard
`document ready` state and the Cordova-defined `cordovaready` event. It also
includes code to automatically bypass the `cordovaready` event if you are
testing in a desktop browser (where there is no `cordovaready` event).

Testing
-------

**Emulate Tab:** The Intel XDK Emulate tab only supports `wav` and `ogg` audio
files. All other audio filetypes must be tested using Intel App Preview or by
building the application and running it on a real device.

The Emulate tab does not support third-party plugins; to test the features of
the third-party native audio plugin, the app must be built and tested on a real
device.

**App Preview:** Intel App Preview does not support third-party plugins. To test
those features that utilize the third-party native audio plugin, the app must be
built and tested on a real device.

**Built App:** The HTML5 tag does not work well in the webviews of many older
devices, especially Android 4.x and older devices. You are advised to use an
appropriate Cordova audio plugin to play audio files, rather than the HTML5
`<audio>` tag.

This sample application has been tested on iOS and Android devices. It has not
been well tested on the Windows platforms.
