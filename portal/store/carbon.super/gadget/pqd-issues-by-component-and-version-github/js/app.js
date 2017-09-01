var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

PRODUCT_CHANNEL = "product";
PRODUCT_VERSION_CHANNEL = "product-version";
COMPONENT_CHANNEL = "component";
COMPONENT_VERSION_CHANNEL = "component-version";
ISSUETYPE_CHANNEL = "issue-type";

gadgets.HubSettings.onConnect = function () {
                // Subscribe to the product channel.
                gadgets.Hub.subscribe(PRODUCT_CHANNEL, function (topic, message) {
                    createChart(message);
                    //appendPath(message);
                });
                gadgets.Hub.subscribe(PRODUCT_VERSION_CHANNEL, function (topic, message) {
                    // callbackForChannels(message);
                    createChart(message);
                    //appendPath(message);
                });
                gadgets.Hub.subscribe(ISSUETYPE_CHANNEL, function (topic, message) {
                    // callbackForChannels(message);
                    createChart(message);
                    //appendPath(message);
                });
            };


// var callbackForChannels = function (message) {        
//             if (message) {
//                 subscribeData = message;
//                 var componentData = getComponentDetailsByProductName(message);
//                 createChart(componentData);
//             }
           
//         };


// function initChart(response){
//     this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = response.data;
    
//     var subscribeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA[0].name;

//     var componentData = getComponentDetailsByProductName(subscribeData);

//     createChart(componentData);



// }


// function getComponentDetailsByProductName(name){
//     var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.map(function(d){return d['name']}).indexOf(name);
//     return WSO2_PRODUCT_COMPONENT_ISSUES_DATA[index].component;
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
//             text: "Component Issues (Open) from Github for selected column"
//         },
//         subtitle: {
//             text: 'Click the slices to view component details'
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
//             data: customiseData(data),
//             events: {
//                 click: function(e){
    
//                     gadgets.Hub.publish(COMPONENT_CHANNEL, e.point.name);
//                 }
//             }
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


function createChart(title){

    var titleText = "Components";

    if(title){
        titleText += " " + title;
    }

    
    // Create the chart
    Highcharts.chart('container', {
        chart: {
            type: 'pie'
        },
        credits: {
            text: "source : github"
        },
        title: {
            text: titleText
        },
        subtitle: {
            text: 'Click the slices to view versions.'
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

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>'
        },
        series: [{
            name: 'Components',
            colorByPoint: true,
            data: [{
                name: 'product-esb',
                y: 235,
                drilldown: 'product-esb'
            }, {
                name: 'wso2-synapse',
                y: 456,
                drilldown: 'wso2-synapse'
            }, {
                name: 'wso2-ode',
                y: 541,
                drilldown: 'wso2-ode'
            }, {
                name: 'maven-tools',
                y: 231,
                drilldown: 'maven-tools'
            }, {
                name: 'cloud-dev-studio',
                y: 100,
                drilldown: 'cloud-dev-studio'
            }, {
                name: 'Unknown',
                y: 600,
                drilldown: null
            }],
            events: {
                click: function(e){
                    gadgets.Hub.publish(COMPONENT_CHANNEL, e.point.name);
                }
            }
        }],
        drilldown: {
            series: [{
                name: 'product-esb',
                id: 'product-esb',
                data: [
                    ['v11.0', 24.13],
                    ['v8.0', 17.2],
                    ['v9.0', 8.11],
                    ['v10.0', 5.33],
                    ['v6.0', 1.06],
                    ['v7.0', 0.5]
                ],
                events: {
                click: function(e){
                    gadgets.Hub.publish(COMPONENT_VERSION_CHANNEL, e.point.name);
                    appendPath(e.point.name);
                }
            }
            }, {
                name: 'wso2-synapse',
                id: 'wso2-synapse',
                data: [
                    ['v40.0', 5],
                    ['v41.0', 4.32],
                    ['v42.0', 3.68],
                    ['v39.0', 2.96],
                    ['v36.0', 2.53],
                    ['v43.0', 1.45],
                    ['v31.0', 1.24],
                    ['v35.0', 0.85],
                    ['v38.0', 0.6],
                    ['v32.0', 0.55],
                    ['v37.0', 0.38],
                    ['v33.0', 0.19],
                    ['v34.0', 0.14],
                    ['v30.0', 0.14]
                ],
                events: {
                click: function(e){
                    gadgets.Hub.publish(COMPONENT_VERSION_CHANNEL, e.point.name);
                }
            }
            }, {
                name: 'wso2-ode',
                id: 'wso2-ode',
                data: [
                    ['v35', 2.76],
                    ['v36', 2.32],
                    ['v37', 2.31],
                    ['v34', 1.27],
                    ['v38', 1.02],
                    ['v31', 0.33],
                    ['v33', 0.22],
                    ['v32', 0.15]
                ],
                events: {
                click: function(e){
                    gadgets.Hub.publish(COMPONENT_VERSION_CHANNEL, e.point.name);
                }
            }
            }, {
                name: 'maven-tools',
                id: 'maven-tools',
                data: [
                    ['v8.0', 2.56],
                    ['v7.1', 0.77],
                    ['v5.1', 0.42],
                    ['v5.0', 0.3],
                    ['v6.1', 0.29],
                    ['v7.0', 0.26],
                    ['v6.2', 0.17]
                ],
                events: {
                click: function(e){
                    gadgets.Hub.publish(COMPONENT_VERSION_CHANNEL, e.point.name);
                }
            }
            }, {
                name: 'cloud-dev-studio',
                id: 'cloud-dev-studio',
                data: [
                    ['v12.x', 0.34],
                    ['v28', 0.24],
                    ['v27', 0.17],
                    ['v29', 0.16]
                ],
                events: {
                click: function(e){
                    gadgets.Hub.publish(COMPONENT_VERSION_CHANNEL, e.point.name);
                }
            }
            }]
        }
    });

    

}

function appendPath(appendData){
    document.getElementById('path-container').innerHTML += " &middot; " + appendData;
}