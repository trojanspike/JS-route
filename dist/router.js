(function(window, document) {
  var _routerGet, _routerHash, _routerSegm;
  _routerGet = (function() {
    var _url;

    _url = window.location.href;

    function _routerGet() {
      var _getRegX;
      _getRegX = /^.*(\?[A-Za-z0-9_=&%]+)(.*|#)$/;
      if (_getRegX.test(_url)) {
        this.val = _url.replace(_getRegX, '$1');
      } else {
        this.val = void 0;
      }
    }

    /*
     isset method
    */


    _routerGet.prototype.isset = function(getQ, callback) {
      var i, _i, _len, _multi, _rg;
      _rg = new RegExp('^.*' + getQ + '=([A-Za-z0-9%@]+).*$');
      if (typeof getQ === 'string') {
        if (_rg.test(this.val)) {
          if (typeof callback === 'function') {
            callback(this.val.replace(_rg, '$1').replace(/%20/g, ' '));
          } else {
            return this.val.replace(_rg, '$1').replace(/%20/g, ' ');
          }
        }
      } else if (typeof getQ === 'object') {
        _multi = [];
        for (_i = 0, _len = getQ.length; _i < _len; _i++) {
          i = getQ[_i];
          _rg = new RegExp('^.*' + i + '=([A-Za-z0-9%@]+)(.*|&)$');
          if (_rg.test(this.val)) {
            _multi.push(this.get.replace(_rg, '$1').replace(/%20/g, ' '));
          } else {
            _multi = [];
            return false;
          }
        }
        if (typeof callback === 'function') {
          callback.apply(this, _multi);
        } else {
          return _multi;
        }
      }
      return this;
    };

    _routerGet.prototype.set = function(key, val) {
      /*
          Lets change the get param and keep the other states , i.e segments & hash
      */

      var _replaceRgx, _setRgx;
      if (typeof key !== 'string' || typeof val !== 'string') {
        throw new Error('.set($1, $2) method $1 and $2 must be strings');
      }
      _setRgx = new RegExp('^.*' + key + '=([A-Za-z0-9%@]+).*$');
      if (_setRgx.test(this.val)) {
        _replaceRgx = new RegExp('^(.*' + key + '=)([A-Za-z0-9%@]+&?)(&.*|#.*|.*)$');
        if (this.val.replace(_replaceRgx, '$2') !== val) {
          window.location.href = _url.replace(/^(.*)\?.*$/, '$1' + this.val.replace(_replaceRgx, '$1' + val + '$3' + window.location.hash));
        }
      } else {
        window.location.href = _url.replace(/^(.*)\?.*$/, '$1' + this.val + '&' + key + '=' + val + window.location.hash.replace(/&&/g, '&'));
      }
      if (typeof this.val === 'undefined') {
        window.location.href = window.location.href.replace(/^(.*)#.*|.*$/, '$1') + '?' + key + '=' + val + '' + window.location.hash;
      }
      return this;
    };

    _routerGet.prototype.rm = function(key) {
      var _rmRgx;
      if (typeof key !== 'string') {
        throw new Error('.set($1) method $1 must be strings');
      }
      _rmRgx = new RegExp('^(.*)(' + key + '=[A-Za-z0-9%@]+&?)(&.*|#.*|.*)$');
      if (_rmRgx.test(this.val)) {
        window.location.href = _url.replace(/^(.*)\?.*$/, '$1' + this.val.replace(_rmRgx, '$1$3' + window.location.hash));
      }
      return this;
    };

    return _routerGet;

  })();
  _routerHash = (function() {
    var watch, _RunPathFunc, _currentPath, _hash;

    function _routerHash() {}

    _hash = window.location.hash;

    _currentPath = '';

    _RunPathFunc = {};

    _routerHash.prototype.when = function(path, callback) {
      if (typeof path !== 'string' || typeof callback !== 'function') {
        throw new Error('Hash method when() params must be when(STRING, FUNCTION) - required');
      }
      /* if typeof _RunPathFunc['#!'+path] is 'undefined'*/

      _RunPathFunc['#!' + path] = callback;
      if (_hash === '' || '#!' || '#') {
        window.location.hash = '#!/';
        _hash = '#!/';
      }
      return this;
    };

    _routerHash.prototype.base = function(callback) {
      if (typeof callback !== 'function') {
        throw new Error('.base(param) method param must be a function');
      }
      return _RunPathFunc['#!/'] = callback;
    };

    _routerHash.prototype.goto = function(to) {
      if (typeof to !== 'string') {
        throw new Error('.goto(param) method param must be a string : /home');
      }
      return window.location.hash = '#!' + to;
    };

    (watch = function() {
      setTimeout(watch, 600);
      if (window.location.hash !== _currentPath) {
        _hash = window.location.hash;
      }
      if (_hash !== _currentPath) {
        _currentPath = _hash;
        if (typeof _RunPathFunc[_hash] !== 'undefined') {
          return _RunPathFunc[_hash].call();
        }
      }
    })();

    return _routerHash;

  })();
  _routerSegm = (function() {
    function _routerSegm() {
      return false;
      this.prototype = {
        run: function() {}
      };
    }

    return _routerSegm;

  })();
  return window.Router = function(which) {
    var _hashInst;
    switch (which.toUpperCase()) {
      case 'GET':
        return new _routerGet();
      case 'HASH':
        if (typeof _hashInst === 'undefined') {
          return _hashInst = new _routerHash();
        } else {
          return _hashInst;
        }
        break;
      case 'SEGMENTS':
      case 'SEG':
        return new _routerSegm();
      default:
        throw new Error('Missing param Router(get|hash)');
    }
  };
})(window, document);

/*
//@ sourceMappingURL=router.js.map
*/