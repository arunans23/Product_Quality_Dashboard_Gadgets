var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

var PRODUCT_CHANNEL = "product";
var PRODUCT_VERSION_CHANNEL = "product-version";
var COMPONENT_CHANNEL = "component";
var ISSUETYPE_CHANNEL = "issue-type";
var SEVERITY_CHANNEL = "severity";

var PRODUCT_STATE_CHANNEL = "product-state";
var COMPONENT_STATE_CHANNEL = "component-state";
var ISSUETYPE_STATE_CHANNEL = "issuetype-state";
var SEVERITY_STATE_CHANNEL = "severity-state";

var currentProduct;
var currentProductVersion;
var currentComponent;
var currentIssueType;
var currentSeverity;

var currentState;

var currentSeriesData;

var currentChartTitle;

gadgets.HubSettings.onConnect = function () {
                gadgets.Hub.subscribe(COMPONENT_STATE_CHANNEL, function(topic, message) {
                    if (message){
                        currentState = message;
                        callbackForStateChannel(message);
                    }
                });
                gadgets.Hub.subscribe(ISSUETYPE_STATE_CHANNEL, function(topic, message) {
                    if (message){
                        currentState = message;
                        callbackForStateChannel(message);
                    }
                });
                gadgets.Hub.subscribe(SEVERITY_STATE_CHANNEL, function(topic, message) {
                    if (message){
                        currentState = message;
                        callbackForStateChannel(message);
                    }
                });
                // Subscribe to the product channel
                gadgets.Hub.subscribe(PRODUCT_CHANNEL, function (topic, message){
                    if(message){
                        currentProduct = message;
                    }
                });
                // Subscribe to the severity channel.
                gadgets.Hub.subscribe(SEVERITY_CHANNEL, function (topic, message) {
                    //callbackForChannels(message);
                    if (message){
                        currentSeverity =  message;
                    }
                });
                //Subscribe to the issuetype channel
                gadgets.Hub.subscribe(ISSUETYPE_CHANNEL, function (topic, message) {
                    //callbackForChannels(message);
                    if (message){
                        currentIssueType = message;
                    }
                });
            };

function initChart(){
    this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = response;
    currentState = '0';
    callbackForStateChannel(currentState);
}


function callbackForStateChannel(state){
    switch(state){
        case '0':
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                seriesData = [];
                for (var i = 0; i < productsData.length; i++){
                    name= productsData[i].name;
                    y= productsData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "Products", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                        click: function(e){
                                            gadgets.Hub.publish(PRODUCT_CHANNEL, e.point.name);
                                            gadgets.Hub.publish(PRODUCT_STATE_CHANNEL, "1");
                                            currentProduct = e.point.name;
                                            currentState = "1";
                                            callbackForStateChannel(currentState);
                                        }
                                    }}];

                        currentChartTitle = "Products";
                        createChart();
            break;
        case '1':
            if (currentProduct){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
                var productVersionData = productsData[index].version;
                seriesData = [];
                for (var i = 0; i < productVersionData.length; i++){
                    name= productVersionData[i].name;
                    y= productVersionData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "Product Versions", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(PRODUCT_VERSION_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(PRODUCT_STATE_CHANNEL, "12");
                                                currentState = "12";
                                                currentProduct = e.point.name;
                                        }
                                    }}];

                currentChartTitle = '<span onclick= "initChart()">Product</span> ' + currentProduct;
                createChart();
            }

            break;

        case '4':
            break;
        case '5':
            break;
        case '14':
            break;
        case '15':
            break;
        case '41':
            break;
        case '45':
            break;
        case '51':
            break;
        case '54':
            break;
        case '135':
            break;
        case '145':
            break;
        case '415':
            break;
        case '451':
            break;
        case '541':
            break;

    }
}





// function createChart(data){

    
//     // Create the chart
//     Highcharts.chart('container', {
//         chart: {
//             type: 'column',
//         },
//         credits: {
//             enabled: false
//         },
//         title: {
//             text: "Product Issues (Open) from Github"
//         },
//         subtitle: {
//             text: 'Click the columns to view component details'
//         },
//         xAxis: {
//             type: 'category'
//         },
//         yAxis: {
//             title: {
//                 text: 'Total open github issues'
//             }

//         },
//         legend: {
//             enabled: false
//         },
//         plotOptions: {
//             series: {
//                 borderWidth: 0,
//                 dataLabels: {
//                     enabled: true
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
//             data: data,
//             events: {
//                 click: function(e){
//                     gadgets.Hub.publish(PRODUCT_CHANNEL, e.point.name);
//                 }
//             }
//         }]
        
//     });
// }

function createChart(){

    // Create the chart
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        credits:{
            text: 'source: jira'
        },
        title: {
            text: currentChartTitle,
            widthAdjust: -100,
            style: {
                fontSize : '14px'
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total open issues'
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
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}'
        },

        series: currentSeriesData,
        lang: {
            backTitle : "Reset Charts"
        },
        exporting: {
            buttons: {
                customButton: {
                    symbol: 'circle',
                    symbolStrokeWidth: 1,
                    symbolFill: '#a4edba',
                    symbolStroke: '#330033',
                    _titleKey: 'backTitle',
                    onclick: function() {
                        initChart();
                        gadgets.Hub.publish(PRODUCT_STATE_CHANNEL, "0");
                    }
                }
            }   
        }
    });   
}
