


var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

var currentState;

var currentArea;
var currentProduct;
var currentVersion;
var currentComponent;
var currentIssueType;
var currentSeverity;



var currentMainChartData;
var currentIssueTypeChartData;
var currentSeverityChartData;
var currentPlatformChartData;

var currentMainChartTitle;
var currentIssueTypeChartTitle;
var currentSeverityChartTitle;
var currentPlatformChartTitle;

var currentMainChartSubtitle;
var currentIssueTypeChartSubtitle;
var currentSeverityChartSubtitle;
var currentPlatformChartSubtitle;

var dummyArea = ["Integration", "Identity and Access Management", "API Management", "Data Analytics"];


//this is the callback function for state change
function callbackForStateChange(state){
    debugger;
    switch(state){
        case '0':

            
            
            //set the data for main chart
            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            
            mainSeriesData = [];
            totalMainIssues = 0;

            for(var i = 0; i < productData.length; i++){
                name = dummyArea[i];
                y = productData[i].issues;
                totalMainIssues += y

                mainSeriesData.push({name: name, y: y});
            }

            currentMainChartTitle = "Total : " + totalMainIssues;
            currentMainChartSubtitle = null;

            currentMainChartData = [{
                name: "Products", 
                colorByPoint: true, data: mainSeriesData,
                // events: {
                //     click: function(e){
                //         currentProduct = e.point.name;
                //         currentState = "12";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]

            
            document.getElementById("main-graph-header").innerHTML = "<h5>Area Breakdown Chart</h5>";

            //set the data for the issuetype chart
            issuetypeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype;

            issuetypeSeriesData = [];
            totalIssuetypeIssues = 0;

            for(var i = 0; i < issuetypeData.length; i++){
                name = issuetypeData[i].name;
                y = issuetypeData[i].issues;

                totalIssuetypeIssues += y;

                issuetypeSeriesData.push({name: name, y: y});
            }

            currentIssueTypeChartData = [{
                name: "Issue type", 
                colorByPoint: true, data: issuetypeSeriesData,
                // events: {
                //     click: function(e){
                //         currentIssueType = e.point.name;
                //         currentState = "15";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]

            currentIssueTypeChartTitle = "Total : " + totalIssuetypeIssues;
            currentIssueTypeChartSubtitle = null;


            //set the data for the severity chart
            severityData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.severity;

            severitySeriesData = [];
            totalSeverityIssues = 0;

            for(var i = 0; i < severityData.length; i++){
                name = severityData[i].name;
                y = severityData[i].issues;

                totalSeverityIssues += y;

                severitySeriesData.push({name: name, y: y});
            }

            currentSeverityChartData = [{
                name: "Severity",
                colorByPoint: true, data: severitySeriesData,
                // events: {
                //     click: function(e){
                //         currentSeverity = e.point.name;
                //         currentState = "16";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]

            currentSeverityChartTitle = "Total : " + totalSeverityIssues;
            currentSeverityChartSubtitle = null;

            //set the data for the platform chart
            
            
            currentPlatformChartData = [{
                    name: 'Platform',
                    data: [totalMainIssues, 0]
                }];
            
            currentPlatformChartTitle = "Total : " + totalMainIssues;
            currentPlatformChartSubtitle = null;
            
            createCharts();

            break;
        
        case '1':
            
            
            //set the data for main chart
            productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentArea);
            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.slice(productIndex, productIndex+1);
            
            mainSeriesData = [];
            totalMainIssues = 0;

            for(var i = 0; i < productData.length; i++){
                name = productData[i].name;
                y = productData[i].issues;
                totalMainIssues += y

                mainSeriesData.push({name: name, y: y});
            }

            currentMainChartData = [{
                name: "Products", 
                colorByPoint: true, data: mainSeriesData,
                // events: {
                //     click: function(e){
                //         currentProduct = e.point.name;
                //         currentState = "12";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]

            document.getElementById("main-graph-header").innerHTML = "<h5>Product Breakdown Chart</h5>";
            currentMainChartTitle = "Total : " + totalMainIssues; 
            currentMainChartSubtitle = null;

            //set the data for the issuetype chart
            issuetypeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype;

            issuetypeSeriesData = [];
            totalIssuetypeIssues = 0;

            for(var i = 0; i < issuetypeData.length; i++){
                name = issuetypeData[i].name;
                y = issuetypeData[i].issues;

                totalIssuetypeIssues += y;

                issuetypeSeriesData.push({name: name, y: y});
            }

            currentIssueTypeChartData = [{
                name: "Issue type", 
                colorByPoint: true, data: issuetypeSeriesData,
                // events: {
                //     click: function(e){
                //         currentIssueType = e.point.name;
                //         currentState = "15";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]
            
            currentIssueTypeChartTitle = "Total : " + totalIssuetypeIssues;
            currentIssueTypeChartSubtitle = null;


            //set the data for the severity chart
            severityData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.severity;

            severitySeriesData = [];
            totalSeverityIssues = 0;

            for(var i = 0; i < severityData.length; i++){
                name = severityData[i].name;
                y = severityData[i].issues;

                totalSeverityIssues += y;

                severitySeriesData.push({name: name, y: y});
            }

            currentSeverityChartData = [{
                name: "Severity",
                colorByPoint: true, data: severitySeriesData,
                // events: {
                //     click: function(e){
                //         currentSeverity = e.point.name;
                //         currentState = "16";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]

            currentSeverityChartTitle = "Total : " + totalSeverityIssues;
            currentSeverityChartSubtitle = null;

            //set the data for the platform chart
            
            
            currentPlatformChartData = [{
                    name: 'Platform',
                    data: [totalMainIssues, 0]
                }];
            
            
                
            currentPlatformChartTitle = "Total : " + totalMainIssues;
            currentPlatformChartSubtitle = null;
            
            createCharts();

            document.getElementById("version-choice").innerHTML = "<option value='none'>Select a product</option>"
            
            break;

        case '12':
            

            //set the data for main chart
            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            versionData = productData[productIndex].version;
            
            mainSeriesData = [];
            totalMainIssues = 0;

            for(var i = 0; i < versionData.length; i++){
                name = versionData[i].name;
                y = versionData[i].issues;
                totalMainIssues += y

                mainSeriesData.push({name: name, y: y});
            }

            currentMainChartData = [{
                name: "Products", 
                colorByPoint: true, data: mainSeriesData,
                // events: {
                //     click: function(e){
                //         currentVersion = e.point.name;
                //         currentState = "123";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]

            document.getElementById("main-graph-header").innerHTML = "<h5>Version Breakdown Chart</h5>";
            currentMainChartTitle = "Total : " + totalMainIssues;
            currentMainChartSubtitle = null;

            //set the data for the issuetype chart

            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            issuetypeData = productData[productIndex].issuetype;

            issuetypeSeriesData = [];
            totalIssuetypeIssues = 0;

            for(var i = 0; i < issuetypeData.length; i++){
                name = issuetypeData[i].name;
                y = issuetypeData[i].issues;

                totalIssuetypeIssues += y;

                issuetypeSeriesData.push({name: name, y: y});
            }

            currentIssueTypeChartData = [{
                name: "Issue type", 
                colorByPoint: true, data: issuetypeSeriesData,
                // events: {
                //     click: function(e){
                //         currentIssueType = e.point.name;
                //         currentState = "125";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]

            currentIssueTypeChartTitle = "Total : " + totalIssuetypeIssues;
            currentIssueTypeChartSubtitle = null;


            //set the data for the severity chart
            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            severityData = productData[productIndex].severity;

            severitySeriesData = [];
            totalSeverityIssues = 0;

            for(var i = 0; i < severityData.length; i++){
                name = severityData[i].name;
                y = severityData[i].issues;

                totalSeverityIssues += y;

                severitySeriesData.push({name: name, y: y});
            }

            currentSeverityChartData = [{
                name: "Severity",
                colorByPoint: true, data: severitySeriesData,
                // events: {
                //     click: function(e){
                //         currentSeverity = e.point.name;
                //         currentState = "126";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]

            currentSeverityChartTitle = "Total : " + totalSeverityIssues;
            currentSeverityChartSubtitle = null;

            //set the data for the platform chart
            
            
            currentPlatformChartData = [{
                    name: 'Platform',
                    data: [totalMainIssues, 0]
                }];
            
            
            currentPlatformChartTitle = "Total : " + totalMainIssues;
            currentPlatformChartSubtitle = null;

            createCharts();

            break;

        case '123':
            

            //set the data for main chart
            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            
            
            componentData = productData[productIndex].components;
            componentIndex = componentData.map(function(d){return d['name']}).indexOf(currentComponent);

            
            
            mainSeriesData = [];
            totalMainIssues = 0;

            for(var i = 0; i < componentData.length; i++){
                name = componentData[i].name;
                y = componentData[i].issues;
                totalMainIssues += y

                mainSeriesData.push({name: name, y: y});
            }

            currentMainChartData = [{
                name: "Products", 
                colorByPoint: true, data: mainSeriesData,
                events: {
                    click: function(e){
                        currentComponent = e.point.name;
                        currentState = "1234";
                        callbackForStateChange(currentState);
                    }
                }
            }]

            document.getElementById("main-graph-header").innerHTML = "<h5>Component Breakdown Chart</h5>";
            currentMainChartTitle = "Total : " + totalMainIssues;
            currentMainChartSubtitle = "Click on the slices to view issue types and severity breakdown";
            

            //set the data for the issuetype chart

            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            versionData = productData[productIndex].version;
            versionIndex = versionData.map(function(d){return d['name']}).indexOf(currentVersion);

            issuetypeData = versionData[versionIndex].issuetype;

            issuetypeSeriesData = [];
            totalIssuetypeIssues = 0;

            for(var i = 0; i < issuetypeData.length; i++){
                name = issuetypeData[i].name;
                y = issuetypeData[i].issues;

                totalIssuetypeIssues += y;

                issuetypeSeriesData.push({name: name, y: y});
            }

            currentIssueTypeChartData = [{
                name: "Issue type", 
                colorByPoint: true, data: issuetypeSeriesData,
                // events: {
                //     click: function(e){
                //         currentIssueType = e.point.name;
                //         currentState = "1235";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]

            currentIssueTypeChartTitle = "Total : " + totalIssuetypeIssues;
            currentIssueTypeChartSubtitle = null;


            //set the data for the severity chart
            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            versionData = productData[productIndex].version;
            versionIndex = versionData.map(function(d){return d['name']}).indexOf(currentVersion);
            
            severityData = versionData[versionIndex].severity;

            severitySeriesData = [];
            totalSeverityIssues = 0;

            for(var i = 0; i < severityData.length; i++){
                name = severityData[i].name;
                y = severityData[i].issues;

                totalSeverityIssues += y;

                severitySeriesData.push({name: name, y: y});
            }

            currentSeverityChartData = [{
                name: "Severity",
                colorByPoint: true, data: severitySeriesData,
                // events: {
                //     click: function(e){
                //         currentSeverity = e.point.name;
                //         currentState = "1236";
                //         callbackForStateChange(currentState);
                //     }
                // }
            }]

            currentSeverityChartTitle = "Total : " + totalSeverityIssues;
            currentSeverityChartSubtitle = null;

            //set the data for the platform chart
            
            
            currentPlatformChartData = [{
                    name: 'Platform',
                    data: [totalMainIssues, 0]
                }];
            
            currentPlatformChartTitle = "Total : " + totalMainIssues;
            currentPlatformChartSubtitle = null;

            createCharts();
            break;

        case '1234':

            //set the titles for the chart
            currentMainChartTitle = "Products";
            currentIssueTypeChartTitle = "Issue types";
            currentSeverityChartTitle = "Severity";
            currentPlatformChartTitle = "Platform";

            //set the data for main chart
            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            componentData = productData[productIndex].components;
            componentIndex = componentData.map(function(d){return d['name']}).indexOf(currentComponent);


            
            mainSeriesData = [];
            totalMainIssues = 0;

            for(var i = 0; i < componentData.length; i++){
                name = componentData[i].name;
                y = componentData[i].issues;
                totalMainIssues += y

                mainSeriesData.push({name: name, y: y});
            }

            currentMainChartData = [{
                name: "Components", 
                colorByPoint: true, data: mainSeriesData,
                events: {
                    click: function(e){
                        currentComponent = e.point.name;
                        currentState = "1234";
                        callbackForStateChange(currentState);
                    }
                }
            }]

            currentMainChartSubtitle = "Click on the columns to view issue types and severity breakdown";

            //set the data for the issuetype chart

            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            componentData = productData[productIndex].components;
            componentIndex = componentData.map(function(d){return d['name']}).indexOf(currentComponent);

            issuetypeData = componentData[componentIndex].issuetype;

            issuetypeSeriesData = [];
            totalIssuetypeIssues = 0;

            for(var i = 0; i < issuetypeData.length; i++){
                name = issuetypeData[i].name;
                y = issuetypeData[i].issues;

                totalIssuetypeIssues += y;

                issuetypeSeriesData.push({name: name, y: y});
            }

            currentIssueTypeChartData = [{
                name: "Issue type", 
                colorByPoint: true, data: issuetypeSeriesData,
                events: {
                    click: function(e){
                        currentIssueType = e.point.name;
                        currentState = "12345";
                        callbackForStateChange(currentState);
                    }
                }
            }]

            currentIssueTypeChartTitle = "Total : " + totalIssuetypeIssues;
            currentIssueTypeChartSubtitle = "Click on the slices to view severity breakdown";


            //set the data for the severity chart
            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            componentData = productData[productIndex].components;
            componentIndex = componentData.map(function(d){return d['name']}).indexOf(currentComponent);

            severityData = componentData[componentIndex].severity;

            severitySeriesData = [];
            totalSeverityIssues = 0;

            for(var i = 0; i < severityData.length; i++){
                name = severityData[i].name;
                y = severityData[i].issues;

                totalSeverityIssues += y;

                severitySeriesData.push({name: name, y: y});
            }

            currentSeverityChartData = [{
                name: "Severity",
                colorByPoint: true, data: severitySeriesData,
                events: {
                    click: function(e){
                        currentSeverity = e.point.name;
                        currentState = "12346";
                        callbackForStateChange(currentState);
                    }
                }
            }]

            currentSeverityChartTitle = "Total : " + totalSeverityIssues;
            currentSeverityChartSubtitle = "Click on the slices to view issue type breakdown";

            //set the data for the platform chart
            
            
            currentPlatformChartData = [{
                    name: 'Platform',
                    data: [totalMainIssues, 0]
                }];
            
            currentPlatformChartTitle = "Total : " + totalMainIssues;
            currentPlatformChartSubtitle = null;

            createIssueTypeChart();
            createSeverityChart();
            createPlatformChart();

            break;

        case '12345':

            

            


            //set the data for the severity chart
            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            componentData = productData[productIndex].components;
            componentIndex = componentData.map(function(d){return d['name']}).indexOf(currentComponent);

            issuetypeData = componentData[componentIndex].issuetype;
            issuetypeIndex = issuetypeData.map(function(d){return d['name']}).indexOf(currentIssueType);

            severityData = issuetypeData[issuetypeIndex].severity;

            severitySeriesData = [];
            totalSeverityIssues = 0;

            for(var i = 0; i < severityData.length; i++){
                name = severityData[i].name;
                y = severityData[i].issues;

                totalSeverityIssues += y;

                severitySeriesData.push({name: name, y: y});
            }

            currentSeverityChartData = [{
                name: "Severity",
                colorByPoint: true, data: severitySeriesData,
                events: {
                    click: function(e){
                        currentSeverity = e.point.name;
                        currentState = "126";
                        callbackForStateChange(currentState);
                    }
                }
            }]

            currentSeverityChartTitle = "Total : " + totalSeverityIssues;
            currentSeverityChartSubtitle = null;

            //set the data for the platform chart
            
            
            currentPlatformChartData = [{
                    name: 'Platform',
                    data: [totalMainIssues, 0]
                }];
            
            currentPlatformChartTitle = "Total : " + totalMainIssues;
            currentPlatformChartSubtitle = null;

            
            createSeverityChart();
            createPlatformChart();
            break;

        case '12346':

            //set the titles for the chart
            currentMainChartTitle = "Products";
            currentIssueTypeChartTitle = "Issue types";
            currentSeverityChartTitle = "Severity";
            currentPlatformChartTitle = "Platform";

            

            //set the data for the issuetype chart

            productData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
            productIndex = productData.map(function(d){return d['name']}).indexOf(currentProduct);

            componentData = productData[productIndex].components;
            componentIndex = componentData.map(function(d){return d['name']}).indexOf(currentComponent);

            issuetypeData = componentData[componentIndex].issuetype;

            issuetypeSeriesData = [];
            totalIssuetypeIssues = 0;

            for(var i = 0; i < issuetypeData.length; i++){
                name = issuetypeData[i].name;
                y = issuetypeData[i].issues;

                totalIssuetypeIssues += y;

                issuetypeSeriesData.push({name: name, y: y});
            }

            currentIssueTypeChartData = [{
                name: "Issue type", 
                colorByPoint: true, data: issuetypeSeriesData,
                events: {
                    click: function(e){
                        currentIssueType = e.point.name;
                        currentState = "12345";
                        callbackForStateChange(currentState);
                    }
                }
            }]

            currentIssueTypeChartTitle = "Total : " + totalIssuetypeIssues;
            currentIssueTypeChartSubtitle = null;


            

            //set the data for the platform chart
            
            
            currentPlatformChartData = [{
                    name: 'Platform',
                    data: [totalMainIssues, 0]
                }];
            
            currentPlatformChartTitle = "Total : " + totalMainIssues;
            currentPlatformChartSubtitle = null;

            createIssueTypeChart();
            
            createPlatformChart();
            break;

        case '123456':
            break;

        case '123465':
            break;

    }

}


//this is the main function that iniatates all the functions and charts
function initCharts(responseData){
    
    this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = responseData;
    currentState = '0';
    callbackForStateChange(currentState); 

    
    
}

function createCharts(){
    createMainChart();
    createIssueTypeChart();
    createSeverityChart();
    createPlatformChart();
}


//this will create the main graph with areas, products, product versions and components
//graph type : bar
function createMainChart(){
    //Create the chart
    Highcharts.chart('main-chart-container', {
        chart: {
            type: 'column'
        },
        title: {
            text: currentMainChartTitle
        },
        subtitle: {
            text: currentMainChartSubtitle
        },
        credits: {
            enabled: false   
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
            }, column: {
                maxPointWidth: 100
            }
        },
    
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>'
        },
    
        series: currentMainChartData,

        exporting: {
            enabled: true  
        }
    })
}

//this will create the issue type pie graph
//graph type : pie
function createIssueTypeChart(){
    // Create the chart
    Highcharts.chart('issuetype-chart-container', {
        chart: {
            type: 'pie',
        },
        credits: {
            enabled: false   
        },
        title: {
            text: currentIssueTypeChartTitle
           
        },
        legend: {
        	layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 50,
            width: 100
        },
        subtitle: {
            text: currentIssueTypeChartSubtitle
        },
        plotOptions: {
            pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}',
                        distance: 5
                    },
                    showInLegend: true,
                }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: currentIssueTypeChartData,
        exporting: {
            enabled: true  
        }
        
    });
}


/**
 * this will create the severity pie graph
 * graph type : pie
 */
function createSeverityChart(){
    // Create the chart
    Highcharts.chart('severity-chart-container', {
        chart: {
            type: 'pie',
        },
        credits: {
            enabled: false   
        },
        legend: {
        	layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 50,
            width: 100
        },
        title: {
            text: currentSeverityChartTitle
            
        },
        subtitle: {
            text: currentSeverityChartSubtitle
        },
        plotOptions: {
            pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}',
                        distance: 5
                    },
                    showInLegend: true
                }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: currentSeverityChartData,
        exporting: {
            enabled: true  
        }
        
    });
}

/**
 * this will create the platform graph which is JIRA and Github for now
 * graph type : horizontal bar
 */
function createPlatformChart(){
    // Create the chart
    Highcharts.chart('platform-chart-container', {
        chart: {
            type: 'bar',
        },
        credits: {
            enabled: false   
        },
        title: {
            text: currentPlatformChartTitle
        },
        subtitle: {
            text: currentPlatformChartSubtitle
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
                maxPointWidth: 75
            }
        },
        xAxis: {
            categories: ['JIRA', 'Github']
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },
        legend: {
            enabled: false
        },
        series: currentPlatformChartData,
        exporting: {
            enabled: true  
        }
        
    });
}


function setCurrentState(state){
    currentState = state;
}

function setCurrentArea(area){
    currentArea = area;
}

function setCurrentProduct(product){
    currentProduct = product;
}

function setCurrentVersion(version){
    currentVersion = version;
}

function setCurrentComponent(component){
    currentComponent = component;
}

function setCurrentIssueType(issuetype){
    currentIssueType = issuetype;
}

function setCurrentSeverity(severity){
    currentSeverity = severity;
}

// function initChart(responseData){
//     this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = responseData;
//     currentState = '0';
//     callbackForStateChannel(currentState);
// }


// function callbackForStateChannel(state){
//     switch(state){
//         case '0':
//             severityData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.severity;
//             seriesData = [];
//             for (var i = 0; i < severityData.length; i++){
//                 name = severityData[i].name;
//                 y = severityData[i].issues;

//                 seriesData.push({name: name, y: y});
//             }

//             currentSeriesData = [{
//                                     name: "Severity", 
//                                     colorByPoint: true, data: seriesData,
//                                     events: {
//                                     click: function(e){
//                                         gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
//                                         gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "5");
//                                         currentSeverity = e.point.name;
//                                         currentState = "5";
//                                         callbackForStateChannel(currentState);
//                                     }
//                                 }}];

//             currentChartTitle = "";
//             createChart();
//             break;

//         case '1':
//             if (currentProduct){
//                 productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
//                 var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
//                 var productSeverityData = productsData[index].severity;
//                 seriesData = [];
//                 for (var i = 0; i < productSeverityData.length; i++){
//                     name = productSeverityData[i].name;
//                     y = productSeverityData[i].issues;

//                     seriesData.push({name: name, y: y});
//                 }

//                 currentSeriesData = [{
//                                         name: "Severity", 
//                                         colorByPoint: true, data: seriesData,
//                                         events: {
//                                             click: function(e){
//                                                 gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
//                                                 gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "15");
//                                                 currentState = "15";
//                                                 currentSeverity = e.point.name;
//                                         }
//                                     }}];

//                 currentChartTitle = "under " + currentProduct;
//                 createChart();
//             }
//             break;

//         case '4':
//             if (currentIssueType){
//                 issuetypeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype;
//                 var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype.map(function(d){return d['name']}).indexOf(currentIssueType);
            
//                 var issuetypeSeverityData = issuetypeData[index].severity;
//                 seriesData = [];
//                 for (var i = 0; i < issuetypeSeverityData.length; i++){
//                     name = issuetypeSeverityData[i].name;
//                     y = issuetypeSeverityData[i].issues;

//                     seriesData.push({name: name, y: y});
//                 }

//                 currentSeriesData = [{
//                                         name: "Severity", 
//                                         colorByPoint: true, data: seriesData,
//                                         events: {
//                                             click: function(e){
//                                                 gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
//                                                 gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "45");
//                                                 currentState = "45";
//                                                 currentSeverity = e.point.name;
//                                         }
//                                     }}];

//                 currentChartTitle = "of type '" + currentIssueType + "'";
//                 createChart();
//             }
//             break;
//         case '12':
//             if (currentProduct && currentProductVersion){
//                 productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
//                 var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
//                 var productVersionData = productsData[productIndex].version;
//                 var productVersionIndex = productVersionData.map(function(d){return d['name']}).indexOf(currentProductVersion);

//                 var productVersionSeverityData = productVersionData[productVersionIndex].severity;
//                 seriesData = [];
//                 for (var i = 0; i < productVersionSeverityData.length; i++){
//                     name = productVersionSeverityData[i].name;
//                     y = productVersionSeverityData[i].issues;

//                     seriesData.push({name: name, y: y});
//                 }

//                 currentSeriesData = [{
//                                         name: "Severity", 
//                                         colorByPoint: true, data: seriesData,
//                                         events: {
//                                             click: function(e){
//                                                 gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
//                                                 gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "125");
//                                                 currentState = "125";
//                                                 currentSeverity = e.point.name;
//                                         }
//                                     }}];

//                 currentChartTitle = "under " + currentProduct + "-" + currentProductVersion;
//                 createChart();
//             }
//             break;
//         case '13':
//             if (currentProduct && currentComponent){
//                 productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
//                 var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
                
//                 var productComponentData = productsData[productIndex].components;
//                 var productComponentIndex = productComponentData.map(function(d){return d['name']}).indexOf(currentComponent);

//                 var productComponentSeverityData = productComponentData[productComponentIndex].severity;
//                 seriesData = [];
//                 for (var i = 0; i < productComponentSeverityData.length; i++){
//                     name = productComponentSeverityData[i].name;
//                     y = productComponentSeverityData[i].issues;

//                     seriesData.push({name: name, y: y});
//                 }

//                 currentSeriesData = [{
//                                 name: "Severity", 
//                                 colorByPoint: true, data: seriesData,
//                                 events: {
//                                             click: function(e){
//                                                 gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
//                                                 gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "135");
//                                                 currentState = "135";
//                                                 currentSeverity = e.point.name;
//                                         }
//                                     }}];

//                 currentChartTitle = "under " + currentProduct + "-" + currentComponent;
//                 createChart();
//             }
//             break;
//         case '14':
//             if (currentProduct && currentIssueType){
//                     productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
//                     var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
                    
//                     var productIssueTypeData = productsData[productIndex].issuetype;
//                     var productIssueTypeIndex = productIssueTypeData.map(function(d){return d['name']}).indexOf(currentIssueType);

//                     var productIssueTypeSeverityData = productIssueTypeData[productIssueTypeIndex].severity;
//                     seriesData = [];
//                     for (var i = 0; i < productIssueTypeSeverityData.length; i++){
//                         name = productIssueTypeSeverityData[i].name;
//                         y = productIssueTypeSeverityData[i].issues;

//                         seriesData.push({name: name, y: y});
//                     }

//                     currentSeriesData = [{
//                                     name: "Severity", 
//                                     colorByPoint: true, data: seriesData,
//                                     events: {
//                                                 click: function(e){
//                                                     gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
//                                                     gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "145");
//                                                     currentState = "145";
//                                                     currentSeverity = e.point.name;
//                                             }
//                                         }}];

//                     currentChartTitle = "of type '" + currentIssueType + "'' under " + currentProduct;
//                     createChart();
//                 }
//             break;
//         case '41':
//             if (currentIssueType && currentProduct){
//                 issueTypeData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype;
//                 var issuetypeIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.issuetype.map(function(d){return d['name']}).indexOf(currentIssueType);
                    
//                 var issueTypeProductData = issueTypeData[issuetypeIndex].products;
//                 var issueTypeProductIndex = issueTypeProductData.map(function(d){return d['name']}).indexOf(currentProduct);

//                 var issueTypeProductSeverityData = issueTypeProductData[issueTypeProductIndex].severity;
//                 seriesData = [];
//                 for (var i = 0; i < issueTypeProductSeverityData.length; i++){
//                     name = issueTypeProductSeverityData[i].name;
//                     y = issueTypeProductSeverityData[i].issues;

//                     seriesData.push({name: name, y: y});
//                 }

//                 currentSeriesData = [{
//                                 name: "Severity", 
//                                 colorByPoint: true, data: seriesData,
//                                 events: {
//                                             click: function(e){
//                                                 gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
//                                                 gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "415");
//                                                 currentState = "415";
//                                                 currentSeverity = e.point.name;
//                                         }
//                                     }}];

//                     currentChartTitle = "of type '" + currentIssueType + "'' under " + currentProduct;
//                     createChart();
//             }
//             break;
//         case '124':
//             if (currentProduct && currentProductVersion && currentIssueType){
//                 productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
//                 var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
//                 var productVersionData = productsData[productIndex].version;
//                 var productVersionIndex = productVersionData.map(function(d){return d['name']}).indexOf(currentProductVersion);

//                 var productVersionIssueTypeData = productsVersionData[productVersionIndex].issuetype;
//                 var productVersionIssueTypeIndex = productVersionIssueTypeData.map(function(d){return d['name']}).indexOf(currentIssueType);

//                 var productVersionIssueTypeSeverityData = productVersionIssueTypeData[productVersionIssueTypeIndex].severity;

//                 seriesData = [];
//                 for (var i = 0; i < productVersionIssueTypeSeverityData.length; i++){
//                     name = productVersionIssueTypeSeverityData[i].name;
//                     y = productVersionIssueTypeSeverityData[i].issues;

//                     seriesData.push({name: name, y: y});
//                 }

//                 currentSeriesData = [{
//                                         name: "Severity", 
//                                         colorByPoint: true, data: seriesData,
//                                         events: {
//                                             click: function(e){
//                                                 gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
//                                                 gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "1245");
//                                                 currentState = "1245";
//                                                 currentSeverity = e.point.name;
//                                         }
//                                     }}];

//                 currentChartTitle = "under " + currentProduct + "-" + currentProductVersion + " of type '" + currentIssueType + "'";
//                 createChart();
//             }
//             break;
//         case '134':
        
//             if (currentProduct && currentComponent && currentIssueType){
//                     productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
//                     var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
                
//                     var productComponentData = productsData[productIndex].components;
//                     var productComponentIndex = productComponentData.map(function(d){return d['name']}).indexOf(currentComponent);

//                     var productComponentIssueTypeData = productComponentData[productComponentIndex].issuetype;
//                     var productComponentIssueTypeIndex = productComponentIssueTypeData.map(function(d){return d['name']}).indexOf(currentIssueType);

//                     var productComponentIssueTypeSeverityData = productComponentIssueTypeData[productComponentIssueTypeIndex].severity;

//                     seriesData = [];
//                     for (var i = 0; i < productComponentIssueTypeSeverityData.length; i++){
//                         name = productComponentIssueTypeSeverityData[i].name;
//                         y = productComponentIssueTypeSeverityData[i].issues;

//                         seriesData.push({name: name, y: y});
//                     }

//                     currentSeriesData = [{
//                                             name: "Severity", 
//                                             colorByPoint: true, data: seriesData,
//                                             events: {
//                                                 click: function(e){
//                                                     gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
//                                                     gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "1345");
//                                                     currentState = "1345";
//                                                     currentSeverity = e.point.name;
//                                             }
//                                         }}];

//                     currentChartTitle = "under " + currentProduct + "-" + currentComponent + " of type '" + currentIssueType + "'";
//                     createChart();
//                 }
//             break;
//         case '154':
//             break;
//         case '412':
//             break;
//         case '413':
//             break;

//     }
// }


// function createChart(data){

    
//     // Create the chart
//     Highcharts.chart('container', {
//         chart: {
//             type: 'pie',
//         },
//         credits: {
//             text: "source : jira"
//         },
//         title: {
//             text: currentChartTitle,
//             widthAdjust: -100,
//             style: {
//                 fontSize : '14px'
//             }
//         },
//         plotOptions: {
//             pie: {
//                     allowPointSelect: true,
//                     cursor: 'pointer',
//                     dataLabels: {
//                         enabled: false
//                     },
//                     showInLegend: true
//                 }
//         },

//         tooltip: {
//             headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//             pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
//         },

//         series: currentSeriesData,
//         exporting: {
//             buttons: {
//                 customButton: {
//                     symbol: 'circle',
//                     symbolStrokeWidth: 1,
//                     symbolFill: '#a4edba',
//                     symbolStroke: '#330033',
//                     _titleKey: 'backTitle',
//                     onclick: function() {
//                         initChart();
//                         gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "0");
//                     }
//                 }
//             }   
//         }
        
//     });


// }


