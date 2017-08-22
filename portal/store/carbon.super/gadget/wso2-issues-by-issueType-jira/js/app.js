var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

PRODUCT_CHANNEL = "product";
COMPONENT_CHANNEL = "component";

gadgets.HubSettings.onConnect = function () {
                // Subscribe to the product channel.
                gadgets.Hub.subscribe(PRODUCT_CHANNEL, function (topic, message) {
                    callbackForProductChannels(message);
                });
                gadgets.Hub.subscribe(COMPONENT_CHANNEL, function (topic, message) {
                    callbackForComponentChannels(message);
                });
            };


var callbackForProductChannels = function (message) {      
            if (message) {
                subscribeData = message;
                var issueTypeData = getIssueTypeDetailsByProductName(message);
                createChart(issueTypeData);
            }
           
        };

var callbackForComponentChannels = function (message) {        
            if (message) {
                subscribeData = message;
                var issueTypeData = getIssueTypeDetailsByComponentName(message);
                createChart(issueTypeData);
            }
           
        };


function initChart(response){
    this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = response.data;
    
    var subscribeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA[0].name;

    var issueTypeData = getIssueTypeDetailsByProductName(subscribeData);

    createChart(issueTypeData);



}


function getIssueTypeDetailsByProductName(name){
    var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.map(function(d){return d['name']}).indexOf(name);
    return WSO2_PRODUCT_COMPONENT_ISSUES_DATA[index].issuetype;
}

function getIssueTypeDetailsByComponentName(name){
    for (var i = 0; i < WSO2_PRODUCT_COMPONENT_ISSUES_DATA.length; i++) {
        for (var m = 0; m < WSO2_PRODUCT_COMPONENT_ISSUES_DATA[i].component.length; m++) {
            if (WSO2_PRODUCT_COMPONENT_ISSUES_DATA[i].component[m].name == name){
                debugger;
                return WSO2_PRODUCT_COMPONENT_ISSUES_DATA[i].component[m].issuetype;
            }
        }
    }
    return {};
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
            text: "Issues (Open) from Jira for selected slice"
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
            data: customiseData(data)
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