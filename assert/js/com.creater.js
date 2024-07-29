import { Treeview_Creater } from "./treeview.creater.js";
import { util } from "./util.js";

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
    },
    
    /**
     * fill search result data
     * @param {*} $root_tag 
     * @param {*} $search_key 
     * @param {*} $array_search_result : array object {name, href, date, brief}
     */
    fill_search_result : function($root_tag, $search_key, $array_search_result){
        var tag_list_archives = `<div class="contain-data">
                                <ul class="list-all-articles">
                                </ul>
                            </div>`;

        var search_result_cnt = $array_search_result.length;
        if(search_result_cnt > 0){
            $('h1#contain-result-status').text('Kết quả tìm kiếm')
            var str_result_msg = `Tồn tại ${search_result_cnt} kết quả tìm kiếm cho : "${$search_key}"`
            $('.contain-result-brief').text(str_result_msg);

            $root_tag.append(tag_list_archives);

            $array_search_result.forEach(element => {
                var tag_li_archive =`
                <li>
                    <a href="${element.href}"> ${element.name}</a>
                    <p class="content-brief">${element.brief}<p>
                    <div class=content-ex-info>
                        <time pubdate="pubdate"
                            datetime="2024-07-07T22:00:00+02:00"> ${element.date}
                        </time>
                    </div>
                </li>
                `
                $root_tag.find('.list-all-articles').append(tag_li_archive);
            });
        }
        else{
            $('h1#contain-result-status').text('Không có kết quả tìm kiếm !')
            var str_result_msg = `Kết quả tìm kiếm cho : "${$search_key}"`
            $('.contain-result-brief').text(str_result_msg);
        }
    },
    /**
     * fill archives
     * @param {*} $root_tag 
     * @param {*} $array_post : array object {name, href, date, brief}
     */
    fill_archives : function($root_tag, $array_post){
        $array_post.forEach(element => {
            var tag_img = element.image != "N/A" ? element.image : "assert/image/temp/no_image.jpg";

            var tag_li_archive =`
            <li>
                <a href="${element.href}">${element.name}</a>
                <div class="content-brief">
                        <div class="img-brief">
                            <Img src="${tag_img}"></Img>
                        </div>
                        <p class="text-brief"> ${element.brief}</p>
                </div> 
                <div class=content-ex-info>
                        <time pubdate="pubdate" datetime="2024-07-07T22:00:00+02:00"> ${element.date} </time>
                </div>
            </li>
            `
            $root_tag.append(tag_li_archive);
        });
    }
}

export { common_creater };