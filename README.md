Audio Player Cordova App
=====================================================================

See [LICENSE.md](<LICENSE.md>) for license terms and conditions.

## Project Details ##

This sample is part of the Intel® XDK. 
Download the Intel® XDK at [http://software.intel.com/en-us/html5](http://software.intel.com/en-us/html5). With the Audio Player sample you can play audio with Apache Cordova Media API, Cordova Low Latency Audio Plugin for iOS and Android and the HTML5 Audio tag.


The Audio Player App demonstrates how to play local and stream online audio files using the Cordova* media plugin. It also demonstrates use of the [Cordova Low Latency Audio Plugin for iOS and Android](https://github.com/floatinghotpot/testaudio/tree/master/plugins/com.rjfun.cordova.plugin.lowlatencyaudio) to demonstrates playing two music files concurrently. To see the technical details of the sample, 
please visit the **[included tutorial][]**. 
[included tutorial]: docs/README.md




## Project File Information ##

The file named `init-app.js` included as part of this project contains init code that runs after underlying device native code and webview/browser is ready. The file named `app.js` contains your event handlers, the center of your application. It defines  the API methods used. 

You can build a *Cordova web app* from this template that can be submitted to a
store using the "Cordova Hybrid Mobile App Platforms" build tiles (for
Crosswalk, Android, iOS and Windows). The `intelxdk.config.additions.xml` file
can be used to include options that control your *Cordova web app* builds. For
example, you can enable remote debug of an Android or Crosswalk Cordova app with
Chrome DevTools by adding the appropriate preferences to this file.

The Intel XDK does not include a mechanism to convert your "Standard HTML5 +
Cordova Project" into a "Standard HTML5 Project." The simplest way to convert a
Cordova project into a Standard project is to create a new "Standard" project
from the appropriate template and copy your files from this project into that
new project.

The `icon.png` and `screenshot.png` files are not required by your project. They
are included for use by the Intel XDK template/demo panel and have no use within
a real app. You can safely delete them from your project directory.

The `cordova.js` script is needed to provide your app with access to Cordova
APIs. To add Cordova APIs to your application you must add the corresponding
Cordova plugins. See the *Plugins* section on the **Projects** tab.

**IMPORTANT:** the `intelxdk.js` and `xhr.js` script files are not automatically
included in this template, as they have been in past versions. Those files are
only needed for apps built using the legacy AppMobi build containers on the
**Build** tab, which have been deprecated. We encourage you to use the Cordova
containers for all new applications. These script files can be added by hand, if
you require them, as follows:


    <script src="intelxdk.js" id="xdkJSintelxdk_"></script>
    <script src="cordova.js" id="xdkJScordova_"></script>
    <script src="xhr.js" id="xdkJSxhr_"></script>


The id tags are there to help future versions of the Intel XDK precisely
identify these special lines in your `index.html` file; your application does
not need to reference them.

The `xhr.js` file's purpose was to provide external domain access to your mobile
web app. In a Cordova web app this is controlled via the *Domain Access
Whitelist* in the *Build Settings* section of the **Projects** tab. For details
regarding how to specify your domain whitelist see this Cordova doc page:
<http://cordova.apache.org/docs/en/4.0.0/guide_appdev_whitelist_index.md.html#Whitelist%20Guide>

Important App Files
---------------------------
* index.html
* README.md
* *.xdk
* js/*
* css/*
* sounds/*
