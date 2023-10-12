
var treeview_util ={
    add_link : function($root_tag, $name, $href){
        const str_tag_link = '\
                            <a class="tree-nav__item-title" href="'+ $href + '"> \
                                <i class="icon ion-edit"></i>'+ $name + '\
                            </a>';
        var tag_link = $(str_tag_link);
    
        $root_tag.append(tag_link);
        return tag_link;
    },
    create_tag_folder : function($root_tag, $name, $expand = false){
        const str_tag_folder = '\
                        <details class="tree-nav__item is-expandable"'+ (($expand) ? ' open=""':' ') +'>\
                          <summary class="tree-nav__item-title">' + $name + '</summary>\
                          <div class="tree-nav__item"></div>\
                        </details>';

        var tag_folder = $(str_tag_folder);
        $root_tag.append(tag_folder);
        return tag_folder;
    },
    /**
     * Create tree view folder from json data
     * @param {*} $root 
     * @param {*} $items 
     * @param {*} $leve_expand : default close  
     * Note : Function internal  
     */
    _create_treeview_from_jsondata : function($root, $json_data, $level = 0, $level_expand = -1){
        $.each($json_data, function(key, item){
            if(item.type === "folder"){
                var tag_push = $root.children("div.tree-nav__item:first");
                var tag_folder_added = treeview_util.create_tag_folder(tag_push, item.name,
                     ($level === $level_expand));
                if(item.sub !== undefined)
                {
                    treeview_util._create_treeview_from_jsondata(tag_folder_added, item.sub,
                         $level+1, $level_expand);
                }
            }else if(item.type === "link"){
                var tag_push = $root.children("div.tree-nav__item:first");
                treeview_util.add_link(tag_push, item.name, item.href);
            }
            else {
                alert("type not define");
            }
        });
    },

    /**================================ Public function ============================= */
    /**
     * Create tree view folder from json data
     * @param {*} $root 
     * @param {*} $items 
     * @param {*} $leve_expand : default close  
     */
    create_treeview_from_json($root, $json_data, $level_expand = -1)
    {
        var level = 0;
        treeview_util._create_treeview_from_jsondata($root, $json_data, level, $level_expand);
    },
}

/** Define export */

export {treeview_util}

