(w => {
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
            if (typeof val === 'undefined') {
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
    w.cg.carousel = function(arr) {
        const carouselWrap = document.querySelector('.carousel-wrap');
        if (carouselWrap) {
            /* 无缝 */
            const pointsLength = arr.length;
            // 判断是否存在needCarousel

            if (carouselWrap.hasAttribute('needCarousel')) {
                arr = arr.concat(arr);
            }
            /* 或者：let needCarousel = carouselWrap.getAttribute('needCarousel');
            needCarousel = needCarousel === null ? false : true; */

            /* 布局 */
            const ulNode = document.createElement('ul');
            const styleNode = document.createElement('style');
            // 给创建的.list添加list属性
            ulNode.classList.add('list');
            for (let i = 0; i < arr.length; i++) {
                ulNode.innerHTML += '<li><a href="javascript:;"><img src="' + arr[i] + '" alt="" /></a></li>';
            }
            styleNode.innerHTML =
                '.carousel-wrap > .list > li {width: ' +
                (1 / arr.length) * 100 +
                '%;}.carousel-wrap > .list {width: ' +
                arr.length * 100 +
                '%;}';
            carouselWrap.appendChild(ulNode);
            document.head.appendChild(styleNode);

            const imgNode = document.querySelector('.carousel-wrap > .list > li > a > img');
            setTimeout(() => {
                carouselWrap.style.height = imgNode.offsetHeight + 'px';
            }, 100);
            /* 小圆点 */
            const pointsWrap = document.querySelector('.carousel-wrap > .points-wrap');
            if (pointsWrap) {
                for (let i = 0; i < pointsLength; i++) {
                    if (i === 0) {
                        pointsWrap.innerHTML += '<span class="active"></span>';
                    } else {
                        pointsWrap.innerHTML += '<span></span>';
                    }
                }
            }
            // 拿到小圆点
            const pointsSpan = document.querySelectorAll('.carousel-wrap > .points-wrap > span');

            /* 滑屏 */
            /* 
                1.拿到元素开始的位置
                2.拿到手指开始点击的位置
                3.拿到手指move距离
                4.将手指移动的距离加给元素
             */
            let startX = 0;
            let elementX = 0;
            let index = 0;
            // 用translateX记录偏移量
            // let translateX = 0;
            // 处理偏移量：抽象图片索引
            carouselWrap.addEventListener('touchstart', ev => {
                ev = ev || event;
                const TouchC = ev.changedTouches[0];
                // 清除transition
                ulNode.style.transition = 'none';

                /* 无缝 */
                // ulPosition:ul的位置
                if (carouselWrap.hasAttribute('needCarousel')) {
                    let ulPosition = cg.css(ulNode, 'translateX') / document.documentElement.clientWidth;
                    if (-ulPosition === 0) {
                        ulPosition = -pointsLength;
                    }
                    if (-ulPosition === arr.length - 1) {
                        ulPosition = -(pointsLength - 1);
                    }
                    cg.css(ulNode, 'translateX', ulPosition * document.documentElement.clientWidth);
                }

                startX = TouchC.clientX;
                elementX = cg.css(ulNode, 'translateX');
                // 清除定时器
                clearInterval(timer);
            });

            carouselWrap.addEventListener('touchmove', ev => {
                ev = ev || event;
                const TouchC = ev.changedTouches[0];
                const nowX = TouchC.clientX;
                const disX = nowX - startX;
                cg.css(ulNode, 'translateX', elementX + disX);
            });

            carouselWrap.addEventListener('touchend', ev => {
                ev = ev || event;
                // ul相对于屏幕的的实时位置，index为图片索引的相反数
                index = cg.css(ulNode, 'translateX') / document.documentElement.clientWidth;
                // 1/2跳转
                index = Math.round(index);
                // 滑动超出控制
                if (index > 0) {
                    index = 0;
                }
                if (index < 1 - arr.length) {
                    index = 1 - arr.length;
                }
                // 处理滑动时小圆点的变化
                circle(index);
                // 加切换过渡
                ulNode.style.transition = '.5s transform';
                cg.css(ulNode, 'translateX', index * document.documentElement.clientWidth);
                // 开启定时器
                if (carouselWrap.hasAttribute('needAuto')) {
                    auto();
                }
            });

            /* 自动轮播 */
            let timer;
            if (carouselWrap.hasAttribute('needAuto')) {
                auto();
            }

            function auto() {
                clearInterval(timer);
                timer = setInterval(() => {
                    if (index === 1 - arr.length) {
                        ulNode.style.transition = '';
                        index = 1 - arr.length / 2;
                        cg.css(ulNode, 'translateX', index * document.documentElement.clientWidth);
                    }
                    setTimeout(() => {
                        index--;
                        ulNode.style.transition = '1s transform';
                        circle(index);
                        cg.css(ulNode, 'translateX', index * document.documentElement.clientWidth);
                    }, 50);
                }, 2000);
            }
            function circle(index) {
                if (!pointsWrap) {
                    return;
                }
                for (let i = 0; i < pointsSpan.length; i++) {
                    pointsSpan[i].classList.remove('active');
                }
                pointsSpan[-index % pointsLength].classList.add('active');
            }
        }
    };
})(window);
