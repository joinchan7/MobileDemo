(function(w) {
    // 注意：箭头函数没有arguments属性，这与他的this指向有关
    w.cg = {};
    w.cg.css = function(node, type, val) {
        if (typeof node === 'object' && typeof node['transform'] === 'undefined') {
            node['transform'] = {};
        }
        if (arguments.length >= 3) {
            let text = '';
            node['transform'][type] = val;

            for (item in node['transform']) {
                // 判断直接属性
                if (node['transform'].hasOwnProperty(item)) {
                    switch (item) {
                        case 'translateX':
                        case 'translateY':
                            text += item + '(' + node['transform'][item] + 'px)';
                            break;
                        case 'scale':
                            text += item + '(' + node['transform'][item] + ')';
                            break;
                        case 'rotate':
                            text += item + '(' + node['transform'][item] + 'deg)';
                            break;
                        default:
                            break;
                    }
                }
            }
            node.style.transform = node.style.webkitTransform = text;
        }
        if (arguments.length === 2) {
            // val==result
            val = node['transform'][type];
            if (val === 'undefined') {
                switch (type) {
                    case 'translateX':
                    case 'translateY':
                    case 'rotate':
                        val = 0;
                        break;
                    case 'scale':
                        val = 1;
                        break;
                    default:
                        break;
                }
            }
            return val;
        }
    };
})(window);
