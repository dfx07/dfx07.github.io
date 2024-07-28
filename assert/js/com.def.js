/* Define Page type */
export const PageType = {
    Common: 1,
    Post: 2,
};

/* Define Node type */
export const TreeNodeType ={
    Folder: 0,
    Link : 1
}

export function get_tree_node_type(str_tree_node_type){
    var str = str_tree_node_type.toLowerCase().replace(/\s+/g, '');
    if(str === 'link' ){
        return TreeNodeType.Link;
    }
    return TreeNodeType.Folder;
}