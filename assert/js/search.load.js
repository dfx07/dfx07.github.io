import { base_loader } from "./base.cus.load.js";
import { common_creater } from "./com.creater.js";
import { data_query } from "./data.query.js";
import { util } from "./util.js";


$(function () {
    
    base_loader.load_common();
    var search_key = util.get_param_current_url('q');

    $.getJSON("./post/tree-archives.json", function(json_data){
        var tree_archives = json_data.archives;
        var rel_archives = data_query.query_archives(tree_archives, search_key);
        common_creater.fill_search_result($('.container-content'), search_key, rel_archives);

    }).fail(function()
    {
        alert("An error has accurred.");
    })
});