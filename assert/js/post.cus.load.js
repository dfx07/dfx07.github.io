import { treeview_util } from "./util.js";

$(function () {

    $.getJSON("../tree-archives.json", function(json_data)
    {
        var root_nav = $("nav.tree-nav");

        var tree_archives = json_data.archives;

        treeview_util.create_treeview_from_jsondata(root_nav, tree_archives);

    }).fail(function()
    {
        alert("An error has accurred.");
    })


    // only use post content
    const obj_js_cus_load = 
    {
        mathjax : 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default',
        markdown: 'https://md-block.verou.me/md-block.js',
        prism   : "../../assert/js/prism.js",
    }

    const obj_css_cus_load = 
    {
        prism   : "../../assert/css/prism.css",
        print   : "../../assert/css/dfxprint.css",
    }

    $.each(obj_js_cus_load, function(key, src_item){
        var js_tag = document.createElement("script");
        if(key === "markdown"){
            js_tag.type = "module";
        }else {
        }
        js_tag.src = src_item;
        $("head").append(js_tag); 
    });

    $.each(obj_css_cus_load, function(key, src_item){
        var css_tag = document.createElement("link");
        css_tag.href = src_item;
        css_tag.rel = "stylesheet";
        css_tag.style = "text/css"
        if(key === "print"){
            css_tag.media ="print";
        }else{
            css_tag.media ="screen";
        }

        $("head").append(css_tag); 
    });
});