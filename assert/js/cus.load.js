import { treeview_util, src_loader} from "./util.js"

$(function () {

      /* Define Page type */
      const PageType = {
            Common: 1,
            Post  : 2,
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

            // { media }  : { file name }
            const css_loader = [
                  { media : 'screen', src : 'bootstrap-combined.min.css'},
            ]

            // { type }  : { file name }
            const js_loader = [
                  { type : 'module', src : 'bootstrap.min.js'},
                  
            ]

            src_loader.load_css('./assert/css/', css_loader);
            src_loader.load_js('./assert/js/', js_loader);
   
      }
      else {
            var page_load = $('[page-content]')

            $.each(page_load, function () {
                  var file = '../../views/' + $(this).attr('page-content') + '.html'
                  $(this).load(file)
            })

            mathjax : 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default';

            // { media }  : { file name }
            const css_loader = [
                  { media : 'screen', src : 'bootstrap-combined.min.css'},
                  { media : 'print' , src : 'dfxprint.css'},
                  { media : 'screen', src : 'prism.css'},
            ]

            // { type }  : { file name }
            const js_loader = [
                  { type : 'module' , src : 'bootstrap.min.js'},
                  { type : 'module' , src : 'md-block.js'},
                  { type : undefined, src : 'prism.js'},
            ]

            
            src_loader.load_css('../../assert/css/', css_loader);
            src_loader.load_js('../../assert/js/', js_loader);
            


      }
})

$("md-block").ready(function() {
      var table_of_contents = $(".table-of-contents").detach();
      $(".ml-tables").appendTo(table_of_contents)
  });