//AdMob Keys
var admob_ios_key = 'MY_iOS_ADMOB_Ad_unit_ID';
//var admob_android_key = 'ca-app-pub-2634431076411342/6548504911';//Intersitial Ads
var admob_android_key = 'ca-app-pub-2634431076411342/8664366510';//Banner Ads 

function onDocLoad() {
    if(( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        initApp();
    }
}

function initApp() {
    initAd();

    // display a banner Ad at startup
    window.plugins.AdMob.createBannerView();
    // display an interstitial Ad at startup
    //window.plugins.AdMob.createInterstitialView();
}

function platformCheck(){
    if(device.platform == "iOS"){
        //If iOS device, remove upage CSS class from the mainpage to enable scrolling horizontal
        document.getElementById('mainpage').className="panel";
    }
    else if (device.platform.substr(0, 3) == "Win"){ //Windows phone
        //If Windows Phone Device, set the height and width to the device eight and width
        document.getElementById("webpage").style.height = window.innerHeight+"px";
    }
}


function initAd(){
    platformCheck();
    
    if ( window.plugins && window.plugins.AdMob ) {
        var admobid = (( /(android)/i.test(navigator.userAgent) ) ? admob_android_key : admob_ios_key);
        window.plugins.AdMob.setOptions( {
            publisherId: admobid,
            bannerAtTop: false, // set to true, to put banner at top
            overlap: false, // set to true, to allow banner overlap webview
            offsetTopBar: false, // set to true to avoid ios7 status bar overlap
            isTesting: true, // receiving test ad
            autoShow: true // auto show interstitial ad when loaded
        });

    } else {
        alert( 'admob plugin not ready' );
    }
}
