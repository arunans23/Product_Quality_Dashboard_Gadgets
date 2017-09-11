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

                gadgets.Hub.subscribe(ISSUETYPE_STATE_CHANNEL, function(topic, message) {
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
    this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = responseData;
    currentState = '0';
    callbackForStateChannel(currentState);
}


function callbackForStateChannel(state){
    switch(state){
        case '0':
            severityData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.severity;
            seriesData = [];
            for (var i = 0; i < severityData.length; i++){
                name = severityData[i].name;
                y = severityData[i].issues;

                seriesData.push({name: name, y: y});
            }

            currentSeriesData = [{
                                    name: "Severity", 
                                    colorByPoint: true, data: seriesData,
                                    events: {
                                    click: function(e){
                                        gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                        gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "5");
                                        currentSeverity = e.point.name;
                                        currentState = "5";
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
            
                var productSeverityData = productsData[index].severity;
                seriesData = [];
                for (var i = 0; i < productSeverityData.length; i++){
                    name = productSeverityData[i].name;
                    y = productSeverityData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "Severity", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "15");
                                                currentState = "15";
                                                currentSeverity = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "under " + currentProduct;
                createChart();
            }
            break;

        case '4':
            if (currentIssueType){
                issuetypeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype;
                var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype.map(function(d){return d['name']}).indexOf(currentIssueType);
            
                var issuetypeSeverityData = issuetypeData[index].severity;
                seriesData = [];
                for (var i = 0; i < issuetypeSeverityData.length; i++){
                    name = issuetypeSeverityData[i].name;
                    y = issuetypeSeverityData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "Severity", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "45");
                                                currentState = "45";
                                                currentSeverity = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "of type '" + currentIssueType + "'";
                createChart();
            }
            break;
        case '12':
            if (currentProduct && currentProductVersion){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
                var productVersionData = productsData[productIndex].version;
                var productVersionIndex = productVersionData.map(function(d){return d['name']}).indexOf(currentProductVersion);

                var productVersionSeverityData = productVersionData[productVersionIndex].severity;
                seriesData = [];
                for (var i = 0; i < productVersionSeverityData.length; i++){
                    name = productVersionSeverityData[i].name;
                    y = productVersionSeverityData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "Severity", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "125");
                                                currentState = "125";
                                                currentSeverity = e.point.name;
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

                var productComponentSeverityData = productComponentData[productComponentIndex].severity;
                seriesData = [];
                for (var i = 0; i < productComponentSeverityData.length; i++){
                    name = productComponentSeverityData[i].name;
                    y = productComponentSeverityData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                name: "Severity", 
                                colorByPoint: true, data: seriesData,
                                events: {
                                            click: function(e){
                                                gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "135");
                                                currentState = "135";
                                                currentSeverity = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "under " + currentProduct + "-" + currentComponent;
                createChart();
            }
            break;
        case '14':
            if (currentProduct && currentIssueType){
                    productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                    var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
                    
                    var productIssueTypeData = productsData[productIndex].issuetype;
                    var productIssueTypeIndex = productIssueTypeData.map(function(d){return d['name']}).indexOf(currentIssueType);

                    var productIssueTypeSeverityData = productIssueTypeData[productIssueTypeIndex].severity;
                    seriesData = [];
                    for (var i = 0; i < productIssueTypeSeverityData.length; i++){
                        name = productIssueTypeSeverityData[i].name;
                        y = productIssueTypeSeverityData[i].issues;

                        seriesData.push({name: name, y: y});
                    }

                    currentSeriesData = [{
                                    name: "Severity", 
                                    colorByPoint: true, data: seriesData,
                                    events: {
                                                click: function(e){
                                                    gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                    gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "145");
                                                    currentState = "145";
                                                    currentSeverity = e.point.name;
                                            }
                                        }}];

                    currentChartTitle = "of type '" + currentIssueType + "'' under " + currentProduct;
                    createChart();
                }
            break;
        case '41':
            if (currentIssueType && currentProduct){
                issueTypeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype;
                var issuetypeIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype.map(function(d){return d['name']}).indexOf(currentIssueType);
                    
                var issueTypeProductData = issueTypeData[issuetypeIndex].products;
                var issueTypeProductIndex = issueTypeProductData.map(function(d){return d['name']}).indexOf(currentProduct);

                var issueTypeProductSeverityData = issueTypeProductData[issueTypeProductIndex].severity;
                seriesData = [];
                for (var i = 0; i < issueTypeProductSeverityData.length; i++){
                    name = issueTypeProductSeverityData[i].name;
                    y = issueTypeProductSeverityData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                name: "Severity", 
                                colorByPoint: true, data: seriesData,
                                events: {
                                            click: function(e){
                                                gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "415");
                                                currentState = "415";
                                                currentSeverity = e.point.name;
                                        }
                                    }}];

                    currentChartTitle = "of type '" + currentIssueType + "'' under " + currentProduct;
                    createChart();
            }
            break;
        case '124':
            if (currentProduct && currentProductVersion && currentIssueType){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
                var productVersionData = productsData[productIndex].version;
                var productVersionIndex = productVersionData.map(function(d){return d['name']}).indexOf(currentProductVersion);

                var productVersionIssueTypeData = productsVersionData[productVersionIndex].issuetype;
                var productVersionIssueTypeIndex = productVersionIssueTypeData.map(function(d){return d['name']}).indexOf(currentIssueType);

                var productVersionIssueTypeSeverityData = productVersionIssueTypeData[productVersionIssueTypeIndex].severity;

                seriesData = [];
                for (var i = 0; i < productVersionIssueTypeSeverityData.length; i++){
                    name = productVersionIssueTypeSeverityData[i].name;
                    y = productVersionIssueTypeSeverityData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "Severity", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "1245");
                                                currentState = "1245";
                                                currentSeverity = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "under " + currentProduct + "-" + currentProductVersion + " of type '" + currentIssueType + "'";
                createChart();
            }
            break;
        case '134':
        
            if (currentProduct && currentComponent && currentIssueType){
                    productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                    var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
                
                    var productComponentData = productsData[productIndex].components;
                    var productComponentIndex = productComponentData.map(function(d){return d['name']}).indexOf(currentComponent);

                    var productComponentIssueTypeData = productComponentData[productComponentIndex].issuetype;
                    var productComponentIssueTypeIndex = productComponentIssueTypeData.map(function(d){return d['name']}).indexOf(currentIssueType);

                    var productComponentIssueTypeSeverityData = productComponentIssueTypeData[productComponentIssueTypeIndex].severity;

                    seriesData = [];
                    for (var i = 0; i < productComponentIssueTypeSeverityData.length; i++){
                        name = productComponentIssueTypeSeverityData[i].name;
                        y = productComponentIssueTypeSeverityData[i].issues;

                        seriesData.push({name: name, y: y});
                    }

                    currentSeriesData = [{
                                            name: "Severity", 
                                            colorByPoint: true, data: seriesData,
                                            events: {
                                                click: function(e){
                                                    gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                    gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "1345");
                                                    currentState = "1345";
                                                    currentSeverity = e.point.name;
                                            }
                                        }}];

                    currentChartTitle = "under " + currentProduct + "-" + currentComponent + " of type '" + currentIssueType + "'";
                    createChart();
                }
            break;
        case '154':
            break;
        case '412':
            break;
        case '413':
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
                        initChart();
                        gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "0");
                    }
                }
            }   
        }
        
    });


}
