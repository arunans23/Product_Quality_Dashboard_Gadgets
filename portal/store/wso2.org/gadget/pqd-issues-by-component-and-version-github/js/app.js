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

var customTooltip;

gadgets.HubSettings.onConnect = function () {
                gadgets.Hub.subscribe(PRODUCT_STATE_CHANNEL, function(topic, message) {
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
                        currentSeverity = message;
                    }
                });
                //Subscribe to the issuetype channel
                gadgets.Hub.subscribe(ISSUETYPE_CHANNEL, function (topic, message) {
                    //callbackForChannels(message);
                    if(message){
                        currentIssueType = message;
                    }
                });
                gadgets.Hub.subscribe(ISSUESDATA_CHANNEL, function(topic, message){
                    if(message){
                        initChart(message);
                    }
                });
            };

function initChart(responseData){
    debugger;
    this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = responseData;
    currentState = '0';
    callbackForStateChannel(currentState);
}


function callbackForStateChannel(state){
    switch(state){
        case '0':
            productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            seriesData = [];

            productComponentData = productsData[0].components;

            var otherDataCount = 0;
            
            for (var i = 0; i < productComponentData.length; i++){
                    if (productComponentData[i].issues > 10){
                        name = productComponentData[i].name;
                        y = productComponentData[i].issues;

                        seriesData.push({name: name, y: y});
                    } else {
                        otherDataCount += productComponentData[i].issues;
                    }
                    
                }

                if (otherDataCount != 0){
                    seriesData.push({name: 'other', y: otherDataCount});
                }

            currentProduct = productsData[0].name;

            currentSeriesData = [{
                                    name: "Components", 
                                    colorByPoint: true, data: seriesData,
                                    events: {
                                    click: function(e){
                                        gadgets.Hub.publish(COMPONENT_CHANNEL, e.point.name);
                                        gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "13");
                                        currentComponent = e.point.name;
                                        currentState = "13";
                                    }
                                }}];

            currentChartTitle = "under " + currentProduct;
            createChart();
            break;

        case '1':
            if (currentProduct){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
                var productComponentData = productsData[index].components;
                seriesData = [];

                var otherDataCount = 0;

                for (var i = 0; i < productComponentData.length; i++){
                    if (productComponentData[i].issues > 10){
                        name = productComponentData[i].name;
                        y = productComponentData[i].issues;

                        seriesData.push({name: name, y: y});
                    } else {
                        otherDataCount += productComponentData[i].issues;
                    }
                    
                }

                if (otherDataCount != 0){
                    seriesData.push({name: 'other', y: otherDataCount});
                }

                currentSeriesData = [{
                                        name: "Components", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(COMPONENT_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "13");
                                                currentState = "13";
                                                currentComponent = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "under " + currentProduct;
                createChart();
            }
        
            break;

        case '4':
        if (currentIssueType){
            
            issueTypeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype;
            issueTypeIndex = issueTypeData.map(function(d){return d['name']}).indexOf(currentIssueType);

            issueTypeComponentData = issueTypeData[issueTypeIndex].products[0].components;
            
            seriesData = [];

            var otherDataCount = 0;
            
            for (var i = 0; i < issueTypeComponentData.length; i++){
                    if (issueTypeComponentData[i].issues > 10){
                        name = issueTypeComponentData[i].name;
                        y = issueTypeComponentData[i].issues;

                        seriesData.push({name: name, y: y});
                    } else {
                        otherDataCount += issueTypeComponentData[i].issues;
                    }
                    
                }

                if (otherDataCount != 0){
                    seriesData.push({name: 'other', y: otherDataCount});
                }

            currentProduct = issueTypeData[issueTypeIndex].products[0].name;

            currentSeriesData = [{
                                    name: "Components", 
                                    colorByPoint: true, data: seriesData,
                                    events: {
                                    click: function(e){
                                        gadgets.Hub.publish(COMPONENT_CHANNEL, e.point.name);
                                        gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "413");
                                        currentComponent = e.point.name;
                                        currentState = "13";
                                    }
                                }}];

            currentChartTitle = "under " + currentProduct + " of issuetype '" + currentIssueType + "'";
            createChart();
        }
        break;

        case '5':
            if (currentSeverity){
                debugger;
                severityData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.severity;
                severityIndex = severityData.map(function(d){return d['name']}).indexOf(currentSeverity);

                severityComponentData = severityData[severityIndex].products[0].components;
                
                seriesData = [];

                var otherDataCount = 0;
                
                for (var i = 0; i < severityComponentData.length; i++){
                        if (severityComponentData[i].issues > 10){
                            name = severityComponentData[i].name;
                            y = severityComponentData[i].issues;

                            seriesData.push({name: name, y: y});
                        } else {
                            otherDataCount += severityComponentData[i].issues;
                        }
                        
                    }

                    if (otherDataCount != 0){
                        seriesData.push({name: 'other', y: otherDataCount});
                    }

                currentProduct = severityData[severityIndex].products[0].name;

                currentSeriesData = [{
                                        name: "Components", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                        click: function(e){
                                            gadgets.Hub.publish(COMPONENT_CHANNEL, e.point.name);
                                            gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "513");
                                            currentComponent = e.point.name;
                                            currentState = "13";
                                        }
                                    }}];

                currentChartTitle = "under " + currentProduct + " of severity '" + currentSeverity + "'";
                createChart();
            }
            break;
        case '14':
            if (currentProduct && currentIssueType){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);

                var productIssueTypeData = productsData[index].issuetype;
                var productIssueTypeIndex = productIssueTypeData.map(function(d){return d['name']}).indexOf(currentIssueType);
                
                var productIssueTypeComponentData = productIssueTypeData[productIssueTypeIndex].components;
                seriesData = [];

                var otherDataCount = 0;

                for (var i = 0; i < productIssueTypeComponentData.length; i++){
                    if (productIssueTypeComponentData[i].issues > 10){
                        name = productIssueTypeComponentData[i].name;
                        y = productIssueTypeComponentData[i].issues;

                        seriesData.push({name: name, y: y});
                    } else {
                        otherDataCount += productIssueTypeComponentData[i].issues;
                    }
                    
                }

                if (otherDataCount != 0){
                    seriesData.push({name: 'other', y: otherDataCount});
                }

                currentSeriesData = [{
                    name: "Components",
                    colorByPoint: true, data: seriesData,
                    events: {
                        click: function(e){
                            gadgets.Hub.publish(COMPONENT_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "143");
                                                currentState = "143";
                                                currentComponent = e.point.name;
                        }
                    }}];
                currentChartTitle = "under " + currentProduct + " of type '" + currentIssueType + "'";
                createChart();
                
            }
            break;
        case '15':
            if (currentProduct && currentSeverity){
                debugger;
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);

                var productSeverityData = productsData[index].severity;
                var productSeverityIndex = productSeverityData.map(function(d){return d['name']}).indexOf(currentSeverity);
                
                var productSeverityComponentData = productSeverityData[productSeverityIndex].components;
                seriesData = [];

                var otherDataCount = 0;

                for (var i = 0; i < productSeverityComponentData.length; i++){
                    if (productSeverityComponentData[i].issues > 10){
                        name = productSeverityComponentData[i].name;
                        y = productSeverityComponentData[i].issues;

                        seriesData.push({name: name, y: y});
                    } else {
                        otherDataCount += productSeverityComponentData[i].issues;
                    }
                    
                }

                if (otherDataCount != 0){
                    seriesData.push({name: 'other', y: otherDataCount});
                }

                currentSeriesData = [{
                    name: "Components",
                    colorByPoint: true, data: seriesData,
                    events: {
                        click: function(e){
                            gadgets.Hub.publish(COMPONENT_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "153");
                                                currentState = "153";
                                                currentComponent = e.point.name;
                        }
                    }}];
                currentChartTitle = "under " + currentProduct + " of type '" + currentSeverity + "'";
                createChart();
                
            }
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


function createChart(data){

    
    // Create the chart
    Highcharts.chart('container', {
        chart: {
            type: 'pie',
        },
        credits: {
            text: "source : github"
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
                        initChart(WSO2_PRODUCT_COMPONENT_ISSUES_DATA);
                        gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "0");
                    }
                }
            }   
        }
        
    });


}