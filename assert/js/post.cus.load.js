import { base_loader } from "./base.cus.load.js";
import { common_creater } from "./com.creater.js";
import { Treeview_Creater, classic_treeview_creater, confluence_treeview_creater, treeview_setter} from "./treeview.creater.js";


$(function () {
    
    base_loader.load_common();

    /** loader content */ 
    var root_add = $("div.container-navbar");

    var treeview_use = Treeview_Creater.confluence;

    common_creater.create_all_post(root_add, treeview_use);
    common_creater.create_table_of_content(root_add);

    $.getJSON("../tree-archives.json", function(json_data){
        var root_nav = $("nav.tree-nav");
        var tree_archives = json_data.archives;
        if (treeview_use === Treeview_Creater.confluence) {
           
            var item_children = $(root_nav).children('.tree-nav__item').children('.side-navigation-scrollable-list');
            confluence_treeview_creater.create_treeview_from_json(
                item_children,
                tree_archives
            );
        } else if (treeview_use === Treeview_Creater.classic) {
            classic_treeview_creater.create_treeview_from_json(
                root_nav,
                tree_archives
            );
        }
        confluence_treeview_creater.load_event_handle();

    }).fail(function()
    {
        alert("An error has accurred.");
    })

    /** mark to document treeview*/
    setTimeout(function() { 
        var url = $(location).attr('href');
        var root_treeview_node = $("div.side-navigation-scrollable-list > ul"); 
        treeview_setter._make_node_open(root_treeview_node, url);
    }, 600); /* need a delay time for the document node is rendered completely */

});