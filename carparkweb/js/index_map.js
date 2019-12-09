
//返回一个元素对象
function returnEle(id) {      //元素对象id
    return document.getElementById(id);
}
//ip定位并以这个地方创建一个地图显示
function locationIpAndCreate(carParkArray) {
    let geolocation = new BMap.Geolocation() ;   //创建一个定位对象
    geolocation.getCurrentPosition(function (position) {
        if(this.getStatus() === BMAP_STATUS_SUCCESS){             //通过Geolocation类的getStatus（）可以判断是否已经成功定位
            var pt = position.point;    //获得定位的经纬度信息
            map = new BMap.Map("map");    //创建地图到ID元素容器
            map.centerAndZoom(new BMap.Point(pt.lng, pt.lat), 12);  // 初始化地图,设置中心点坐标和地图级别
            setMapEvent();       //设置地图事件
            addMapControl();     //向地图添加控件
            addMapOverlay(carParkArray);     //向地图添加覆盖物
        }else {
            switch (this.getStatus()) {
                case 2:
                    alert('位置结果未知 获取位置失败.');
                    break;
                case 3:
                    alert('导航结果未知 获取位置失败.');
                    break;
                case 4:
                    alert('非法密钥 获取位置失败.');
                    break;
                case 5:
                    alert('对不起,非法请求位置  获取位置失败.');
                    break;
                case 6:
                    alert('对不起,当前 没有权限 获取位置失败.');
                    break;
                case 7:
                    alert('对不起,服务不可用 获取位置失败.');
                    break;
                case 8:
                    alert('对不起,请求超时 获取位置失败.');
                    break;
            }
        }
    },{enableHignAccuracy: true} );//是否启用高精度  默认为false) ;
};

//设置地图事件
function setMapEvent(){
    map.enableScrollWheelZoom();     //启用滚轮放大缩小 ， 默认禁用
    map.enableKeyboard();            //启用键盘操作，默认禁用。键盘的上、下、左、右键可连续移动地图。同时按下其中两个键可使地图进行对角移动。PgUp、PgDn、Home和End键会使地图平移其1/2的大小。+、-键会使地图放大或缩小一级。
    // map.enableDragging();            //启用地图拖拽，默认启用。
    // map.enableDoubleClickZoom()      //启用双击放大，默认启用。
}
//向地图添加控件
function addMapControl(){
    var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
    map.addControl(scaleControl);
    var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(navControl);
    var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true,size:10});
    map.addControl(overviewControl);
}
//自定义标注
function addMapOverlay(carParkArray){
    let markers = [] ;
    for (let i = 0; i < carParkArray.length; i++) {
        if(carParkArray[i].type == 0){
            let carPark = {
                content:"剩余："+carParkArray[i].rest+"个车位<br>价格："+carParkArray[i].price+"元/小时<br><a href='javascript:;' class='custom_marker'>到这里去</a>",
                title:""+carParkArray[i].name,
                imageOffset: {width:0,height:-21},
                position:{lat:carParkArray[i].lat,lng:carParkArray[i].lng}
            };
            markers.push(carPark);
        }else{
            let carPark = {
                content:"剩余："+carParkArray[i].rest+"个车位<br>价格："+carParkArray[i].price+"元/小时<br><a href='javascript:;' class='custom_marker'>到这里去</a>",
                title:""+carParkArray[i].name,
                imageOffset: {width:-46,height:-21},
                position:{lat:carParkArray[i].lat,lng:carParkArray[i].lng}
            };
            markers.push(carPark);
        }
    }
    for(let index = 0; index < markers.length; index++ ){
        let point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);   //创建坐标
        let marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
                imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
            })});    //创建一个标点
        let label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});   //新建一个文本标注
        let opts = {
            width: 200,
            title: markers[index].title,
            enableMassClear:false ,
            enableMessage: false
        };
        let infoWindow = new BMap.InfoWindow(markers[index].content,opts);   //创建一个信息窗口
        marker.setLabel(label);   //把文本标注放入标点中
        addClickHandler(marker,infoWindow);  //添加个点击监听事件 标点  -> 点击  -> 打开信息窗口
        map.addOverlay(marker);    //把这个标点添加入覆盖物 (也就是自己创建的一些地方 ——》 称为覆盖物)
    };
};
//监听markers中的点击事件
function addClickHandler(target,window){
    target.addEventListener("click",function(){
        target.openInfoWindow(window);
    });
};
//向地图添加控件
function addMapControl(){
    var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});    //创建一个比例尺控件。
    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);       //设置比例尺单位制。
    map.addControl(scaleControl);
    var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});    //创建一个特定样式的地图平移缩放控件。
    map.addControl(navControl);
    var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true,size:10}); //创建一个缩略地图控件实例。
    map.addControl(overviewControl);
}


