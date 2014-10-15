/*jslint devel:true, browser:true, unparam:true, white:true */
/*global admobAd */

/* jshint strict: true, -W097 */
/* global admobAd, onDocLoad, message */


//AdMob Keys
/*
    Visit to https://apps.admob.com/ to obtain Ad Unit IDs for displaying Interstitial and Banner ads 
    Create your App entry and ad unit under the Monetize panel
*/
var admob_platform_interstitial_key = 'ADD_YOUR_AD-UNIT-ID_HERE';//Interstitial Ads
var admob_platform_banner_key = 'ADD_YOUR_AD-UNIT-ID_HERE';//Banner Ads 

/*
    Function: onReceiveFail
    Parameter: message - calback message
    Description: callback fail method
*/
function onReceiveFail(message) {
    'use strict';
    alert("load fail: " + message.type + "  " + message.data);
}

/*
    Function: showInterstitial
    Parameter: none
    Description: showInterstitial Ad; executed after init and cache Interstitial
*/
function showInterstitial() {
    'use strict';
    admobAd.isInterstitialReady(function (isReady) {
        if (isReady) {
            admobAd.showInterstitial();
        }
    });
}

/*
Function: onInterstitialReceive
Parameter: message - callback message
Description: callback success method
*/
function onInterstitialReceive(message) {
    'use strict';
    alert("onMInterstitialReceive ,you can show it now");
    showInterstitial();
}

/*
    Function: validateAdMobKey()
    Parameter: interstitialkey, bannerkey
    Description: Check if the used keys are not the default text
*/
function validateAdMobKey(interstitial_key, banner_key) {
    'use strict';
    if ((interstitial_key === 'ADD_YOUR_AD-UNIT-ID_HERE') || (banner_key === 'ADD_YOUR_AD-UNIT-ID_HERE')) {
        alert("Enter valid Google AdMob* provided Ad Unit IDs in the main.js file!!!");
    }
}

/*
    Function: onDocLoad()
    Parameter: none
    Description: show the Banner Ad [initBanner(...) then showBanner(...)] or interstitial Ad [initInterstitial(...) then cacheInterstitial() then showInterstitial()]; 
*/
function onDocLoad() {
    'use strict';
    validateAdMobKey(admob_platform_interstitial_key, admob_platform_interstitial_key);
    //show Banner ad
    admobAd.initBanner(admob_platform_banner_key, admobAd.AD_SIZE.BANNER.width, admobAd.AD_SIZE.BANNER.height);//create admob banner
    admobAd.showBanner(admobAd.AD_POSITION.BOTTOM_CENTER);
    
    //show Interstitial ad
    admobAd.initInterstitial(admob_platform_interstitial_key);//create Interstitial ad
    document.addEventListener(admobAd.AdEvent.onInterstitialReceive, onInterstitialReceive, false);
    document.addEventListener(admobAd.AdEvent.onInterstitialFailedReceive, onReceiveFail, false);
    
    admobAd.cacheInterstitial();// load admob Interstitial
}