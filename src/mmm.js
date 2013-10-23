(function(win, doc, undefined){
/*=========*/
var _routeGet,
/* save location to local variable */
_url = win.location.href;

_routeGet = function(){
    /* set reg expression that checks for GET in url */
    var _getRegX = new RegExp(/^.*(\?[A-Za-z0-9_=&%]+)(.*|#)$/);
    if(_getRegX.test(_url)){
        this.get = _url.replace(_getRegX, '$1');
    } else {
        this.get = undefined;
    }
    return this;
};
_routeGet.prototype = {
    isset : function(getQ, callback){
        var _rg, _multi = [], i = 0;
       
        // is it a string or array query?
        if(typeof getQ === 'string'){
            _rg = new RegExp('^.*'+getQ+'=([A-Za-z0-9%@]+).*$');
            if(_rg.test(this.get)){
                
                if(typeof callback === 'function'){
                    callback(this.get.replace(_rg, '$1').replace(/%20/g, ' '));
                } else {
                    return this.get.replace(_rg, '$1').replace(/%20/g, ' ');
                }
                
            }
        } else if(typeof getQ === 'object'){
            
            for(i ; i < getQ.length; i++){
                _rg = new RegExp('^.*'+getQ[i]+'=([A-Za-z0-9%@]+)(.*|&)$');
                
                if(_rg.test(this.get)){
                    _multi.push(this.get.replace(_rg, '$1').replace(/%20/g, ' '));
                } else {
                    _multi = [];
                    return false;
                }
            } /**/
            callback.apply(this , _multi);
            
        } else {
            return null;
        }
    }
};
/*==========================================*/
/* attach - window | requireJS | window.SIG */
window.Router = function(which){
    switch(which.toUpperCase()){
        case 'GET':
            return new _routeGet();
        break;
        /**/
        case 'HASH':
            return false;
        break;
    }
};

/**/
})(window, document);
