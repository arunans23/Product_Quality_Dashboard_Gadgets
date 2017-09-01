var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

var PRODUCT_CHANNEL = "product";
var PRODUCT_VERSION_CHANNEL = "product-version";
var COMPONENT_CHANNEL = "component";
var ISSUE_TYPE_CHANNEL = "issuetype";
var SEVERITY_TYPE_CHANNEL = "severity";
var STATE_CHANNEL = "state";

var currentProduct;
var currentProductVersion;
var currentComponent;
var currentIssueType;
var currentSeverity;

var currentState;


function callbackForStateChannel(state){
    switch(state){
        case '1':
            break;
        case '4':
            break;
        case '12':
            break;
        case '13':
            break;
        case '14':
            break;
        case '41':
            break;
        case '124':
            break;
        case '134':
            break;
        case '154':
            break;
        case '412':
            break;
        case '413':
            break;
        

    }
}


gadgets.HubSettings.onConnect = function () {
                // Subscribe to the product channel.
                gadgets.Hub.subscribe(PRODUCT_CHANNEL, function (topic, message) {
                    //callbackForProductChannels(message);
                    createChart();
                });
                gadgets.Hub.subscribe(PRODUCT_VERSION_CHANNEL, function (topic, message) {
                    //callbackForComponentChannels(message);
                    createChart();
                });
                gadgets.Hub.subscribe(COMPONENT_CHANNEL, function (topic, message) {
                    //callbackForComponentChannels(message);
                    createChart();
                });
                gadgets.Hub.subscribe(COMPONENT_VERSION_CHANNEL, function (topic, message) {
                    //callbackForComponentChannels(message);
                    createChart();
                });
                gadgets.Hub.subscribe(ISSUETYPE_CHANNEL, function (topic, message) {
                    //callbackForComponentChannels(message);
                    createChart();
                });
            };


// var callbackForProductChannels = function (message) {      
//             if (message) {
//                 subscribeData = message;
//                 var statusData = getStatusDetailsByProductName(message);
//                 createChart(issueTypeData);
//             }
           
//         };

// var callbackForComponentChannels = function (message) {        
//             if (message) {
//                 subscribeData = message;
//                 var issueTypeData = getIssueTypeDetailsByComponentName(message);
//                 createChart(issueTypeData);
//             }
           
//         };


// function initChart(response){
//     this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = response.data;
    
//     var subscribeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA[0].name;

//     var issueTypeData = getStatusDetailsByProductName(subscribeData);

//     createChart(issueTypeData);



// }


// function getStatusDetailsByProductName(name){
//     var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.map(function(d){return d['name']}).indexOf(name);
//     return WSO2_PRODUCT_COMPONENT_ISSUES_DATA[index].status;
// }

// function getStatusDetailsByComponentName(name){
//     for (var i = 0; i < WSO2_PRODUCT_COMPONENT_ISSUES_DATA.length; i++) {
//         for (var m = 0; m < WSO2_PRODUCT_COMPONENT_ISSUES_DATA[i].component.length; m++) {
//             if (WSO2_PRODUCT_COMPONENT_ISSUES_DATA[i].component[m].name == name){
//                 debugger;
//                 return WSO2_PRODUCT_COMPONENT_ISSUES_DATA[i].component[m].status;
//             }
//         }
//     }
//     return {};
// }



// function createChart(data){

    
//     // Create the chart
//     Highcharts.chart('container', {
//         chart: {
//             type: 'pie',
//         },
//         credits: {
//             enabled: false
//         },
//         title: {
//             text: "Issues(Open) from Jira by Issue Status"
//         },
//         plotOptions: {
//             series: {
//                 borderWidth: 0,
//                 dataLabels: {
//                     enabled: true,
//                     format: '<b>{point.name}</b>: {point.y}'
//                 }
//             }
//         },

//         tooltip: {
//             headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//             pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
//         },

//         series: [{
//             name: 'Open Issues',
//             colorByPoint: true,
//             data: customiseData(data)
//         }]
        
//     });

//     function customiseData(data){
//         var returnData = [];
//         for (var i = 0; i < data.length; i++) {
//            var current = {name: data[i].name, y: data[i].issues} 
//             returnData.push(current);
//         }
//         return returnData;
//     }

// }

function createChart(){

    
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Issues by IssueType'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'IssueTypes',
            colorByPoint: true,
            data: [{
                name: 'Bug',
                y: 431
            }, {
                name: 'Feature',
                y: 456
            }, {
                name: 'Story',
                y: 456
            }, {
                name: 'Vulnerable',
                y: 132
            }, {
                name: 'Unknown',
                y: 541
            }]
        }]
    });

}