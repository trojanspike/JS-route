JS-route
========

Quick JS router library which queries $_GET and HASH

### usage :
``` js
    Router('get').isset('key' , function(value){
        // will only run callback when $_GET->key param is found
        // callback param value = ?key=value
    })
    
    // multi array keys set
    Router('get').isset(['key1' , 'key2', 'key3'], function(val1, val2, val3){
        // again will only run the callback when all $_GET params are found
        // callback params val{1,2.3} = ?key1=val1&key2=val2&key3=val3
    });
    // example could be something like
    // website.com?gallery=buildings&city=new-york
    Router('get').isset(['gallery', 'city'], function(gallery, city){
        var _images = $.getJSON('/path/to/'+city+'/'+gallery+'/images.json');
        // then display the images
    });
    
    var keyValue = Router('get').isset('myGetKey');
    //- keyValue will be the value if set , or undefined if not set , also return '' if key is set but has no value
    
    var keyArray = Router('get').isset(['key', 'door', 'lock', 'unicorns']);
    //- keyArray will be the JS array if all keys are set , if the keys have no value the array value will be ''
    // if all keys are not set : keyArray will be false
    
    
    /*******************************************************************************/
    
    Router('hash')
    .when('/home' , function(){
        // match website.com#!/home
        // do something on the page : open div , display message etc
    })
    .when('/home/pictures' , function(){
        // match : website.com#!/home/pictures
        // only fires callback when hash in the URL match 
        // website.com#!/home/pictires
    })
    .when('/login' , function(){
        // website.com#!/login
    });
    
next to do on hash-when , pass params to callback function for wildcard hash url , e.g
    .when('/images(/:string)(/:num?)', function(string, num){
        // callback will only run when hash matches 
        // -- website.com#!/images/SOMESTRING , also
        // -- website.com#!/images/SOMESTRING/SOMENUMBER - note num will be optional
    })
    
    /*******************************************************************************/
    
    Router('segments') // not ready yet
