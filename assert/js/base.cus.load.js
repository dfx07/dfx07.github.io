import { PageType } from "./com.def.js";
import { event_loader } from "./event.loader.js";
import { src_loader } from "./src.loader.js";

var base_loader = {
    /**
     * Include : load include resource and event
     */
    load_common : function(){
        /** load resource */
        var tag_page_type = $("head").attr("type-page");

        var page_type =
            String(tag_page_type).toLowerCase() === "Common".toLowerCase()
                ? PageType.Common
                : PageType.Post;

        src_loader.load_src_page(page_type);

        setTimeout(function() { 
            event_loader.load_search_event(page_type);
        }, 500);
    }
}

export { base_loader };