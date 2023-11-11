
var all_post_loader ={
    /**
     * Add all post index panel
     * @param {*} $root_tag 
     * Note : Function internal  
     */
    add_all_post : function($root_tag){
        const str_div_all_post ='<div class="articles">\
                                    <div class="archives-header">\
                                        <span><b>Danh mục bài viết</b></span>\
                                    </div>\
                                <div class="archives-list">\
                                    <nav class="tree-nav">\
                                        <div class="tree-nav__item"></div>\
                                    </nav>\
                                </div>\
                            </div>';

        $root_tag.prepend(str_div_all_post);
    },

    add_table_of_content: function($root_tag){
        const str_div_table_of_content= '<div class="articles article-table-of-contents">\
                                            <div class="archives-header">\
                                                <span><b>Mục lục</b></span>\
                                            </div>\
                                            <div class="archives-table-of-contents">\
                                                <md-block src="content_index.md"></md-block>\
                                            </div>\
                                        </div>';
        $root_tag.append(str_div_table_of_content);                                  
    }
}

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

var src_loader ={

    /**================================ Public function ============================= */
    /**
     * Load css file
     * @param {*} $root_path : path load
     * @param {*} $obj_type_src : object = {mediatype + src filename}
     */
    load_css : function($root_path, $arr_objCssNsrc){

        $.each($arr_objCssNsrc, function(index, objCssIf){
            var css_tag = document.createElement("link");
            css_tag.href = $root_path + objCssIf.src;
            css_tag.rel = "stylesheet";
            css_tag.style = "text/css"
            if(objCssIf.media != undefined){
                css_tag.media = objCssIf.media;
            }
    
            $("head").append(css_tag); 
        });
    },

    load_js : function($root_path, $arr_objJsNsrc){

        $.each($arr_objJsNsrc, function(index, objJsIf){
            var js_tag = document.createElement("script");
            if(objJsIf.type != undefined){
                js_tag.type = objJsIf.type;
            }
            js_tag.src =  $root_path + objJsIf.src;
            $("head").append(js_tag); 
        });
    },
}

/** Define export */

export {treeview_util}
export {src_loader}
export {all_post_loader}

