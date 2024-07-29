
var util ={
    get_current_url : function(){
        return window.location.href;
    },
    get_base_url : function(){
        return window.location.origin;
    },
    redirect_url : function(url){
        window.location.replace(url);
    },
    get_param_current_url : function(sParam){
        var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    },
    is_contain_key_nocase : function(query_str, key){
        let regex = new RegExp(key, 'i')
        return regex.test(query_str) ? true : false
    }
}

export { util };