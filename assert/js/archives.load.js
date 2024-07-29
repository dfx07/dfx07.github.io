import { base_loader } from "./base.cus.load.js";
import { common_creater } from "./com.creater.js";
import { data_query } from "./data.query.js";

$(function () {
    base_loader.load_common();

    $.getJSON("./post/tree-archives.json", function(json_data){
        var tree_archives = json_data.archives;
        var rel_archives = data_query.query_archives_all(tree_archives);
        common_creater.fill_archives($('ul.list-all-articles'), rel_archives);

    }).fail(function()
    {
        alert("An error has accurred.");
    })
});