import { Treeview_Creater } from "./treeview.creater.js";

var common_creater ={
    /**
     * Add all post index panel
     * @param {*} $root_tag 
     * Note : Function internal  
     */
    create_all_post : function($root_tag, $enum_treeview_type = Treeview_Creater.classic){
        let str_div_all_post = ``;
        
        if ($enum_treeview_type === Treeview_Creater.classic) {
            str_div_all_post = `<div class="articles">
                                    <div class="archives-header">
                                        <span><b>Danh mục bài viết</b></span>
                                    </div>
                                    <div class="archives-list">
                                        <nav class="tree-nav">
                                            <div class="tree-nav__item"></div>
                                        </nav>
                                    </div>
                                </div>`;
        } else if ($enum_treeview_type === Treeview_Creater.confluence) {
            str_div_all_post = `<div class="articles">
                                    <div class="archives-header">
                                        <span><b>Danh mục bài viết</b></span>
                                    </div>
                                    <div class="archives-list">
                                        <nav class="tree-nav">
                                            <div class="tree-nav__item">
                                                <div class="side-navigation-scrollable-list">
                                                    <ul></ul>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </div>`;
        }

        $root_tag.prepend(str_div_all_post);
    },

    create_table_of_content: function($root_tag){
        const str_div_table_of_content= `<div class="articles article-table-of-contents">
                                            <div class="archives-header">
                                                <span><b>Mục lục</b></span>
                                            </div>
                                            <div class="archives-table-of-contents">
                                                <md-block src="content_index.md"></md-block>
                                            </div>
                                        </div>`;
        $root_tag.append(str_div_table_of_content);                                  
    }
}

export { common_creater };