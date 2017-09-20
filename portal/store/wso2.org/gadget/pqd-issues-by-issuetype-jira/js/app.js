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

var ISSUESDATA_CHANNEL = "issues-data";

var currentProduct;
var currentProductVersion;
var currentComponent;
var currentIssueType;
var currentSeverity;

var currentState;

var currentSeriesData;

var currentChartTitle;

gadgets.HubSettings.onConnect = function () {
                gadgets.Hub.subscribe(PRODUCT_STATE_CHANNEL, function(topic, message) {
                    if (message){
                        currentState = message;
                        callbackForStateChannel(message);
                    }
                });
                gadgets.Hub.subscribe(COMPONENT_STATE_CHANNEL, function(topic, message) {
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
                //Subscribe to the product version channel
                gadgets.Hub.subscribe(PRODUCT_VERSION_CHANNEL, function(topic, message){
                    if(message){
                        currentProductVersion = message;
                    }
                })
                // Subscribe to the severity channel.
                gadgets.Hub.subscribe(COMPONENT_CHANNEL, function (topic, message) {
                    //callbackForChannels(message);
                    if(message){
                        currentComponent = message;
                    }
                });
                //Subscribe to the issuetype channel
                gadgets.Hub.subscribe(SEVERITY_CHANNEL, function (topic, message) {
                    //callbackForChannels(message);
                    if (message){
                        currentSeverity = message;
                    }
                });
                gadgets.Hub.subscribe(ISSUESDATA_CHANNEL, function(topic, message){
                    if(message){
                        initChart(message);
                    }
                });
            };

function initChart(responseData){
    this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = responseData;
    currentState = '0';
    callbackForStateChannel(currentState);
}


function callbackForStateChannel(state){
    switch(state){
        case '0':
            issueTypeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype;
            seriesData = [];
            for (var i = 0; i < issueTypeData.length; i++){
                name = issueTypeData[i].name;
                y = issueTypeData[i].issues;

                seriesData.push({name: name, y: y});
            }

            currentSeriesData = [{
                                    name: "IssueType", 
                                    colorByPoint: true, data: seriesData,
                                    events: {
                                    click: function(e){
                                        gadgets.Hub.publish(ISSUETYPE_CHANNEL, e.point.name);
                                        gadgets.Hub.publish(ISSUETYPE_STATE_CHANNEL, "4");
                                        currentIssueType = e.point.name;
                                        currentState = "4";
                                        callbackForStateChannel(currentState);
                                    }
                                }}];

            currentChartTitle = "";
            createChart();
            break;

        case '1':
            if (currentProduct){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
                var productIssuetypeData = productsData[index].issuetype;
                seriesData = [];
                for (var i = 0; i < productIssuetypeData.length; i++){
                    name = productIssuetypeData[i].name;
                    y = productIssuetypeData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "IssueType", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(ISSUETYPE_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(ISSUETYPE_STATE_CHANNEL, "14");
                                                currentState = "14";
                                                currentIssueType = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "under " + currentProduct;
                createChart();
            }
            break;

        case '5':
            if (currentSeverity){
                severityData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.severity;
                var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.severity.map(function(d){return d['name']}).indexOf(currentSeverity);
            
                var severityIssueTypeData = severityData[index].issuetype;
                seriesData = [];
                for (var i = 0; i < severityIssueTypeData.length; i++){
                    name = severityIssueTypeData[i].name;
                    y = severityIssueTypeData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "IssueType", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(ISSUETYPE_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(ISSUETYPE_STATE_CHANNEL, "55");
                                                currentState = "54";
                                                currentIssueType = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "of severity '" + currentSeverity + "'";
                createChart();
            }
            break;
            break;
        case '12':
            if (currentProduct && currentProductVersion){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
                var productVersionData = productsData[productIndex].version;
                var productVersionIndex = productVersionData.map(function(d){return d['name']}).indexOf(currentProductVersion);

                var productVersionIssuetypeData = productVersionData[productVersionIndex].issuetype;
                seriesData = [];
                for (var i = 0; i < productVersionIssuetypeData.length; i++){
                    name = productVersionIssuetypeData[i].name;
                    y = productVersionIssuetypeData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "IssueType", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(ISSUETYPE_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(ISSUETYPE_STATE_CHANNEL, "124");
                                                currentState = "124";
                                                currentIssueType = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "under " + currentProduct + "-" + currentProductVersion;
                createChart();
            }
            break;
        case '13':
            if (currentProduct && currentComponent){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
                
                var productComponentData = productsData[productIndex].components;
                var productComponentIndex = productComponentData.map(function(d){return d['name']}).indexOf(currentComponent);

                var productComponentIssuetypeData = productComponentData[productComponentIndex].issuetype;
                seriesData = [];
                for (var i = 0; i < productComponentIssuetypeData.length; i++){
                    name = productComponentIssuetypeData[i].name;
                    y = productComponentIssuetypeData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                name: "IssueType", 
                                colorByPoint: true, data: seriesData,
                                events: {
                                            click: function(e){
                                                gadgets.Hub.publish(ISSUETYPE_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(ISSUETYPE_STATE_CHANNEL, "134");
                                                currentState = "134";
                                                currentIssueType = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "under " + currentProduct + "-" + currentComponent;
                
                createChart();
            }
            break;
        case '15':
            if (currentProduct && currentSeverity){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
                
                var productSeverityData = productsData[productIndex].severity;
                var productSeverityIndex = productSeverityData.map(function(d){return d['name']}).indexOf(currentSeverity);

                var productSeverityIssuetypeData = productSeverityData[productSeverityIndex].issuetype;
                seriesData = [];
                for (var i = 0; i < productSeverityIssuetypeData.length; i++){
                    name = productSeverityIssuetypeData[i].name;
                    y = productSeverityIssuetypeData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                name: "IssueType", 
                                colorByPoint: true, data: seriesData,
                                events: {
                                            click: function(e){
                                                gadgets.Hub.publish(ISSUETYPE_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(ISSUETYPE_STATE_CHANNEL, "154");
                                                currentState = "154";
                                                currentIssueType = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "under " + currentProduct + " of severity '" + currentComponent + "'";
                
                createChart();
            }
            break;
        case '51':
            if (currentSeverity && currentProduct){
                    severityData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.severity;
                    var severityIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.severity.map(function(d){return d['name']}).indexOf(currentSeverity);
                    
                    var severityProductData = productsData[severityIndex].products;
                    var severityProductIndex = severityProductData.map(function(d){return d['name']}).indexOf(currentSeverity);

                    var severityProductIssuetypeData = severityProductData[severityProductIndex].issuetype;
                    seriesData = [];
                    for (var i = 0; i < severityProductIssuetypeData.length; i++){
                        name = severityProductIssuetypeData[i].name;
                        y = severityProductIssuetypeData[i].issues;

                        seriesData.push({name: name, y: y});
                    }

                    currentSeriesData = [{
                                    name: "IssueType", 
                                    colorByPoint: true, data: seriesData,
                                    events: {
                                                click: function(e){
                                                    gadgets.Hub.publish(ISSUETYPE_CHANNEL, e.point.name);
                                                    gadgets.Hub.publish(ISSUETYPE_STATE_CHANNEL, "514");
                                                    currentState = "514";
                                                    currentIssueType = e.point.name;
                                            }
                                        }}];

                    currentChartTitle = "under " + currentProduct + " of severity '" + currentComponent + "'";
                    
                    createChart();
                }
            break;
        case '125':
            if (currentProduct && currentProductVersion && currentSeverity){
                debugger;
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
                var productVersionData = productsData[productIndex].version;
                var productVersionIndex = productVersionData.map(function(d){return d['name']}).indexOf(currentProductVersion);

                var productVersionSeverityData = productVersionData[productVersionIndex].severity;
                var productVersionSeverityIndex = productVersionSeverityData.map(function(d){return d['name']}).indexOf(currentSeverity);

                var productVersionSeverityIssueTypeData = productVersionSeverityData[productVersionSeverityIndex].issuetype;

                seriesData = [];
                for (var i = 0; i < productVersionSeverityIssueTypeData.length; i++){
                    name = productVersionSeverityIssueTypeData[i].name;
                    y = productVersionSeverityIssueTypeData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "IssueType", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(ISSUETYPE_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(ISSUETYPE_STATE_CHANNEL, "1254");
                                                currentState = "1254";
                                                currentIssueType = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "under " + currentProduct + "-" + currentProductVersion + " of severity '" + currentSeverity + "'";
                createChart();
            }
            break;
        case '135':
            if (currentProduct && currentComponent && currentSeverity){
                    productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                    var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
                
                    var productComponentData = productsData[productIndex].components;
                    var productComponentIndex = productComponentData.map(function(d){return d['name']}).indexOf(currentComponent);

                    var productComponentSeverityData = productComponentData[productComponentIndex].severity;
                    var productComponentSeverityIndex = productComponentSeverityData.map(function(d){return d['name']}).indexOf(currentSeverity);

                    var productComponentSeverityIssueTypeData = productComponentSeverityData[productComponentSeverityIndex].issuetype;

                    seriesData = [];
                    for (var i = 0; i < productComponentSeverityIssueTypeData.length; i++){
                        name = productComponentSeverityIssueTypeData[i].name;
                        y = productComponentSeverityIssueTypeData[i].issues;

                        seriesData.push({name: name, y: y});
                    }

                    currentSeriesData = [{
                                            name: "IssueType", 
                                            colorByPoint: true, data: seriesData,
                                            events: {
                                                click: function(e){
                                                    gadgets.Hub.publish(ISSUETYPE_CHANNEL, e.point.name);
                                                    gadgets.Hub.publish(ISSUETYPE_STATE_CHANNEL, "1354");
                                                    currentState = "1354";
                                                    currentIssueType = e.point.name;
                                            }
                                        }}];

                    currentChartTitle = "under " + currentProduct + "-" + currentComponent + " of severity '" + currentSeverity + "'";
                    createChart();
                }
            break;
        case '512':
            break;
        case '513':
            break;

    }
}


function createChart(data){

    
    // Create the chart
    Highcharts.chart('container', {
        chart: {
            type: 'pie',
        },
        credits: {
            text: "source : jira"
        },
        title: {
            text: currentChartTitle,
            widthAdjust: -100,
            style: {
                fontSize : '14px'
            }
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
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: currentSeriesData,
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
                        gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "0");
                    }
                }
            }   
        }
        
    });


}