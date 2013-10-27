do (window, document)->
    #################################
    class _routerGet
        _url = window.location.href
    ###########################    
        constructor:->
            _getRegX = ///^
                .*
                (\?[A-Za-z0-9_=&%]+)
                (.*|#)
                $///
                
            if _getRegX.test _url
                @val = _url.replace _getRegX, '$1'
            else
                @val = undefined;
        
        ###
         isset method
        ###
        @::isset = (getQ, callback) ->
            
            _rg = new RegExp('^.*'+getQ+'=([A-Za-z0-9%@]+).*$');
            
            if typeof getQ is 'string'
                if _rg.test(@val)
                    if typeof callback is 'function'
                        callback @val.replace(_rg, '$1').replace /%20/g, ' '
                    else
                        return @val.replace(_rg, '$1').replace /%20/g, ' '
                        
                        
            else if typeof getQ is 'object'
                _multi = []
                for i in getQ
                    _rg = new RegExp('^.*'+i+'=([A-Za-z0-9%@]+)(.*|&)$');
                    
                    if _rg.test @val
                        _multi.push this.get.replace(_rg, '$1').replace /%20/g, ' '
                    else
                        _multi = []
                        return false
                if typeof callback is 'function'
                    callback.apply this, _multi
                else
                    return _multi
            @
        
        @::set = (key, val) ->
            ###
                Lets change the get param and keep the other states , i.e segments & hash
            ###
            if typeof key isnt 'string' or typeof val isnt 'string' then throw new Error '.set($1, $2) method $1 and $2 must be strings'
            
            _setRgx = new RegExp('^.*'+key+'=([A-Za-z0-9%@]+).*$');
            if _setRgx.test @val
                _replaceRgx = new RegExp('^(.*'+key+'=)([A-Za-z0-9%@]+&?)(&.*|#.*|.*)$');
                if @val.replace(_replaceRgx , '$2') isnt val
                    window.location.href = _url.replace /^(.*)\?.*$/, '$1' +@val.replace _replaceRgx , '$1'+val+'$3'+window.location.hash
                    
            else
                    window.location.href = _url.replace /^(.*)\?.*$/, '$1' +@val+'&'+key+'='+val+window.location.hash.replace(/&&/g, '&')
            
            if typeof @val is 'undefined'
                    window.location.href = window.location.href.replace(/^(.*)#.*|.*$/, '$1')+'?'+key+'='+val+''+window.location.hash
            
            @
        
        @::rm = (key)->
            if typeof key isnt 'string' then throw new Error '.set($1) method $1 must be strings'
            
            _rmRgx = new RegExp('^(.*)('+key+'=[A-Za-z0-9%@]+&?)(&.*|#.*|.*)$');
            if _rmRgx.test @val
                window.location.href =  _url.replace /^(.*)\?.*$/, '$1' +@val.replace _rmRgx , '$1$3'+window.location.hash
            @
                
        
    #################################
    class _routerHash
        _hash = window.location.hash
        _currentPath = ''
        _RunPathFunc = {}
        
        @::when = (path, callback)->
            if typeof path isnt 'string' or typeof callback isnt 'function'
                throw new Error 'Hash method when() params must be when(STRING, FUNCTION) - required'
                
            ### if typeof _RunPathFunc['#!'+path] is 'undefined' ###
            _RunPathFunc['#!'+path] = callback
            
            if _hash is '' or '#!' or '#'
                window.location.hash = '#!/'
                _hash = '#!/'
            @
        
        @::base = (callback) ->
            if typeof callback isnt 'function' then throw new Error '.base(param) method param must be a function'
            _RunPathFunc['#!/'] = callback
        
        @::goto = (to) ->
            if typeof to isnt 'string' then throw new Error '.goto(param) method param must be a string : /home'
            window.location.hash = '#!'+to
        
        do watch = ->
            setTimeout watch, 600
            
            
            if window.location.hash isnt _currentPath
                _hash = window.location.hash  
            
            if  _hash isnt _currentPath
                _currentPath = _hash
                if typeof _RunPathFunc[_hash] isnt 'undefined'
                    _RunPathFunc[_hash].call()     

    #################################
    class _routerSegm
        constructor:->
            return false
            
            @:: =
                run : ->
            
    
    #################################
    window.Router = (which)->
        switch which.toUpperCase()
            when 'GET' then return new _routerGet()
            when 'HASH'
                if typeof _hashInst is 'undefined'
                    return _hashInst = new _routerHash()
                else
                    return _hashInst
            when 'SEGMENTS' , 'SEG' then return new _routerSegm()
            else throw new Error 'Missing param Router(get|hash)'
            
            
            
            