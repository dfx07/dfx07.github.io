import { treeview_util } from "./util.js";

$(function () {

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