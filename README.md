JS-route
========

Quick JS router library which queries $_GET and HASH

## usage
``` js
    Router('get').isset('key' , function(value){
        // will only run callback when $_GET->key param is found
        // callback param value = ?key=value
    })
    
    // multi array keys set
    Rouer('get').isset(['key1' , 'key2', 'key3'], function(val1, val2, val3){
        // again will only run the callback when all $_GET params are found
        // callback params val{1,2.3} = ?key1=val1&key2=val2&key3=val3
    });
    
    Router('hash')
