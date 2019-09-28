var color1 = "rgba(255, 99, 132, 1)";
var color2 = "rgba(54, 162, 235, 1)";

// 准备数据
var labels = ["交通工程", "油气储运工程", "土木工程", "其他专业"];
var data1 = [28, 26, 18, 4];
var data2 = [20, 23, 15, 3];
var chartData = {
    // x轴显示的label
    labels: labels,
    datasets: [
        {
            data: data1, // 数据
            label: "申报", // 图例
            backgroundColor: color1,
            borderWidth: 1
        },
        {
            data: data2, // 数据
            label: "入库", // 图例
            backgroundColor: color2,
            borderWidth: 1
        }
    ]
};
// 绘制图表

var ctx = document.getElementById("barChart1").getContext("2d");
var bar = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
        legend: {
            position: "right"
        },
        hover: {
            animationDuration: 0 // 防止鼠标移上去，数字闪烁
        },
        animation: {
            // 这部分是数值显示的功能实现
            onComplete: function() {
                var chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                // 以下属于canvas的属性（font、fillStyle、textAlign...）

                ctx.font = Chart.helpers.fontString(
                    Chart.defaults.global.defaultFontSize,
                    Chart.defaults.global.defaultFontStyle,
                    Chart.defaults.global.defaultFontFamily
                );
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";

                this.data.datasets.forEach(function(dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function(bar, index) {
                        var data = dataset.data[index];
                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    });
                });
            }
        }
    }
});

var color3 = "rgba(130, 224, 170, 1)";
var color4 = "rgba(165, 105, 189, 1)";

// 准备数据
var labels = ["交通工程", "油气储运工程", "土木工程", "其他专业"];
var data1 = [1, 0, 1, 1];
var data2 = [1, 3, 1, 2];
var data3 = [6, 3, 1, 0];
var data4 = [10, 10, 10, 0];
var chartData = {
    // x轴显示的label
    labels: labels,
    datasets: [
        {
            data: data1, // 数据
            label: "国家级", // 图例
            backgroundColor: color1,
            borderWidth: 1
        },
        {
            data: data2, // 数据
            label: "天津市级", // 图例
            backgroundColor: color2,
            borderWidth: 1
        },
        {
            data: data3, // 数据
            label: "校级", // 图例
            backgroundColor: color3,
            borderWidth: 1
        },
        {
            data: data4, // 数据
            label: "天津市级", // 图例
            backgroundColor: color4,
            borderWidth: 1
        }
    ]
};
// 绘制图表
var ctx2 = document.getElementById("barChart2").getContext("2d");
var bar = new Chart(ctx2, {
    type: "bar",
    data: chartData,
    options: {
        legend: {
            position: "right"
        },
        hover: {
            animationDuration: 0 // 防止鼠标移上去，数字闪烁
        },
        animation: {
            // 这部分是数值显示的功能实现
            onComplete: function() {
                var chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                // 以下属于canvas的属性（font、fillStyle、textAlign...）
                ctx.font = Chart.helpers.fontString(
                    Chart.defaults.global.defaultFontSize,
                    Chart.defaults.global.defaultFontStyle,
                    Chart.defaults.global.defaultFontFamily
                );
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";

                this.data.datasets.forEach(function(dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function(bar, index) {
                        var data = dataset.data[index];
                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    });
                });
            }
        }
    }
});
