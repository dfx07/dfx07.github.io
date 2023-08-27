$(function () {

      // var template_html = $('html')
      // $.each(template_html, function () {
      //       var file = 'views/' + $(this).data('include') + '.html'
      //       $(this).load(file)
      // })

      var includes = $('[data-include]')
      $.each(includes, function () {
            var file = 'views/' + $(this).data('include') + '.html'
            $(this).load(file)
      })

      var post_content = $(".post-content")
      var template_content = $(".content")
      post_content.detach().appendTo(template_content)
})