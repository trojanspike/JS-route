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
        constructor:()->
            return false
    
    #################################
    window.Router = (which)->
        switch which.toUpperCase()
            when 'GET' then return new _routerGet()
            when 'HASH' then return new _routerHash()
            else throw new Error 'Missing param Router(get|hash)'