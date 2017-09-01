var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

var PRODUCT_CHANNEL = "product";
var PRODUCT_VERSION_CHANNEL = "product-version";




// function initChart(response){
//     this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = response.data;

    

//     data = [];
//     for (var i = 0; i < WSO2_PRODUCT_COMPONENT_ISSUES_DATA.length; i++) {
//         name = WSO2_PRODUCT_COMPONENT_ISSUES_DATA[i].name;
//         y = WSO2_PRODUCT_COMPONENT_ISSUES_DATA[i].issues;

//         data.push({name: name, y: y});
//     }

//     createChart(data);
// }





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
        title: {
            text: 'Products'
        },
        subtitle: {
            text: 'Click the columns to view versions.'
        },
        credits: {
            text: "source : github"
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

        series: [{
            name: 'Products',
            colorByPoint: true,
            data: [{
                name: 'ESB',
                y: 234,
                drilldown: 'ESB'
            }, {
                name: 'IS',
                y: 251,
                drilldown: 'IS'
            }, {
                name: 'APIM',
                y: 134,
                drilldown: 'APIM'
            }, {
                name: 'DAS',
                y: 100,
                drilldown: 'DAS'
            }, {
                name: 'IOT',
                y: 201,
                drilldown: 'IOT'
            }],
            events: {
                click: function(e){
                    gadgets.Hub.publish(PRODUCT_CHANNEL, e.point.name);
                }
            }
        }],
        drilldown: {
            series: [{
                name: 'ESB',
                id: 'ESB',
                data: [
                    [
                        'v11.0',
                        24.13
                    ],
                    [
                        'v8.0',
                        17.2
                    ],
                    [
                        'v9.0',
                        8.11
                    ],
                    [
                        'v10.0',
                        5.33
                    ],
                    [
                        'v6.0',
                        1.06
                    ],
                    [
                        'v7.0',
                        0.5
                    ]
                ],
                events: {
                    click: function(e){
                        gadgets.Hub.publish(PRODUCT_VERSION_CHANNEL, e.point.name);
                    }
                }
            }, {
                name: 'IS',
                id: 'IS',
                data: [
                    [
                        'v40.0',
                        5
                    ],
                    [
                        'v41.0',
                        4.32
                    ],
                    [
                        'v42.0',
                        3.68
                    ],
                    [
                        'v39.0',
                        2.96
                    ],
                    [
                        'v36.0',
                        2.53
                    ],
                    [
                        'v43.0',
                        1.45
                    ],
                    [
                        'v31.0',
                        1.24
                    ],
                    [
                        'v35.0',
                        0.85
                    ],
                    [
                        'v38.0',
                        0.6
                    ],
                    [
                        'v32.0',
                        0.55
                    ],
                    [
                        'v37.0',
                        0.38
                    ],
                    [
                        'v33.0',
                        0.19
                    ],
                    [
                        'v34.0',
                        0.14
                    ],
                    [
                        'v30.0',
                        0.14
                    ]
                ],
                events: {
                    click: function(e){
                        gadgets.Hub.publish(PRODUCT_VERSION_CHANNEL, e.point.name);
                    }
                }
            }, {
                name: 'APIM',
                id: 'APIM',
                data: [
                    [
                        'v35',
                        2.76
                    ],
                    [
                        'v36',
                        2.32
                    ],
                    [
                        'v37',
                        2.31
                    ],
                    [
                        'v34',
                        1.27
                    ],
                    [
                        'v38',
                        1.02
                    ],
                    [
                        'v31',
                        0.33
                    ],
                    [
                        'v33',
                        0.22
                    ],
                    [
                        'v32',
                        0.15
                    ]
                ],
                events: {
                    click: function(e){
                        gadgets.Hub.publish(PRODUCT_VERSION_CHANNEL, e.point.name);
                    }
                }
            }, {
                name: 'DAS',
                id: 'DAS',
                data: [
                    [
                        'v8.0',
                        2.56
                    ],
                    [
                        'v7.1',
                        0.77
                    ],
                    [
                        'v5.1',
                        0.42
                    ],
                    [
                        'v5.0',
                        0.3
                    ],
                    [
                        'v6.1',
                        0.29
                    ],
                    [
                        'v7.0',
                        0.26
                    ],
                    [
                        'v6.2',
                        0.17
                    ]
                ],
                events: {
                    click: function(e){
                        gadgets.Hub.publish(PRODUCT_VERSION_CHANNEL, e.point.name);
                    }
                }
            }, {
                name: 'IOT',
                id: 'IOT',
                data: [
                    [
                        'v12.x',
                        0.34
                    ],
                    [
                        'v28',
                        0.24
                    ],
                    [
                        'v27',
                        0.17
                    ],
                    [
                        'v29',
                        0.16
                    ]
                ],
                events: {
                    click: function(e){
                        gadgets.Hub.publish(PRODUCT_VERSION_CHANNEL, e.point.name);
                    }
                }
            }]
        }
    });   
}
