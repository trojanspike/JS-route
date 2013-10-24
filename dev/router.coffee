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
                @get = _url.replace _getRegX, '$1'
            else
                @get = undefined;
        
        ###
         isset method
        ###
        @::isset = (getQ, callback) ->
            
            _rg = new RegExp('^.*'+getQ+'=([A-Za-z0-9%@]+).*$');
            
            if typeof getQ is 'string'
                if _rg.test(@get)
                    if typeof callback is 'function'
                        callback @get.replace(_rg, '$1').replace /%20/g, ' '
                    else
                        return @get.replace(_rg, '$1').replace /%20/g, ' '
                        
                        
            else if typeof getQ is 'object'
                _multi = []
                for i in getQ
                    _rg = new RegExp('^.*'+i+'=([A-Za-z0-9%@]+)(.*|&)$');
                    
                    if _rg.test @get
                        _multi.push this.get.replace(_rg, '$1').replace /%20/g, ' '
                    else
                        _multi = []
                        return false
                if typeof callback is 'function'
                    callback.apply this, _multi
                else
                    return _multi     
                
                
        
    #################################
    class _routerHash
        _hash = window.location.hash
        _currentPath = ''
        _PathsArr = []
        _PathsFunc = {}
        _run = false
        
        @::when = (path, callback)->
            if typeof path isnt 'string' or typeof callback isnt 'function'
                throw new Error 'Hash method when() params must be when(STRING, FUNCTION) - required'
            
                    
            _PathsFunc[_PathsArr.length] = callback;
            _PathsArr.push '#!'+path
            
            if _hash is ''
                window.location.hash = '#!/'
                _hash = '#!/'
            @    
        
        do watch = ->
            setTimeout watch, 600
            
            if window.location.hash isnt _currentPath
                _hash = window.location.hash
                
            for i in _PathsArr
                if i is _hash and i isnt _currentPath
                    _currentPath = window.location.hash
                    _PathsFunc[_i].call()
                    
            
            
    
    #################################
    window.Router = (which)->
        switch which.toUpperCase()
            when 'GET' then return new _routerGet()
            when 'HASH' then return new _routerHash()
            else throw new Error 'Missing param Router(get|hash)'
            
            
            
            