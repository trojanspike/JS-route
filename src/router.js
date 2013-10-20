(function(win, doc, undefined){
/*=========*/
var _routeGet,
_url = win.location.href;

_routeGet = function(){
    var _getRegX = new RegExp(/^.*(\?[A-Za-z0-9_=&%]+)(.*|#)$/);
    if(_getRegX.test(_url)){
        this.get = _url.replace(_getRegX, '$1');
    } else {
        this.get = false;
    }
    return this;
};
_routeGet.prototype = {
    isset : function(getQ, callback){
        var _rg = new RegExp('^.*'+getQ+'=([A-Za-z0-9%@]+).*$');
        if(_rg.test(this.get) && typeof getQ === 'string'){
            callback(this.get.replace(_rg, '$1').replace(/%20/g, ' '));
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
            
        break;
    }
};

/**/
})(window, document);
