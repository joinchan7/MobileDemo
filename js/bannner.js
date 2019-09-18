function byId(id) {
    return typeof id === "string" ? document.getElementById(id) : id;
}

// 全局变量
var index = 0,
    timer = null,
    pics = byId("banner-box").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    prev = byId("prev"),
    next = byId("next"),
    len = pics.length;

function slideImg() {
    var banner = byId("banner");
    // 滑过清除定时器,离开继续
    banner.onmouseover = function() {
        // 滑过清除定时器
        if (timer) clearInterval(timer);
    };
    banner.onmouseout = function() {
        timer = setInterval(function() {
            index++;
            if (index >= len) {
                index = 0;
            }
            changeImg();
        }, 3000);
    };
    //自动在banner上触发鼠标离开事件
    banner.onmouseout();

    //遍历所有点击,且绑定点击事件,点击圆点切换图片
    for (var d = 0; d < len; d++) {
        dots[d].id = d;
        dots[d].onclick = function() {
            //改变index为当前span的索引
            index = this.id;
            changeImg();
        };
    }
    next.onclick = function() {
        index++;
        if (index >= len) index = 0;
        changeImg();
    };
    prev.onclick = function() {
        index--;
        if (index < 0) index = len - 1;
        changeImg();
    };
}

function changeImg() {
    for (var i = 0; i < len; i++) {
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    pics[index].style.display = "block";
    dots[index].className = "active";
}

slideImg();
