JS-route
========

Quick JS router library which queries $_GET and HASH

### GET usage :
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
    Router('get').isset(['gallery', 'country'], function(gallery, country){
        var _images = $.getJSON('/path/to/'+country+'/'+gallery+'/images.json');
        // then display the images
    });
    
    var keyValue = Router('get').isset('myGetKey');
    //- keyValue will be the value if set , or undefined if not set , also return '' if key is set but has no value
    
    var keyArray = Router('get').isset(['key', 'door', 'lock', 'unicorns']);
    //- keyArray will be the JS array if all keys are set , if the keys have no value the array value will be ''
    // if all keys are not set : keyArray will be false
    
    //- set a key to a value while keeping the other stage , hash 
    Router('get').set('key' , 'value'); 
        // if key is set and has the value no change will happen
        // if key is set but value is different change will happen - browser reload
        // if key is not set browser will reload - setting the key and value
        
    //- remove key and value
    Router('get').rm('key' , 'value'); // again other states will be kept
        // if key is set broser will reload removing it while keep the other GET keys & values
        
    //- all chainable
    Router('get').isset(PARAMS).rm('key').set('key' , 'value');
    
    //- example could be
    Router('get').isset('gallery' , function(gallery){
        if(gallery === ''){
            Router('get').set('gallery' , 'unicorns');
        }
    });
    
    

### HASH usage :
``` js    
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
    })
    .base(function(){
        // what to do for the base hash : #!/
    });
    
    //- change the hash
    Router('hash').goto('/terms/privacy/cookies');
    
    //- example could be
    Router('hash').when('/terms' , function(){
        // display terms page
        $(element).on('click' , function(){
            Router('hash').goto('/terms/privacy/cookies');
        });
    });
    
next to do on hash-when , pass params to callback function for wildcard hash url , e.g
    .when('/images(/:string)(/:num?)', function(string, num){
        // callback will only run when hash matches 
        // -- website.com#!/images/SOMESTRING , also
        // -- website.com#!/images/SOMESTRING/SOMENUMBER - note num will be optional
    })
 
    
### SEGMENTS usage :
``` js 
    
    Router('segments') // not ready yet
