import { PageType } from "./com.def.js";
import { classic_treeview_creater, confluence_treeview_creater, Treeview_Creater } from "./treeview.creater.js";

var src_loader = {
    /**
     * Load css file
     * @param {*} $root_path : path load
     * @param {*} $obj_type_src : object = {mediatype + src filename}
     */
    _load_css: function ($root_path, $arr_objCssNsrc) {
        $.each($arr_objCssNsrc, function (index, objCssIf) {
            var css_tag = document.createElement("link");
            css_tag.href = $root_path + objCssIf.src;
            css_tag.rel = "stylesheet";
            css_tag.style = "text/css";
            if (objCssIf.media != undefined) {
                css_tag.media = objCssIf.media;
            }

            $("head").append(css_tag);
        });
    },

    /**
     * load js file content
     * @param {*} $root_path : root path 
     * @param {*} $arr_objJsNsrc : array js file load
     */
    _load_js: function ($root_path, $arr_objJsNsrc) {
        $.each($arr_objJsNsrc, function (index, objJsIf) {
            var js_tag = document.createElement("script");
            if (objJsIf.type != undefined) {
                js_tag.type = objJsIf.type;
            }
            js_tag.src = $root_path + objJsIf.src;
            $("head").append(js_tag);
        });
    },

    load_src_page: function ($page_type) {
        /* Load header and footer section */
        if ($page_type === PageType.Common) {
            var page_load = $("[page-content]");
            $.each(page_load, function () {
                var file = "views/" + $(this).attr("page-content") + ".html";
                $(this).load(file);
            });

            var treeview_use = Treeview_Creater.confluence;

            /** load tree view home file */
            $.getJSON("./post/tree-archives.json", function (json_data) {
         
                var tree_archives = json_data.archives;

                if(treeview_use === Treeview_Creater.confluence){
                    var root_nav = $("nav.tree-nav .side-navigation-scrollable-list");
                    confluence_treeview_creater.create_treeview_from_json(
                        root_nav,
                        tree_archives,
                        0
                    );

                    confluence_treeview_creater.load_event_handle();
                } else if (treeview_use === Treeview_Creater.classic) {
                    $("div.tree-nav__item .side-navigation-scrollable-list").remove()

                    var root_nav = $("nav.tree-nav");
                    classic_treeview_creater.create_treeview_from_json(
                        root_nav,
                        tree_archives,
                        0
                    );
                }
            });

            /** { media }  : { file name }*/
            const css_loader = [
                { media: "screen", src: "bootstrap-combined.min.css" },
                { media: "screen", src: "style.css" },
                { media: "screen", src: "xtreeview.css" },
                { media: "screen", src: "dfxhome.css" },
                { media: "print", src: "dfxprint.css" },
            ];

            /** { type }  : { file name } */
            const js_loader = [
                { type: "module", src: "ui/bootstrap.min.js" }
            ];

            src_loader._load_css("./assert/css/", css_loader);
            src_loader._load_js("./assert/js/", js_loader);

        } else if ($page_type === PageType.Post) {
            var page_load = $("[page-content]");

            $.each(page_load, function () {
                var file =
                    "../../views/" + $(this).attr("page-content") + ".html";
                $(this).load(file);
            });

            mathjax: "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default";

            /** { media }  : { file name }*/ 
            const css_loader = [
                { media: "screen", src: "prism.css" },
                { media: "screen", src: "style.css" },
                { media: "screen", src: "xtreeview.css" },
                { media: "screen", src: "bootstrap-combined.min.css" },
                { media: "print", src: "dfxprint.css" },
            ];

            /** { type }  : { file name } */
            const js_loader = [
                { type: "module", src: "ui/bootstrap.min.js" },
                { type: "module", src: "ui/md-block.js" },
                { type: undefined, src: "ui/prism.js" },
                { type: "text/javascript", src: "ui/prism.js" },
            ];

            src_loader._load_js("../../assert/js/", js_loader);
            src_loader._load_css("../../assert/css/", css_loader);
        }
    },
};


export {src_loader}
