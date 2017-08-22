var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

PRODUCT_CHANNEL = "product";
COMPONENT_CHANNEL = "component";

gadgets.HubSettings.onConnect = function () {
                // Subscribe to the product channel.
                gadgets.Hub.subscribe(PRODUCT_CHANNEL, function (topic, message) {
                    callbackForChannels(message);
                });
            };


var callbackForChannels = function (message) {        
            if (message) {
                subscribeData = message;
                var componentData = getComponentDetailsByProductName(message);
                createChart(componentData);
            }
           
        };


function initChart(response){
    this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = response.data;
    
    var subscribeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA[0].name;

    var componentData = getComponentDetailsByProductName(subscribeData);

    createChart(componentData);



}


function getComponentDetailsByProductName(name){
    var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.map(function(d){return d['name']}).indexOf(name);
    return WSO2_PRODUCT_COMPONENT_ISSUES_DATA[index].component;
}



function createChart(data){

    
    // Create the chart
    Highcharts.chart('container', {
        chart: {
            type: 'pie',
        },
        credits: {
            enabled: false
        },
        title: {
            text: "Component Issues (Open) from Jira for selected column"
        },
        subtitle: {
            text: 'Click the slices to view component details'
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
            data: customiseData(data),
            events: {
                click: function(e){
    
                    gadgets.Hub.publish(COMPONENT_CHANNEL, e.point.name);
                }
            }
        }]
        
    });

    function customiseData(data){
        var returnData = [];
        for (var i = 0; i < data.length; i++) {
           var current = {name: data[i].name, y: data[i].issues} 
            returnData.push(current);
        }
        return returnData;
    }

}