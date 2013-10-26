# JS-route : access GET and hash - with live change watch on hash
# Simple , Easy and clean to use
----------

Quick JS router library which queries $_GET and HASH

### GET usage :
Methods

 * .isset    : 2 params , ( 1 - string or array, required ) ( 2 - function , optionsl )
 * .set      : 2 parms  , ( 1 - string : key name , required ) ( 2 - string : key value , required )
 * .rm       : 1 params , ( 1 - string : key name , required)

Properities
* .val      : returns string - get string or false if no string

```javascript
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
    
    //- set a key to a value while keeping the other stage , hash 
    Router('get').set('key' , 'value'); 
        // if key is set and has the value no change will happen
        // if key is set but value is different change will happen - browser reload
        // if key is not set browser will reload - setting the key and value
        
    //- remove key and value
    Router('get').rm('key'); // again other states will be kept
        // if key is set broser will reload removing it while keep the other GET keys & values
        
    //- all chainable
    Router('get').isset(PARAMS).rm('key').set('key' , 'value');
    
    //- example could be
    Router('get').isset('gallery' , function(gallery){
        // url : website.com?gallrey&city=newyork
        if(gallery === ''){
            Router('get').set('gallery' , 'unicorns');
            // will become : website.com?gallrey=unicorns&city=newyork
        }
    });
```    
    

### HASH usage :
Methods

 * .when    : 2 params , ( 1 - string , required ) ( 2 - function , required ) required method
 * .base      : 1 parms  ,  ( 1 - string : key value , required ) option method
 * .goto       : 1 params , ( 1 - string : hash to go to , required) option method

Properities

```javascript    
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
 
```    
### SEGMENTS usage :
Methods


Properities

```javascript
    Router('segments') // not ready yet
```


All code and examples are released under an MIT License

The MIT License

Copyright (c) 2013 Lee Mc Kay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
