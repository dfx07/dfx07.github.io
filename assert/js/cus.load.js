$(function () {

      /* Define Page type */
      const PageType = {
            Common: 1,
            Post: 2,
      }

      var tag_page_type = $("head").attr("type-page")

      var page_type = tag_page_type === "Common" ? 
            PageType.Common : PageType.Post

      /* Load header and footer section */
      if(page_type === PageType.Common){
            var page_load = $('[page-content]')
            $.each(page_load, function () {
                  var file = 'views/' + $(this).attr('include') + '.html'
                  $(this).load(file)
            })
      }
      else {
            var page_load = $('[page-content]')

            $.each(page_load, function () {
                  var file = '../../views/' + $(this).attr('page-content') + '.html'
                  $(this).load(file)
            })
      }
})