// 百度地图API功能
var map = new BMap.Map("bdmap");
//百度地图使用api接口key
var ak = "ePbxTEzN21xfMEmDti2tjhnFGMxcGOZM";

//关键字检索
function G(id) {
    return document.getElementById(id);
}

// map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
function showInfo(e){
    //alert(e.point.lat + ", " + e.point.lng);
    //点击后显示地理信息
    var lo = +e.point.lat + "," + e.point.lng;

    //ajax调用百度地图api
    jQuery.ajax({
        type: "get",
        dataType: "jsonp",
        url: "http://api.map.baidu.com/geocoder/v2/?location=" + lo + "&output=json&ak=AnIIhOQq2XZK0IKIHny4h7FXTonzPKrX",
        success: function (data) {

            //alert(data.result.city);
            //$('#city').text(data.toJSONString().parseJSON().status);
            var address = data.result.addressComponent;
            jQuery('#province').val(address.province);
            console.log(jQuery('#province').val(address.province));
            jQuery('#city').val(address.city);
            console.log(jQuery('#city').val(address.city));
            jQuery('#country').val(address.district);
            console.log(jQuery('#country').val(address.district));
            var s = address.street + address.street_number;
            //alert(data.result.sematic_description);
            s += data.result.sematic_description;
            console.log(s);

            jQuery('#add_detail').val(s);

            jQuery('#location').val(data.result.location.lat + "," + data.result.location.lng);
        }
    });
}
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
        currentPonit = r.point;
        isLocated = true;
        map.centerAndZoom(r.point,14);
        map.panTo(r.point);
        // 创建地理编码实例
        var myGeo = new BMap.Geocoder();
        // 根据坐标得到地址描述
        myGeo.getLocation(r.point, function(result){
            if (result){
                currentAddress = result.address;
            }
        });
    }
    else
    {
        alert("定位失败："+this.getStatus());
    }
},{enableHighAccuracy: true});

map.addEventListener("click", showInfo);
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
    {"input" : "suggestId"
        ,"location" : map
    });

ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
    var str = "";
    var _value = e.fromitem.value;
    var value = "";
    if (e.fromitem.index > -1) {
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    }
    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

    value = "";
    if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    }
    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    G("searchResultPanel").innerHTML = str;
});

var myValue;
ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
    var _value = e.item.value;
    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
    setPlace();
});
$("#suggestId").keydown(function (e) {
    map.clearOverlays();    //清除地图上所有覆盖物
    geoc =new BMap.Geocoder();
    function myFun(){
        var pp = $("#suggestId");    //获取第一个智能搜索的结果
        geoc.getPoint(pp,function (e) {
            console.log(e);
            map.centerAndZoom(e, 18);
            map.addOverlay(new BMap.Marker(e));    //添加标注
        });
    }
    var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    local.search(myValue);
});
function setPlace(){
    map.clearOverlays();    //清除地图上所有覆盖物
    function myFun(){
        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
        console.log(pp);
        map.centerAndZoom(pp, 18);
        map.addOverlay(new BMap.Marker(pp));    //添加标注
    }
    var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    local.search(myValue);
}
