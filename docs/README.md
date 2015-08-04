## Audio Player App with Cordova Media API and Low Latency Audio Plugin

_The source code for this sample can be found here: [https://github.com/gomobile/sample-audio-player](https://github.com/gomobile/sample-audio-player "https://github.com/gomobile/sample-audio-player") or download the_ [Intel® XDK](https://software.intel.com/en-us/html5/tools) to check out all of the HTML5 samples and templates.


## Introduction

Intel XDK® is a HTML5 hybrid application development environment that allow users to develop, debug, test on-device and build projects for various mobile platforms. Along with development features, this development environment provides various HTML5 templates and samples intended for running on various mobile devices and platforms. For more information on getting started, go to the [Intel XDK Overview](/en-us/xdk/docs/intel-xdk-overview).

## Purpose

By leveraging the [Apache Cordova* plug-ins](http://plugins.cordova.io/#/), you can develop compelling HTML5 hybrid apps for any platform and use case. [Apache Cordova](http://cordova.apache.org/) is a set of device APIs that allow a mobile app developer to access native device function such as the camera or accelerometer from JavaScript. Besides the standard APIs, various plug-ins are available in the [Apache Cordova Plug-ins Registry](http://plugins.cordova.io/#/) and located across the web on github. .

With this sample app, you can use the Apache Cordova Media API and the Cordova Low Latency Audio Plugin for iOS and Android to playback audio files on a device. 

The app shows how to use the following API methods:


[Cordova Media API](http://docs.phonegap.com/en/edge/cordova_media_media.md.html "API Documentation")

- media.play() : Start or resume playback.
- media.pause() : Pause playback.
- media.stop() : Stop playback.

[Low Latency Audio Plugin (com.rjfun.cordova.plugin.lowlatencyaudio)](https://github.com/floatinghotpot/testaudio/tree/master/plugins/com.rjfun.cordova.plugin.lowlatencyaudio "Plugin Documentation")


- LowLatencyAudio.preloadFX(id, assetPath, success, fail) : loads audio file into memory,
- LowLatencyAudio.play(id, success, fail) : Plays audio asset.

Each button click is bound with methods that encapsulate the functionality of the plugin or API. These methods are defined in `app.js`.

## Testing

**Emulator:** Only supports wav and ogg files. All other files must be tested on app preview or by building it. Does not support third party plugins. When testing third party plugins, the app must be built and tested on device.

**App Preview:** Does not support third party plugins. When testing third party plugins, the app must be built and tested on device.

**Built app:** The HTML5 <audio> tag does not work well on the webviews of many devices. You are advised to use Cordova plugins to play audio.



These sample applications have been tested on iOS and Android devices.

