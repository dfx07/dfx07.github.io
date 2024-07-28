import { base_loader } from "./base.cus.load.js";
import { get_tree_node_type, TreeNodeType } from "./com.def.js";
import { util } from "./util.js";

function query_archives($json_data, $search_key){
    var rel_archives = [];
    $.each($json_data, function(key, item){
        var item_type = get_tree_node_type(item.type);

        if (item_type === TreeNodeType.Link && (util.is_contain_key_nocase(item.name, $search_key) ||
            ( item.hasOwnProperty('brief') && util.is_contain_key_nocase(item.href, $search_key)))) {

            var _brief = item.hasOwnProperty('brief') ? item.brief : "N/A";
            var _date = item.hasOwnProperty('date') ? item.date : "N/A";

            if(_date !== "N/A"){
                var _dates = new Date(_date);
                _date = _dates.toUTCString().slice(0, 17);
            }

            rel_archives.push({ name : item.name, href : item.href, date : _date, brief : _brief });
        }
        if (item.sub != undefined) {
            var query_result = query_archives(item.sub, $search_key);
            if(query_result.length > 0)
                rel_archives.push(...query_result);
        }
    })
    return rel_archives;
};

function get_archives_search($search_json_data, $search_key){
    return query_archives($search_json_data, $search_key);
};

/**
 * fill search result data
 * @param {*} $root_tag 
 * @param {*} $search_key 
 * @param {*} $result_search : {name} | {href} | {brief}
 */
function fill_search_result($root_tag, $search_key, $result_search){
    var tag_list_archives = `<div class="contain-data">
                            <ul class="list-all-articles">
                            </ul>
                        </div>`;

    var search_result_cnt = $result_search.length;
    if(search_result_cnt > 0){
        $('h1#contain-result-status').text('Kết quả tìm kiếm')
        var str_result_msg = `Tồn tại ${search_result_cnt} kết quả tìm kiếm cho : "${$search_key}"`
        $('.contain-result-brief').text(str_result_msg);

        $root_tag.append(tag_list_archives);

        $result_search.forEach(element => {
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
}

$(function () {
    
    base_loader.load_common();
    var search_key = util.get_param_current_url('q');

    $.getJSON("./post/tree-archives.json", function(json_data){
        var tree_archives = json_data.archives;
        var rel_archives = get_archives_search(tree_archives, search_key);


        fill_search_result($('.container-content'), search_key, rel_archives);
    }).fail(function()
    {
        alert("An error has accurred.");
    })
});