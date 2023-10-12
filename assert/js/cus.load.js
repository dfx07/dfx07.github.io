import { treeview_util } from "./util.js"

$(function () {

      /* Define Page type */
      const PageType = {
            Common: 1,
            Post: 2,
      }

      var tag_page_type = $("head").attr("type-page")

      var page_type = String(tag_page_type).toLowerCase() === "Common".toLowerCase() ? 
            PageType.Common : PageType.Post

      /* Load header and footer section */
      if(page_type === PageType.Common){
            var page_load = $('[page-content]')
            $.each(page_load, function () {
                  var file = 'views/' + $(this).attr('page-content') + '.html'
                  $(this).load(file)
            })

            /** load tree view home file */
            $.getJSON("./post/tree-archives.json", function(json_data)
            {
                  var root_nav = $("nav.tree-nav");
                  var tree_archives = json_data.archives;
      
                  treeview_util.create_treeview_from_json(root_nav, tree_archives, 0);
            });
      }
      else {
            var page_load = $('[page-content]')

            $.each(page_load, function () {
                  var file = '../../views/' + $(this).attr('page-content') + '.html'
                  $(this).load(file)
            })

            /* Load tree define from XML */
            
      }
})