// Generated by CoffeeScript 1.6.3
(function(window, document) {
  var _routerGet, _routerHash;
  _routerGet = (function() {
    var _url;

    _url = window.location.href;

    function _routerGet() {
      var _getRegX;
      _getRegX = /^.*(\?[A-Za-z0-9_=&%]+)(.*|#)$/;
      if (_getRegX.test(_url)) {
        this.get = _url.replace(_getRegX, '$1');
      } else {
        this.get = void 0;
      }
    }

    /*
     isset method
    */


    _routerGet.prototype.isset = function(getQ, callback) {
      var i, _i, _len, _multi, _ref, _rg;
      if (typeof getQ !== 'string' || 'object') {
        throw new Error('Missing param .isset(string|array , func)');
      }
      _rg = new RegExp('^.*' + getQ + '=([A-Za-z0-9%@]+).*$');
      if (typeof getQ === 'string') {
        if (_rg.test(this.get)) {
          if (typeof callback === 'function') {
            return callback(this.get.replace(_rg, '$1').replace(/%20/g, ' '));
          } else {
            return this.get.replace(_rg, '$1').replace(/%20/g, ' ');
          }
        }
      } else {
        _ref = getQ.length;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          _rg = new RegExp('^.*' + getQ[i] + '=([A-Za-z0-9%@]+)(.*|&)$');
          if (_rg.test(this.get)) {
            _multi.push(this.get.replace(_rg, '$1').replace(/%20/g, ' '));
          } else {
            _multi = [];
            return false;
          }
        }
      }
    };

    return _routerGet;

  })();
  _routerHash = (function() {
    function _routerHash() {
      return false;
    }

    return _routerHash;

  })();
  return window.Router = function(which) {
    switch (which.toUpperCase()) {
      case 'GET':
        return new _routerGet();
      case 'HASH':
        return new _routerHash();
      default:
        throw new Error('Missing param Router(get|hash)');
    }
  };
})(window, document);
