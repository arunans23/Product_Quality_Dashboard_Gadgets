//get summary years from DSS
var getSummaryYearJSON = "";
var JSON_SIZE = 0;

$.ajax({
    url: 'https://localhost:9443/services/PMT_Dashboard/getsummaryyear',
    async: false,
    success: function(data){
        getSummaryYearJSON = xmlToJson(data).Entries.Entry;
        JSON_SIZE = xmlToJson(data).Entries.Entry.length;
    }
})

//get summary count from DSS
var getSummaryCountJSON ="";
$.ajax({
    url: 'https://localhost:9443/services/PMT_Dashboard/getsummarycount',
    async: false,
    success: function(data){
        getSummaryCountJSON = xmlToJson(data).Entries.Entry;
    }
})

//create summary JSON
var summaryArray = [];

for (var i = 0; i < JSON_SIZE; i++) {
    var json={name:"x",y:2016,drilldown:"y"};
    json.name = "Year-"+getSummaryYearJSON[i].YEARS;
    json.y = parseInt(getSummaryCountJSON[i].COUNTS);
    json.drilldown = "Year-"+getSummaryYearJSON[i].YEARS;
    summaryArray.push(json);
}

//create drilldown data from all years
var totalDetails = [];

for(var i = 0; i < JSON_SIZE; i++){
    $.ajax({
        url: 'https://localhost:9443/services/PMT_Dashboard/getyearproduct/'+getSummaryYearJSON[i].YEARS,
        async: false,
        success: function(data){
            totalDetails.push(xmlToJson(data).Entries.Entry);
        }
    });
}

//create drilldown.data array from totalDetails array
var chartData = [];
for(var x=0;x<totalDetails.length;x++){
    var temps = [];
    for(var y=0;y<totalDetails[x].length;y++){
        var temp = []
        temp.push(totalDetails[x][y].PRODUCT_NAME,parseInt(totalDetails[x][y].total));
        temps.push(temp)
    }
    chartData.push(temps);
}
//console.log(chartData);

//feed data to hicharts script
var drillDown = [];
for (var j = 0; j < JSON_SIZE; j++) {
    var temp={name:"x",id:2016,data:"y"};
    temp.name = "Year-"+getSummaryYearJSON[j].YEARS;
    temp.id = "Year-"+getSummaryYearJSON[j].YEARS;
    temp.data = chartData[j];
    drillDown.push(temp);
}

//console.log(drillDown)



// Create the chart summary chart initial
Highcharts.chart('graphDiv', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Total Patch summary in WSO2, Since 2015 to today'
    },
    subtitle: {
        text: 'Click the columns to view more details..'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total patch count'
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
        headerFormat: '<span style="font-size:11px">{series.name} Summary</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of Total<br/>'
    },

    series: [{
        name: 'Patch',
        colorByPoint: true,
        data: summaryArray
    }],
    drilldown: {
        series: drillDown
    }
});

var product = null;
var version = null;
var passVersion = null;
var listID = null;
var versionID = null;

//runs when clicks the product and version
function showClick(x,y) {
    //set global variables
    listID = x;
    versionID=y;
    //alert(listID+'-'+versionID);

    product = document.getElementById('product' + x).innerHTML.split("<span")[0].trim();
    version = document.getElementById('subVersion' + y).innerHTML;
    passVersion = version.split(" ")[1];

    //alert(product+''+version);
    //show product details
    document.getElementById('prodcutDetails').style.display = 'block';
    document.getElementById('fullDiv').style.height = '1500px';
    //console.log(version);

    //add header to the div
    document.getElementById('productName').innerHTML = product + " - " + version+" <span class='label label-default' style='font-size:17px; margin-top:-1px; margin-left:5px;'>Bugs Count- <b id='bugCount'>34</b></span>";

    //get details for each product and version
    if(version === 'All Versions'){
        //get product bugs
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductbug/'+product,
            success: function(data){
                document.getElementById('bugCount').innerHTML = xmlToJson(data).Entries.Entry.bugs;
            }
        });


        //get queue patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductqueue/'+product,
            success: function(data){
                document.getElementById('pQueued').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //get complete patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductcountcomplete/'+product,
            success: function(data){
                document.getElementById('pComplete').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //get Developing patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductcountprocess/'+product,
            success: function(data){
                document.getElementById('pProcess').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //get Deleted patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductdeletecount/'+product,
            success: function(data){
                document.getElementById('pDeleted').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //prepare feed json for the hichart
        var yearWiseProductVersionCount = [];

        for(var i = 0; i < JSON_SIZE; i++){
            $.ajax({
                url: 'https://localhost:9443/services/PMT_Dashboard/getproducttrendcount/'+getSummaryYearJSON[i].YEARS+'/'+product,
                async: false,
                success: function(data){
                    yearWiseProductVersionCount.push(xmlToJson(data).Entries.Entry);
                }
            })
        }

        createAllVersionCharts(yearWiseProductVersionCount,x,product,2015);


        //this is sub version of a product
    }else if(version === 'Total Summary'){
        //get product bugs
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductbug/'+product,
            success: function(data){
                document.getElementById('bugCount').innerHTML = xmlToJson(data).Entries.Entry.bugs;
            }
        });


        //get queue patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductqueue/'+product,
            success: function(data){
                document.getElementById('pQueued').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //get complete patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductcountcomplete/'+product,
            success: function(data){
                document.getElementById('pComplete').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //get Developing patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductcountprocess/'+product,
            success: function(data){
                document.getElementById('pProcess').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //get Deleted patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductdeletecount/'+product,
            success: function(data){
                document.getElementById('pDeleted').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //get summary years from DSS
        var getTotalSummaryYearJSON = "";
        var JSON_SIZE_TOTAL = 0;

        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproducttotalyear/'+product,
            async: false,
            success: function(data){
                getTotalSummaryYearJSON = xmlToJson(data).Entries.Entry;
                JSON_SIZE_TOTAL = xmlToJson(data).Entries.Entry.length;
            }
        });

        //get summary count from DSS
        var getTotalSummaryCountJSON ="";
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproducttoalyearcount/'+product,
            async: false,
            success: function(data){
                getTotalSummaryCountJSON = xmlToJson(data).Entries.Entry;
            }
        });

        createVersionChart(getTotalSummaryCountJSON,version,2015);

    }else{
        //get product version bugs
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getproductversionbug/'+product+'/'+passVersion,
            success: function(data){
                document.getElementById('bugCount').innerHTML = xmlToJson(data).Entries.Entry.bugs;
            }
        });

        //get queue patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getversionqueue/'+product+'/'+passVersion,
            success: function(data){
                document.getElementById('pQueued').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //get complete patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getversioncomplete/'+product+'/'+passVersion,
            success: function(data){
                document.getElementById('pComplete').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //get Developing patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getversionprocess/'+product+'/'+passVersion,
            success: function(data){
                document.getElementById('pProcess').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //get Deleted patches
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getversiondelete/'+product+'/'+passVersion,
            success: function(data){
                document.getElementById('pDeleted').innerHTML = xmlToJson(data).Entries.Entry.total;
            }
        });

        //draw charts for get trend
        var versionTrendData = [];

        for(var i = 0; i < JSON_SIZE; i++){
            $.ajax({
                url: 'https://localhost:9443/services/PMT_Dashboard/getversiontrend/'+getSummaryYearJSON[i].YEARS+'/'+product+'/'+passVersion,
                async: false,
                success: function(data){
                    versionTrendData.push(xmlToJson(data).Entries.Entry);
                }
            })
        }

        console.log(versionTrendData);
        createVersionChart(versionTrendData,version,2015);
    }
}

//functionality of close button
function closeDiv() {
    document.getElementById('prodcutDetails').style.display = 'none';
    document.getElementById('stackTab').style.display = 'none';
    document.getElementById('fullDiv').style.height = '730px';
}

function drawChart(product,elementArray,start) {
    Highcharts.chart('container', {

        title: {
            text: product+' Patch Release Trend'
        },

        subtitle: {
            text: 'Viewing by yearly filtering'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Number of releases'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                pointStart: start
            }
        },

        series: elementArray

    });
}

function createAllVersionCharts(yearWiseProductVersionCount,x,product,start) {
    //get summary years from DSS each product version breakdown
    //console.log(yearWiseProductVersionCount);

    var getProductYearJSON = "";

    var yearlyProductTrend = [];
    var versionCount = document.getElementById("productVersion"+x).childElementCount;

    //console.log(yearWiseProductVersionCount);

    //console.log("Product Version Count = "+versionCount);

    //get selected product child ids as array
    var array = [];
    var childElement = document.getElementById('productVersion'+x);
    for (var ii = 0; ii < childElement.childNodes.length; ii++)
    {
        var childId = childElement.childNodes[ii].id;
        array.push(childId);
    }
    //console.log(array);

    //create yearly wise version data array to feed hi chart
    for(var j=1;j<versionCount -1;j++){
        var tempd={name:"x",data:"y"};
        tempd.name = document.getElementById(array[j+1]).innerHTML;
        // tempd.data = chartVersionData[j];
        yearlyProductTrend.push(tempd);
    }

    //console.log(yearlyProductTrend);
    //console.log("yearWiseProductVersionCount ="+yearWiseProductVersionCount.length);
    //console.log("yearlyProductTrend ="+yearlyProductTrend.length);

    //create chartVersionData array to feed data for yearlyProductTrend

    var chartVersionData = [];
    for(var z=0;z<yearlyProductTrend.length;z++){  //11
        var temps = [];
        for(var t=0;t<yearWiseProductVersionCount.length;t++){ //3
            var isFound = false;
            if(yearWiseProductVersionCount[t] !== undefined ){
                if(yearWiseProductVersionCount[t].length !== undefined){
                    for(var l=0;l<yearWiseProductVersionCount[t].length;l++){ //release version count per year
                        if(yearlyProductTrend[z].name === "Version "+yearWiseProductVersionCount[t][l].PRODUCT_VERSION){
                            isFound = true;
                            temps[t]= parseInt(yearWiseProductVersionCount[t][l].total);
                        }
                    }
                    if(isFound === false){
                        temps[t]= 0;
                    }
                }else{
                    if(yearWiseProductVersionCount[t].hasOwnProperty('total')){
                        if(yearlyProductTrend[z].name === "Version "+yearWiseProductVersionCount[t].PRODUCT_VERSION ){
                            isFound = true;
                            temps[t]= parseInt(yearWiseProductVersionCount[t].total);
                        }
                        if(isFound === false){
                            temps[t]= 0;
                        }
                    }else{
                        temps[t]= 0;
                    }
                }
            }else{
                temps[t]= 0;
            }
        }
        chartVersionData.push(temps);
    }
    //console.log(yearWiseProductVersionCount[0].hasOwnProperty('total'));
    //console.log(chartVersionData);

    for(var p=0;p<yearlyProductTrend.length;p++){
        yearlyProductTrend[p].data = chartVersionData[p];
    }

    //console.log(yearlyProductTrend);
    drawChart(product,yearlyProductTrend,start);
}

function createVersionChart(versionTrendData,version,start) {
    //console.log(version);
    //console.log(versionTrendData);
    // create json array to feed data for hichart diagram
    var versionReleaseTrend = [];
    var yearCount = [];
    for(var v=0;v<versionTrendData.length;v++){
        if(versionTrendData[v] !== undefined){
            yearCount[v]=parseInt(versionTrendData[v].total);
        }else{
            yearCount[v]=0;
        }
    }
    var bump={name:"x",data:"y"};
    bump.name = version;
    bump.data = yearCount;
    versionReleaseTrend.push(bump);

    //console.log(versionReleaseTrend);
    drawChart(version,versionReleaseTrend,start);
}

function changeDurationGraph(val) {
    if(val !== 'year'){
        document.getElementById('getYear').style.display = 'block';

    }else{
        document.getElementById('getYear').style.display = 'none';
    }
    var type = document.getElementById('getType').value;
    var year = document.getElementById('getYear').value;

    createProductTrendByType(type,year,product,passVersion);
    //alert(passVersion+type+year);
}

function createProductTrendByType(type,year,product,versionNum){
    //alert(type+'-'+year+'-'+product+'-'+versionNum);
    if(type==='quarter'){
        var num = 4;
        if(versionNum ==='Versions'){
            var quarterProduct = []
            for(var g = 0; g < num; g++){
                $.ajax({
                    url: 'https://localhost:9443/services/PMT_Dashboard/getproductquarter/'+(g+1)+'/'+product+'/'+year,
                    async: false,
                    success: function(data){
                        quarterProduct.push(xmlToJson(data).Entries.Entry);
                    }
                })
            }

            createAllVersionCharts(quarterProduct,listID,product,1);


        }else if(versionNum ==='Summary'){
            var quarterTotalProduct = []
            for(var i = 0; i < num; i++){
                $.ajax({
                    url: 'https://localhost:9443/services/PMT_Dashboard/totalproductquater/'+(i+1)+'/'+product+'/'+year,
                    async: false,
                    success: function(data){
                        quarterTotalProduct.push(xmlToJson(data).Entries.Entry);
                    }
                })
            }
            //console.log(quarterProductVersion);
            createVersionChart(quarterTotalProduct,version,1);
        }else{
            var quarterProductVersion = []
            for(var i = 0; i < num; i++){
                $.ajax({
                    url: 'https://localhost:9443/services/PMT_Dashboard/getproductversionquarter/'+(i+1)+'/'+product+'/'+year+'/'+versionNum,
                    async: false,
                    success: function(data){
                        quarterProductVersion.push(xmlToJson(data).Entries.Entry);
                    }
                })
            }
            //console.log(quarterProductVersion);
            createVersionChart(quarterProductVersion,version,1);
        }


    }else if(type === 'month'){
        var num1 = 12;
        if(versionNum ==='Versions'){
            var monthProduct = [];
            for(var g = 0; g < num1; g++){
                $.ajax({
                    url: 'https://localhost:9443/services/PMT_Dashboard/getproductmonth/'+(g+1)+'/'+product+'/'+year,
                    async: false,
                    success: function(data){
                        monthProduct.push(xmlToJson(data).Entries.Entry);
                    }
                })
            }

            createAllVersionCharts(monthProduct,listID,product,1);


        }else if(versionNum ==='Summary'){
            var monthTotalProduct = [];
            for(var i = 0; i < num1; i++){
                $.ajax({
                    url: 'https://localhost:9443/services/PMT_Dashboard/totalproductmonth/'+(i+1)+'/'+product+'/'+year,
                    async: false,
                    success: function(data){
                        monthTotalProduct.push(xmlToJson(data).Entries.Entry);
                    }
                })
            }
            //console.log(quarterProductVersion);
            createVersionChart(monthTotalProduct,version,1);
        }else{
            var monthProductVersion = [];
            for(var i = 0; i < num1; i++){
                $.ajax({
                    url: 'https://localhost:9443/services/PMT_Dashboard/getproductversionmonth/'+(i+1)+'/'+product+'/'+year+'/'+versionNum,
                    async: false,
                    success: function(data){
                        monthProductVersion.push(xmlToJson(data).Entries.Entry);
                    }
                })
            }
            //console.log(quarterProductVersion);
            createVersionChart(monthProductVersion,version,1);
        }

    }else if(type==='week'){
        var num2 = 53;
        if(versionNum ==='Versions'){
            var weekProduct = [];
            for(var t = 0; t < num2;t++){
                $.ajax({
                    url: 'https://localhost:9443/services/PMT_Dashboard/getproductweek/'+(t+1)+'/'+product+'/'+year,
                    async: false,
                    success: function(data){
                        weekProduct.push(xmlToJson(data).Entries.Entry);
                    }
                })
            }

            createAllVersionCharts(weekProduct,listID,product,1);


        }else if(versionNum ==='Summary'){
            var weekTotalProduct = [];
            for(var n = 0; n <num2; n++){
                $.ajax({
                    url: 'https://localhost:9443/services/PMT_Dashboard/totalproductweek/'+(n+1)+'/'+product+'/'+year,
                    async: false,
                    success: function(data){
                        weekTotalProduct.push(xmlToJson(data).Entries.Entry);
                    }
                })
            }
            createVersionChart(weekTotalProduct,version,1);
        }else{
            var weekProductVersion = [];
            for(var n = 0; n <num2; n++){
                $.ajax({
                    url: 'https://localhost:9443/services/PMT_Dashboard/getproductversionweek/'+(n+1)+'/'+product+'/'+year+'/'+versionNum,
                    async: false,
                    success: function(data){
                        weekProductVersion.push(xmlToJson(data).Entries.Entry);
                    }
                })
            }
            console.log(weekProductVersion);
            createVersionChart(weekProductVersion,version,1);
        }

    }else if(type==='year'){
        showClick(listID,versionID);
    }
}
