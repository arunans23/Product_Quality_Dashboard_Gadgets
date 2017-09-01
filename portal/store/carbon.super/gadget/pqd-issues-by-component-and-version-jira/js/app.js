var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

var PRODUCT_CHANNEL = "product";
var PRODUCT_VERSION_CHANNEL = "product-version";
var COMPONENT_CHANNEL = "component";
var ISSUE_TYPE_CHANNEL = "issuetype";
var SEVERITY_TYPE_CHANNEL = "severity";

var PRODUCT_STATE_CHANNEL = "product-state";
var COMPONENT_STATE_CHANNEL = "component-state";
var ISSUETYPE_STATE_CHANNEL = "issuetype-state";
var SEVERITY_CHANNEL = "severity-state";

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
                // Subscribe to the product channel
                gadgets.Hub.subscribe(PRODUCT_CHANNEL, function (topic, message){
                    if(message){
                        currentProduct = message;
                    }
                });
                // Subscribe to the severity channel.
                gadgets.Hub.subscribe(SEVERITY_CHANNEL, function (topic, message) {
                    //callbackForChannels(message);
                });
                //Subscribe to the issuetype channel
                gadgets.Hub.subscribe(ISSUETYPE_CHANNEL, function (topic, message) {
                    //callbackForChannels(message);
                });
            };

function initChart(){
    this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = response.data[0];
    currentState = '0';
    callbackForStateChannel(currentState);
}


function callbackForStateChannel(state){
    switch(state){
        case '0':
            productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            seriesData = [];
            componentData = productsData[0].components;
            for (var i = 0; i < componentData.length; i++){
                name= componentData[i].name;
                y= componentData[i].issues;

                seriesData.push({name: name, y: y});
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

            currentChartTitle = "Components under " + currentProduct;
            createChart();
            break;

        case '1':
            if (currentProduct){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
                var productComponentData = productsData[index].components;
                seriesData = [];
                for (var i = 0; i < productComponentData.length; i++){
                    name= productComponentData[i].name;
                    y= productComponentData[i].issues;

                    seriesData.push({name: name, y: y});
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

                currentChartTitle = "Components under " + currentProduct;
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