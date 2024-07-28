import { util } from "./util.js";


var event_loader = {

    _search_event : function($search_key){
        var search_param_key = {
            q: $search_key,
        };

        var search_param = jQuery.param( search_param_key );
        var url_base = util.get_base_url();
        if(url_base== null){
            alert("Error !")
            return;
        }
        var search_url = url_base + "/search.html?" + search_param;
        util.redirect_url(search_url);
    },

    load_search_event : function($page_type){
        $(".navbar-search").on("submit", function (event) {
            var str_search_key = $(this).children('.search-query').val();
            event_loader._search_event(str_search_key);
            event.preventDefault();
        });
    }
}

var event_handler ={
    search_key :function($key){
        
    },
}

export { event_loader };
export { event_handler };