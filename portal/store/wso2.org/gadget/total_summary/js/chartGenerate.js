
//generate different charts such as PIE,BAR, COLUMN charts from drop down

function changeGraph(val) {
    var type = val;
    console.log(summaryArray)
    Highcharts.chart('graphDiv', {
        chart: {
            type: type
        },
        title: {
            text: 'Total Patch summary in WSO2, Since 2015 to today'
        },
        subtitle: {
            text: 'Click the columns to view more details..'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total patch count'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name} Summary</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of Total<br/>'
        },

        series: [{
            name: 'Patch',
            colorByPoint: true,
            data: summaryArray
        }],
        drilldown: {
            series: drillDown
        }
    });
}
