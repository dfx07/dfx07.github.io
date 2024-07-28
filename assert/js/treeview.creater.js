import { get_tree_node_type, TreeNodeType } from "./com.def.js";

/** Define treeview creater */
export const Treeview_Creater = {
    classic : 100,
    confluence : 200
};

var classic_treeview_creater ={
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
            var item_type = get_tree_node_type(item.type);

            if(item_type === TreeNodeType.Folder){
                var tag_push = $root.children("div.tree-nav__item:first");
                var tag_folder_added =
                    classic_treeview_creater.create_tag_folder(
                        tag_push,
                        item.name,
                        $level === $level_expand
                    );

                if(item.sub !== undefined) {
                    classic_treeview_creater._create_treeview_from_jsondata(
                        tag_folder_added,
                        item.sub,
                        $level + 1,
                        $level_expand
                    );
                }
            }else if(item_type === TreeNodeType.Link){
                var tag_push = $root.children("div.tree-nav__item:first");
                classic_treeview_creater.add_link(
                    tag_push,
                    item.name,
                    item.href
                );
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
        classic_treeview_creater._create_treeview_from_jsondata($root, $json_data, level, $level_expand);
    },
}

var confluence_treeview_creater = {

    /**
     * Create node treeview
     * @param {tag} $root_tag : root tag to pushing
     * @param {string} $name : name node tree
     * @param {string} $link : link href
     * @param {boolean} $expandable : expand able
     * @param {boolean} $expand : expand state
     * @Note : Function internal
     */
    create_node_tree : function($root_tag, $name, $link, $expandable = false, $expand = false){
        var str_class_name_expand = '';
        var str_tag_expandable = '';
        var str_tag_icon = '';
        var str_tag_link = '';

        if($expand) str_class_name_expand = ` expanded`;
        if($expandable){
            str_tag_icon = `<div class="side-navigation-expander">
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                        d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z"
                        fill="currentColor" fill-rule="evenodd">
                    </path>
                </svg>
            </div>`;
            str_tag_expandable = `<ul></ul>`;
        }

        if ($link === undefined) {
            str_tag_link = `<a href="#">${$name}</a>`;
        } else {
            str_tag_link = `<a href="${$link}">${$name}</a>`;
        }

        const str_tag_folder = `
                    <li class="expandable${str_class_name_expand}" data-pageid="1157466042">
                        ${str_tag_icon}
                        ${str_tag_link}
                        ${str_tag_expandable}
                    </li>`;

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
            var tag_push = $root.children("ul:first");
            var tag_node_tree =
                confluence_treeview_creater.create_node_tree(
                    tag_push,
                    item.name,
                    item.href,
                    item.sub !== undefined,
                    $level === $level_expand
                );

            if(item.sub !== undefined) {
                confluence_treeview_creater._create_treeview_from_jsondata(
                    tag_node_tree,
                    item.sub,
                    $level + 1,
                    $level_expand
                );
            }
        });
    },

    load_event_handle : function(){
        $(".side-navigation-expander").on("click", function(){
            let n = $(this).parent("li");
            n.hasClass("expanded") ? (n.removeClass("expanded"),
            n.find("li").removeClass("expanded")) : n.addClass("expanded")
        });
    },

    create_treeview_from_json : function($root, $json_data, $level_expand = -1){
        var level = 0;
        confluence_treeview_creater._create_treeview_from_jsondata(
            $root,
            $json_data,
            level,
            $level_expand
        );
    }
}

var treeview_setter ={
    _make_node_open : function($root, $str_link){
        var make_set = false;
        $root.children('li').each(function(){
            var current = $(this)
            var str_href = $(current).children('a').attr('href');
            if($str_link.indexOf(str_href) != -1)  {
                $(current).addClass('expanded-current-item');
                return make_set = true;
            }

            var node_children = $(current).children('ul');
            if( true == treeview_setter._make_node_open(node_children, $str_link)) {
                $(current).addClass('expanded expanded-current-node');
                return make_set = true;
            }
        });

        return make_set;
    }
}

export { classic_treeview_creater };
export { confluence_treeview_creater };
export { treeview_setter };