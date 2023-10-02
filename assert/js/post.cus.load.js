$(function () {

    $.getJSON("../tree-archives.json", function(json_data)
    {
        var add_link = function ($root_tag, $name, $href){
            const str_tag_link = '\
                                <a class="tree-nav__item-title" href="'+ $href + '"> \
                                    <i class="icon ion-edit"></i>'+ $name + '\
                                </a>';
            var tag_link = $(str_tag_link);
            $root_tag.append(tag_link);
            return tag_link;
        };

        var create_tag_folder = function($root_tag, $name){
            const str_tag_folder = '\
                            <details class="tree-nav__item is-expandable">\
                              <summary class="tree-nav__item-title">' + $name + '</summary>\
                              <div class="tree-nav__item"></div>\
                            </details>';
            var tag_folder = $(str_tag_folder);
            $root_tag.append(tag_folder);
            return tag_folder;
        };

        var add_folder = function($root, $items){
            $.each($items, function(key, item){
                if(item.type === "folder"){
                    var tag_push = $root.children("div.tree-nav__item:first");
                    var tag_folder_added = create_tag_folder(tag_push, item.name);
                    if(item.sub !== undefined)
                    {
                        add_folder(tag_folder_added, item.sub)
                    }
                }else if(item.type === "link"){
                    var tag_push = $root.children("div.tree-nav__item:first");
                    add_link(tag_push, item.name, item.href);
                }
                else {
                    alert("type not define");
                }
            });
        };

        var root_nav = $("nav.tree-nav");

        var tree_archives = json_data.archives;

        add_folder(root_nav, tree_archives);

    }).fail(function()
    {
        alert("An error has accurred.");
    })
})