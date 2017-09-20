//get dashboard-top div element counts

//get total count of queued patches in database
$.ajax({
    url: 'https://localhost:9443/services/PMT_Dashboard/getqueue',
    success: function(data){
        document.getElementById('queuedPatchCount').innerHTML = xmlToJson(data).Qcount.TotalCount.total;
    }
})

$.ajax({
    url: 'https://localhost:9443/services/PMT_Dashboard/getcomplete',
    success: function(data){
        document.getElementById('completePatchCount').innerHTML = xmlToJson(data).Entries.Entry.total;
    }
})

$.ajax({
    url: 'https://localhost:9443/services/PMT_Dashboard/getprocess',
    success: function(data){
        document.getElementById('inProcessPatchCount').innerHTML = xmlToJson(data).Entries.Entry.total;
    }
})

$.ajax({
    url: 'https://localhost:9443/services/PMT_Dashboard/getdeletecount',
    success: function (data) {
        document.getElementById('deletedPatchCount').innerHTML = xmlToJson(data).Entries.Entry.total;
    }
})

//load drill down
var totalProducts = 0;
$.ajax({
    url: 'https://localhost:9443/services/PMT_Dashboard/getproducts',
    success: function (data) {
        totalProducts = xmlToJson(data).Entries.Entry.length;
        document.getElementById('product').innerHTML = "";

        for (var x = 0; x < totalProducts; x++) {
            document.getElementById('product').innerHTML += "<a href='#collapseProduct"+(parseInt(x)+1)+"' data-toggle='collapse' id='product"+(parseInt(x)+1)+"' class='list-group-item'>"
                + xmlToJson(data).Entries.Entry[x].products +
                "<span id='productCount"+(parseInt(x)+1)+"' class='badge' style='background-color:#DC143C;'></span></a>" +
                "<div id='collapseProduct"+(parseInt(x)+1)+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingOne'>" +
                "<div>" +
                "<ul id='productVersion"+(parseInt(x)+1)+"'>"+
                ""+
                "</ul>"+
                "</div>" +
                "</div>"
        }
    }
})

//show the number of patches currently on working and queued in drill down
$.ajax({
    url: 'https://localhost:9443/services/PMT_Dashboard/getlistcount',
    success: function (data) {
        var count = xmlToJson(data).Entries.Entry.length;
        for(var x=0;x<totalProducts;x++){
            for(var y=0;y<count;y++){
                var element =  document.getElementById('product'+(parseInt(x)+1)).innerHTML;
                if(element.split("<span")[0].trim() === xmlToJson(data).Entries.Entry[y].PRODUCT_NAME.trim()){
                    document.getElementById('productCount'+(parseInt(x)+1)).innerHTML = xmlToJson(data).Entries.Entry[y].total;
                }
            }
        }
    }
})

//get versions to left side drill down
$.ajax({
    url: 'https://localhost:9443/services/PMT_Dashboard/geversions',
    success: function (data) {
        var count = xmlToJson(data).Entries.Entry.length;
        for(var x=0;x<totalProducts;x++){
            //set first option as All versions
            document.getElementById('productVersion'+(parseInt(x)+1)).innerHTML +=
                "<button onclick='showClick("+(parseInt(x)+1)+","+1+")'  class='list-group-item list-group-item-info' id='subVersion1'>Total Summary"+
                "</button>" +
                "<button onclick='showClick("+(parseInt(x)+1)+","+0+")'  class='list-group-item list-group-item-info' id='subVersion0'>All Versions"+
                "</button>";
            for(var y=0;y<count;y++){
                var element =  document.getElementById('product'+(parseInt(x)+1)).innerHTML;
                if(element.split("<span")[0].trim() === xmlToJson(data).Entries.Entry[y].PRODUCT_NAME){
                    document.getElementById('productVersion' + (parseInt(x) + 1)).innerHTML +=
                        "<button onclick='showClick(" + (parseInt(x) + 1) + "," + (parseInt(y) + 1) + ")'  class='list-group-item list-group-item-info' id='subVersion" + (parseInt(y) + 1) + "'>Version " +
                        xmlToJson(data).Entries.Entry[y].VERSION +
                        "</button>";
                }
            }
        }
    }
})
