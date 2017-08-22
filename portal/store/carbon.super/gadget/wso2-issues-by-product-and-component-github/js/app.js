var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

var PRODUCT_CHANNEL = "product";


function initChart(response){
    this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = response.data;

    

    data = [];
    for (var i = 0; i < WSO2_PRODUCT_COMPONENT_ISSUES_DATA.length; i++) {
        name = WSO2_PRODUCT_COMPONENT_ISSUES_DATA[i].name;
        y = WSO2_PRODUCT_COMPONENT_ISSUES_DATA[i].issues;

        data.push({name: name, y: y});
    }

    createChart(data);
}





function createChart(data){

    
    // Create the chart
    Highcharts.chart('container', {
        chart: {
            type: 'column',
        },
        credits: {
            enabled: false
        },
        title: {
            text: "Product Issues (Open) from Github"
        },
        subtitle: {
            text: 'Click the columns to view component details'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total open github issues'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
        },

        series: [{
            name: 'Open Issues',
            colorByPoint: true,
            data: data,
            events: {
                click: function(e){
                    gadgets.Hub.publish(PRODUCT_CHANNEL, e.point.name);
                }
            }
        }]
        
    });
}
