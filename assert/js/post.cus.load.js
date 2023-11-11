import { treeview_util } from "./util.js";
import { all_post_loader } from "./util.js";

$(function () {

    var root_add = $("div.container-navbar");

    all_post_loader.add_all_post(root_add);
    all_post_loader.add_table_of_content(root_add);

    $.getJSON("../tree-archives.json", function(json_data)
    {
        var root_nav = $("nav.tree-nav");

        var tree_archives = json_data.archives;

        treeview_util.create_treeview_from_json(root_nav, tree_archives);

    }).fail(function()
    {
        alert("An error has accurred.");
    })
});