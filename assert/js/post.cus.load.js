$(function () {
    var data = [
        {
            label: 'node1',
            children: [
                { label: 'child1' },
                { label: 'child2' }
            ]
        },
        {
            label: 'node2',
            children: [
                { label: 'child3' }
            ]
        }
    ];

    $('#archives-tree-list').tree({
        data: data
    });
})