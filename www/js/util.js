/*global console:false, window:false, moment:false, document:false */



// helper to get root of local media file in Emulate and Debug tabs
function getWebRoot() {
    "use strict" ;
    var path = window.location.href ;
    path = path.substring( 0, path.lastIndexOf('/') ) ;
    return path ;
}



var orgConsoleLog = console.log ;
var orgTime = Date.now() ;
console.log = function() {
    "use strict" ;

    var args = Array.prototype.slice.call(arguments, 0) ;

    if( window.moment ) {
        args.unshift(moment().format("HH:mm:ss.SSS")) ;
    }
    else {
        args.unshift(((Date.now()-orgTime)/1000).toFixed(3)) ;
    }
    orgConsoleLog.apply(this,args) ;

    var text = args.join(" ") ;
    var node ;
    var el ;

    el = document.getElementById("id_textArea") ;
    if( el ) {
        node = document.createTextNode(text + "\n") ;
        el.appendChild(node) ;
    }

    el = document.getElementById("id_msgBar") ;
    if( el ) {
        node = document.createTextNode(text) ;
        el.replaceChild(node,el.childNodes[0]) ;
    }
} ;
