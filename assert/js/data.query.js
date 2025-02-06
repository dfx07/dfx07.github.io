import { get_tree_node_type, TreeNodeType } from "./com.def.js";
import { util } from "./util.js";

var data_query = {
    /**
     * Query posts match search key 
     * @param {*} $json_data 
     * @param {*} $search_key 
     * @returns 
     */
    query_archives: function($json_data, $search_key){
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
                var query_result = data_query.query_archives(item.sub, $search_key);
                if(query_result.length > 0)
                    rel_archives.push(...query_result);
            }
        })
        return rel_archives;
    },

    /**
     * Query all post
     * @param {*} $json_data 
     * @returns 
     */
    query_archives_all: function($json_data){
        var rel_archives = [];
        $.each($json_data, function(key, item){
            var item_type = get_tree_node_type(item.type);
    
            if (item_type === TreeNodeType.Link) {
                var _brief = item.hasOwnProperty('brief') ? item.brief : "N/A";
                var _date = item.hasOwnProperty('date') ? item.date : "N/A";
                var _image = item.hasOwnProperty('image') ? item.image : "N/A";
    
                if(_date !== "N/A"){
                    var _dates = new Date(_date);
                    _date = _dates.toUTCString().slice(0, 17);
                }
    
                rel_archives.push({ name : item.name, href : item.href, date : _date, brief : _brief, image : _image });
            }
            if (item.sub != undefined) {
                var query_result = data_query.query_archives_all(item.sub);
                if(query_result.length > 0)
                    rel_archives.push(...query_result);
            }
        })
        return rel_archives;
    },

    /**
     * Query list english to vietnamese
     * @param {*} $json_data 
     * @returns 
     */
    query_list_eng_to_vi: function($json_data){
        var rel_archives = [];

        if($json_data.hasOwnProperty("eng2vi"))
        {
            var eng2vi = $json_data.eng2vi;
            if(eng2vi != undefined && eng2vi.hasOwnProperty("archives"))
            {
                $.each(eng2vi.archives, function(key, item){
                    rel_archives.push({ 
                        ID : item.ID,
                        TY: item.TY,
                        EN : item.EN,
                        VI : item.VI
                    });
                })
            }
        }
        return rel_archives;
    }
}

export { data_query }