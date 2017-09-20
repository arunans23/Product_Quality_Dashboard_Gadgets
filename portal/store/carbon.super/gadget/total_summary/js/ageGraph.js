//create x axis last 12 months up to current month
var now = new Date();
var months = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November","December"];
var lastMonthsName = [];
var lastMonthsNumber = [];

function getMonth(monthStr){
    return new Date(monthStr+'-1-01').getMonth()+1
}

var lastday = function(y,m){
    return  new Date(y, m +1, 0).getDate();
};

now.setMonth(now.getMonth());
lastMonthsName[11]=months[now.getMonth()]+' '+now.getFullYear();
lastMonthsNumber[11]=now.getFullYear()+'-'+getMonth(months[now.getMonth()])+'-'+now.getDate();
for(var i=0; i<=10;i++){
    now.setMonth(now.getMonth()-1);
    //console.log(i+"="+(now.getMonth()-1));
    lastMonthsName[10-i]=months[now.getMonth()]+' '+now.getFullYear();
    lastMonthsNumber[10-i]=now.getFullYear()+'-'+getMonth(months[now.getMonth()])+'-'+lastday(now.getFullYear(),getMonth(months[now.getMonth()])-1);
}

//console.log(lastMonthsNumber);
console.log(lastMonthsName);

//fetch data from DSS using above date and factors
var getData = [];
var limitArray = [[0,7],[7,14],[14,30],[30,60],[60,90],[90]];
for(var x=0;x<5;x++){
    var temp = [];
    for(var y=0;y<12;y++){
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getage/'+lastMonthsNumber[y]+'/'+limitArray[x][1]+'/'+limitArray[x][0],
            async: false,
            success: function(data){
                temp.push(xmlToJson(data).Entries.Entry);
            }
        })
    }
    getData.push(temp);
}

var temp2 = [];
for(var l=0;l<12;l++){
    $.ajax({
        url: 'https://localhost:9443/services/PMT_Dashboard/getagelast/'+lastMonthsNumber[l]+'/'+limitArray[5][0],
        async: false,
        success: function(data){
            temp2.push(xmlToJson(data).Entries.Entry);
        }
    })
}
getData.push(temp2);

for(var m=0;m<6;m++){
    for(var c=0;c<12;c++){
       if(getData[m][c] === undefined){
           getData[m][c] = 0;
       }else if(getData[m][c].length === undefined){
           getData[m][c] = 1;
       }else{
           getData[m][c] = getData[m][c].length;
       }
    }
}


//console.log(getData);

//draw age  graph
Highcharts.chart('ageContainer', {
    chart: {
        type: 'area',
    },
    colors: ['#39AA59', '#CEAE22', '#3E90BC','#B787E6','#ea780e','#F85858'].reverse(),
    title: {
        text: 'Age of queued patches during the last year'
    },
    xAxis: {
        categories: lastMonthsName,
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Patch count'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    tooltip: {
        split: true,
        valueSuffix: ' patches'
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            cursor: 'pointer',
            trackByArea: true,
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            },
            point: {
                events: {
                    click: function(event) {
                        showStackBarChart (this.category,event.point.series.name);
                    }
                }
            }
        }
    },
    series: [{
        name: 'Age > 90 Days',
        data: getData[5]
    },{
        name: 'Age < 90 Days',
        data: getData[4]
    },{
        name: 'Age < 60 Days',
        data: getData[3]
    },{
        name: 'Age < 30 Days',
        data: getData[2]
    },{
        name: 'Age < 14 Days',
        data: getData[1]
    },{
        name: 'Age < 7 Days',
        data: getData[0]
    }]
});

function showStackBarChart(date,vars){
    //alert(vars);
    document.getElementById('stackTab').style.display = 'block';
    document.getElementById('fullDiv').style.height = '1300px';

    var indexOf = lastMonthsName.indexOf(date);
    var getMonth = lastMonthsNumber[indexOf];
    //alert(getMonth);

    if(vars === 'Age > 90 Days'){
        var temp2 = [];
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getqueuestack2/'+getMonth+'/'+limitArray[5][0],
            async: false,
            success: function(data){
                temp2 = xmlToJson(data).Entries.Entry;
            }
        });

        console.log(temp2);

        var dataFeedArray = [];
        var length = 0;
        if(temp2 === undefined){
            alert("No any patches in the queue");
        }else if(temp2.length === undefined){
            length =1;
            for (var g = 0; g < length; g++) {
                var temp21={name:"x",y:0};
                temp21.name = temp2.PRODUCT_NAME;
                temp21.y = parseInt(temp2.age);
                dataFeedArray.push(temp21);
            }

            drawStackBar(vars,getMonth,dataFeedArray);
        }else{
            length = temp2.length;
            for (var g = 0; g < length; g++) {
                var temp21={name:"x",y:0};
                temp21.name = temp2[g].PRODUCT_NAME;
                temp21.y = parseInt(temp2[g].age);
                dataFeedArray.push(temp21);
            }

            drawStackBar(vars,getMonth,dataFeedArray);
        }
    }else if(vars === 'Age < 90 Days'){
        var temp3 = [];
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getqueuestack1/'+getMonth+'/'+limitArray[4][1]+'/'+limitArray[4][0],
            async: false,
            success: function(data){
                temp3 = xmlToJson(data).Entries.Entry;
            }
        });

        var dataFeedArray2 = [];
        var length = 0;
        if(temp3 === undefined){
            alert("No any patches in the queue");
        }else if(temp3.length === undefined){
            length =1;
            for (var g = 0; g < length; g++) {
                var temp31={name:"x",y:0};
                temp31.name = temp3.PRODUCT_NAME;
                temp31.y = parseInt(temp3.age);
                dataFeedArray2.push(temp31);
            }

            drawStackBar(vars,getMonth,dataFeedArray2);
        }else{
            length = temp3.length;
            for (var g = 0; g < length; g++) {
                var temp31={name:"x",y:0};
                temp31.name = temp3[g].PRODUCT_NAME;
                temp31.y = parseInt(temp3[g].age);
                dataFeedArray2.push(temp31);
            }

            drawStackBar(vars,getMonth,dataFeedArray2);
        }

    }else if(vars === 'Age < 60 Days'){
        var temp4 = [];
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getqueuestack1/'+getMonth+'/'+limitArray[3][1]+'/'+limitArray[3][0],
            async: false,
            success: function(data){
                temp4 = xmlToJson(data).Entries.Entry;
            }
        });

        var dataFeedArray3 = [];
        var length = 0;
        if(temp4 === undefined){
            alert("No any patches in the queue");
        }else if(temp4.length === undefined){
            length =1;
            for (var g = 0; g < length; g++) {
                var temp41={name:"x",y:0};
                temp41.name = temp4.PRODUCT_NAME;
                temp41.y = parseInt(temp4.age);
                dataFeedArray3.push(temp41);
            }

            drawStackBar(vars,getMonth,dataFeedArray3);
        }else{
            length = temp4.length;
            for (var g = 0; g < length; g++) {
                var temp41={name:"x",y:0};
                temp41.name = temp4[g].PRODUCT_NAME;
                temp41.y = parseInt(temp4[g].age);
                dataFeedArray3.push(temp41);
            }

            drawStackBar(vars,getMonth,dataFeedArray3);
        }

    }else if(vars === 'Age < 30 Days'){
        var temp5 = [];
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getqueuestack1/'+getMonth+'/'+limitArray[2][1]+'/'+limitArray[2][0],
            async: false,
            success: function(data){
                temp5 = xmlToJson(data).Entries.Entry;
            }
        });

        var dataFeedArray4 = [];
        var length = 0;
        if(temp5 === undefined){
            alert("No any patches in the queue");
        }else if(temp5.length === undefined){
            length =1;
            for (var g = 0; g < length; g++) {
                var temp51={name:"x",y:0};
                temp51.name = temp5.PRODUCT_NAME;
                temp51.y = parseInt(temp5.age);
                dataFeedArray4.push(temp51);
            }

            drawStackBar(vars,getMonth,dataFeedArray4);
        }else{
            length = temp5.length;
            for (var g = 0; g < length; g++) {
                var temp51={name:"x",y:0};
                temp51.name = temp5[g].PRODUCT_NAME;
                temp51.y = parseInt(temp5[g].age);
                dataFeedArray4.push(temp51);
            }

            drawStackBar(vars,getMonth,dataFeedArray4);
        }

        drawStackBar(vars,getMonth,dataFeedArray4);
    }else if(vars === 'Age < 14 Days'){
        var temp6 = [];
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getqueuestack1/'+getMonth+'/'+limitArray[1][1]+'/'+limitArray[1][0],
            async: false,
            success: function(data){
                temp6 = xmlToJson(data).Entries.Entry;
            }
        });

        var dataFeedArray5 = [];
        var length = 0;
        if(temp6 === undefined){
            alert("No any patches in the queue");
        }else if(temp6.length === undefined){
            length =1;
            for (var g = 0; g < length; g++) {
                var temp61={name:"x",y:0};
                temp61.name = temp6.PRODUCT_NAME;
                temp61.y = parseInt(temp6.age);
                dataFeedArray5.push(temp61);
            }

            drawStackBar(vars,getMonth,dataFeedArray5);
        }else{
            length = temp6.length;
            for (var g = 0; g < length; g++) {
                var temp61={name:"x",y:0};
                temp61.name = temp6[g].PRODUCT_NAME;
                temp61.y = parseInt(temp6[g].age);
                dataFeedArray5.push(temp61);
            }

            drawStackBar(vars,getMonth,dataFeedArray5);
        }
    }else if(vars === 'Age < 7 Days'){
        var temp7 = [];
        $.ajax({
            url: 'https://localhost:9443/services/PMT_Dashboard/getqueuestack1/'+getMonth+'/'+limitArray[0][1]+'/'+limitArray[0][0],
            async: false,
            success: function(data){
                temp7 = xmlToJson(data).Entries.Entry;
            }
        });

        // console.log(temp7);

        var dataFeedArray6 = [];
        var length = 0;
        if(temp7 === undefined){
            alert("No any patches in the queue");
        }else if(temp7.length === undefined){
            length =1;
            for (var g = 0; g < length; g++) {
                var temp71={name:"x",y:0};
                temp71.name = temp7.PRODUCT_NAME;
                temp71.y = parseInt(temp7.age);
                dataFeedArray6.push(temp71);
            }

            drawStackBar(vars,getMonth,dataFeedArray6);
        }else{
            length = temp7.length;
            for (var g = 0; g < length; g++) {
                var temp71={name:"x",y:0};
                temp71.name = temp7[g].PRODUCT_NAME;
                temp71.y = parseInt(temp7[g].age);
                dataFeedArray6.push(temp71);
            }

            drawStackBar(vars,getMonth,dataFeedArray6);
        }
    }


}

function drawStackBar(vars,date,array) {
    Highcharts.chart('stackBar', {
        chart: {
            type: 'column'
        },
        title: {
            text: vars+' patch counts up to to '+date
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'No of patches'
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
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
        },

        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: array
        }]
    });
}
