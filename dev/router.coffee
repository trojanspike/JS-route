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
            
            if typeof getQ isnt 'string' or 'object'
                throw new Error 'Missing param .isset(string|array , func)'
            
            _rg = new RegExp('^.*'+getQ+'=([A-Za-z0-9%@]+).*$');
            
            if typeof getQ is 'string'
                if _rg.test(@get)
                    if typeof callback is 'function'
                        callback @get.replace(_rg, '$1').replace /%20/g, ' '
                    else
                        return @get.replace(_rg, '$1').replace /%20/g, ' '
            else
                for i in getQ.length
                    _rg = new RegExp('^.*'+getQ[i]+'=([A-Za-z0-9%@]+)(.*|&)$');
                    if _rg.test @get
                        _multi.push this.get.replace(_rg, '$1').replace /%20/g, ' '
                    else
                        _multi = []
                        return false
                
                
        
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