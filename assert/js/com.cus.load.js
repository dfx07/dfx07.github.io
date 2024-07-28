import { src_loader , PageType} from "./src.loader.js";


$(function () {
    /** load resource */
    var tag_page_type = $("head").attr("type-page");

    var page_type =
        String(tag_page_type).toLowerCase() === "Common".toLowerCase()
            ? PageType.Common
            : PageType.Post;

    src_loader.load_src_page(page_type);
})
