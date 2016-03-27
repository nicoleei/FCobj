/**
 * @namespace 通用工具包
 * @author qualc
 * @version 1.1.0
 */
var Gutils = {};
/**
 * 输出日志
 * @param  {string} msg 需要输出的信息
 * @return {string} null
 */
Gutils.logInfo = function (msg){
    window.console ? console.log(msg) : alert(msg);
}
/**
 * 输出错误日志
 * @private
 * @param  {string} msg 需要输出的信息
 * @return {string} null
 */
Gutils.logError = function (msg, funcName){
    window.console ? console.log('%cError: '+(funcName ?  ' for function '+ funcName +'----- ': '' ) + msg, 'color:red;') : null;
}
/**
 * 输出警告日志
 * @private
 * @param  {string} msg 需要输出的信息
 * @return {string} null
 */
Gutils.logWarning = function (msg, funcName){
    window.console ? console.log('%cWarning: '+(funcName ?  ' for function'+ funcName +'----- ': '' ) + msg, 'color:yellow;') : null;
}
/**
 * 判断对象是否为yyay数组
 * @param  {object} obj 检测对象
 * @return {boolean} 检测结果true|false
 */
Gutils.isArray = function (obj) {   
  return Object.prototype.toString.call(obj) === '[object Array]';    
}  
/**
 * 只能输入数字
 * @param {string} className 限制input的class
 */
Gutils.setInputOnlyNum = function(className){
   $("."+className).keydown(function(event){
    if (navigator.userAgent.indexOf("MSIE")>0) { 
    if ( ((event.keyCode > 47) && (event.keyCode < 58)) || ((event.keyCode >= 96) && (event.keyCode <= 105)) 
    || (event.keyCode == 8) || (event.keyCode == 86) || (event.keyCode == 67) || (event.keyCode == 13)
    || (event.keyCode == 27) || (event.keyCode == 45) || (event.ctrlKey && event.keyCode == 13) || (event.keyCode == 9)) { 
    return true;  
    } else {  
    return false;  
    }
    } else {  
    if ( ((event.which > 47) && (event.which < 58)) || ((event.keyCode >= 96) && (event.keyCode <= 105)) 
    || (event.which == 8) || (event.which == 86) || (event.keyCode == 67) || (event.keyCode == 13)
    || (event.keyCode == 27) || (event.keyCode == 45) || (event.ctrlKey && event.keyCode == 13) || (event.keyCode == 9)) {  
    return true;  
    } else {  
    return false;  
    }  
    }
    }).bind("blur", function() {
    if (!/\d+/.test(this.value) || this.value.indexOf(' ') >= 0) {
    this.value = "";
    }
    
    //if (this.value.substr(0,1)==',') this.value=this.value.substr(1);
    }).bind("input", function(e) {
    if (isNaN(this.value) || this.value.indexOf(' ') >= 0)
    this.value = this.value.replace(/\D/g, "");
    }).bind("propertychange", function(e) {
    if (isNaN(this.value) || this.value.indexOf(' ') >= 0)
    this.value = this.value.replace(/\D/g, "");
    }).focus(function() {
    this.style.imeMode='disabled';  
    }).bind("dragenter",function(){  
    return false;  
    }).keyup(function(event){
     if (!/\d+/.test(this.value) || this.value.indexOf(' ') >= 0) {
    this.value = "";
    }
    if(isNaN($(this).val()) || this.value.indexOf(' ') >= 0){
    $(this).val("");
    return;
    }
   });
}
/**
 * 删除指定字符串最后一个字符
 * @param  {string} str 操作字符串
 * @return {string} 操作后字符串
 */
Gutils.deleteLastChar = function (str){
    return str.substr(0, str.length-1);
};
/**
 * 根据className获取dom元素
 * @param  {object} oPare [父元素/容器]
 * @param  {string} cla   [class字段]
 * @return {Array}       [获取到的对象数组]
 */
Gutils.getClass = function(oPare, cla){
    var oChild = oPare.getElementsByTagName("*");
    var arr = [];
    for (var i = 0; i < oChild.length; i++) {
        var arrCla = oChild[i].className.split(" ");
        var j;
        for (var j in arrCla) {
            if (arrCla[j] == cla) {
                arr.push(oChild[i]);
                break;
            }
        }
    }
    return arr;
}
Gutils.shadeCopy = function (){
    var shadeCopy = $('.shadeCopy');
    //var shadeHtml = $('<div class="Gutils_shade" style="display:none;" ><div style="position:absolute;top:0;left:0;width:100%;height:100px;filter:alpha(opacity=50);-moz-opacity:0.5;opacity:0.5;background-color:#fff;"></div><div  style="position:absolute;top:40%;left:40%;background-color:#fff;color:#000;width:40px;height:20px;cursor:pointer;" class="shadeClick">复制</div></div>');
    var Gutils_shade = null;
    shadeCopy.hover(
        function (){
            Gutils_shade = $('.Gutils_shade', this) ;
            Gutils_shade.show();
            
        },
        function (){
            Gutils_shade.hide();
            Gutils_shade = null;
        }
    );
}


var currentPage = 0;//当前页 0 = 首页
var intAllCount = 0; //数据总数量
var pageSize = 10; //每页显示条数
var pageCount = 10; //默认加载数量
var maxPage = 0; //最大分页
var oldParamsStr = '';
var pageConfig = {

	init:function(cfg){//请求需要的参数
		this.params = cfg.params;
		this.ajaxUrl = cfg.ajaxUrl; //ajax路径
		this.succesFun = cfg.succesFun; //请求成功时调用
		this.errorFun = cfg.errorFun; //请求失败时调用
		this.beforeFun = cfg.beforeFun || function(){return true;};//执行ajax前调用
		pageSize = cfg.pageSize ? cfg.pageSize : 10 ;
	}
	
};

//请求
function getJosnToAjax(){
	pageConfig.beforeFun();
	var paramsStr = paramsToString(pageConfig.params);
    if(paramsStr != oldParamsStr){
        currentPage = 0;
    }
    oldParamsStr = paramsStr;
	$.ajax({
		url:pageConfig.ajaxUrl,
		dataType:'json',
		type:'post',
		data:{'params':paramsStr,'currentPage':currentPage,'pageSize':pageSize},
		success:function(msg) {
			pageConfig.succesFun(msg);

			intAllCount = msg.intAllCount;
			if(intAllCount == undefined){ intAllCount = 0; }
			pages();
			
			iframeHeight($('#wrap').height()+50);
		},
		error:function(a,b,c){
			pageConfig.errorFun(a,b,c);
		}
	});
}

//page
function pages(){

	var html = '';
	maxPage = parseInt(intAllCount/pageSize,10);
	if(intAllCount%pageSize > 0){ maxPage++; }

	if(maxPage<currentPage){//当前页面大于总页数时返回首页
		currentPage = 0;
	}

	var start = pageCount*parseInt(currentPage/pageCount,10);// 开始值
	var end = start+pageCount;// 结束值
	if(end > maxPage){
		end = maxPage;
		if(maxPage >= pageCount){
			//start = end-pageSize;
			start = end-end%pageCount;
		}else{
			start = 0;
		}
	}
	for(var i=start;i<end;i++){
		
		html += '<li count="'+i+'" '+(currentPage==i?'class="curr"':'')+'>'+(i+1)+'</li>';
	}
	$('#pageArea').html(html);
	listEvent();
	
	//$('#pageArea li').removeClass('curr').eq(currentPage%pageSize).addClass('curr');
	$('#all_count').text(maxPage);
	
}

function loadDate(sameDay){
    $(".bett_list ul li").each(function(i){   //投注记录的全部订单、我的代购、追号查询切换
        $(this).click(function(){
        $(this).addClass('curr').siblings().removeClass('curr');
        $(".bett_con:eq("+i+")").show().siblings(".bett_con").hide();
        })
    });
	
	var currentDate=new Date();  //获取当前时间
    var year=currentDate.getFullYear();
    var month=currentDate.getMonth()+1;
    var day=currentDate.getDate();
    month = month<10 ? "0"+month:month;
    day = day<10 ?"0"+day:day;
    var beginDate=year+"-"+month+"-01";
    var endDate=year+"-"+month+"-"+day;
    $("#date").val(sameDay ? endDate : beginDate);
    $("#date1").val(endDate);
	
    try{
        $( "#date" ).datepicker({ //日历1
            autoSize: true,
            dateFormat: 'yy-mm-dd',
            dayNamesMin:["周日","周一","周二","周三","周四","周五","周六"],
            monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
        });
        $( "#date1" ).datepicker({  //日历2
            autoSize: true,
            dateFormat: 'yy-mm-dd',
            dayNamesMin:["周日","周一","周二","周三","周四","周五","周六"],
            monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
        });
        $( "#date1" ).change(function(){
            console.log('0')
            var d1v = $( "#date" )[0].value;
            var date1 = new Date(this.value.replace(/\-/g,'/')), 
                date = new Date(d1v.replace(/\-/g,'/'));
            if(date > date1){
                alert('开始日期不能大于结束日期!')
                this.value = d1v;
            }
        })
    }catch(e){
        Gutils.logError('加载时间控件失败, ERROR : '+ e);
    }
}
//居中
jQuery.fn.center = function (loaded) {
        var obj = this;
        body_width = parseInt($(window).width());
        //body_height = parseInt($(window).height());
        //body_width = getWidth();
        body_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight;
        block_width = parseInt(obj.width());
        block_height = parseInt(obj.height());
        left_position = parseInt((body_width) / 2 - (block_width) / 2 + $(window).scrollLeft());
        if (body_width < block_width) {
            left_position = 0 + $(window).scrollLeft();
        }
        ;
        top_position = parseInt((body_height / 2) - (block_height / 2) + $(window).scrollTop());
        if (body_height < block_height) {
            top_position = 0 + $(window).scrollTop();
        };
        if (!loaded) {
            obj.css({'position':'absolute'});
            obj.css({ 'top':top_position, 'left':left_position });
            $(window).bind('resize', function () {
                obj.center(!loaded);
            });
            $(window).bind('scroll', function () {
                obj.center(!loaded);
            });

        } else {
            obj.stop();
            obj.css({'position':'absolute'});
            obj.animate({ 'top':top_position }, 200, 'linear');
        }
    }
function paramsToString(obj){
	var str ='{"param":[';
	var i = 0;
	for(var key in obj){
		if(i !== 0){ str += ','; }; i++;
		str += '{"'+key+'":"'+utf8ToGBK(obj[key].val())+'"}';
		
	}
	str += ']}';
	return str;
}
function utf8ToGBK(s){
    return encodeURI(encodeURI(s ? s.replace(/(^\s*)|(\s*$)/g,'') : ''));   
}

//查询
$('#search').click(function(){
	getJosnToAjax();
});

//访问首页
$('#first_page').click(function(){
	currentPage = 0;
	getJosnToAjax();
});

//访问尾页
$('#last_page').click(function(){
	currentPage = maxPage-1;
	getJosnToAjax();
});

$('#prev_page').not('.not').click(function(){
	var start = $('#pageArea li').first().text()*1-pageCount -1;
	if(start < 0){ return false; }
	pageChange(start,(start+ pageCount) < maxPage ? (start+pageCount) : maxPage);
});

$('#next_page').click(function(){
	var start = $('#pageArea li').last().text()*1;
	if(start == maxPage){ return false; }
	pageChange(start,(start+pageCount) < maxPage ? (start+pageCount) : maxPage);
});

function listEvent(){
	$('#pageArea li').click(function(){
		currentPage = $(this).attr('count');
		getJosnToAjax();
	});
}

function pageChange(start,end){
	var html = '';
	for(var i=start;i<end;i++){
		html += '<li count="'+i+'" '+(currentPage==i?'class="curr"':'')+'>'+(i+1)+'</li>';
	}
	$('#pageArea').html(html);
	listEvent();
}

$('#go_submit').click(function(){
	var val = $('#go_page').val();
	if(regExNumber(val) == false || val > maxPage){
		alert('请输入正确的页码！');
		$('#go_page').focus();
	}else{
		currentPage = val-1;
		getJosnToAjax();
	}
});

function regExNumber(s){
	var modus= /^\+?[1-9][0-9]*$/;
	if (!modus.exec(s)){ return false; }
}

function regExMnumber(s){
	var modus=/^0?(13|15|18|17)[0-9]{9}$/;  //联系人手机：格式》 13|15|18|17开头 11位数字
	if (!modus.exec(s)){ return false; }
}

//iframeHeight
function iframeHeight(h){
	window.parent.document.getElementById("iframeArea").style.height = h+'px';
}


/**
 * 获取采种列表
 * @return {null}
 */
function getJsonToAjaxLotList(lotid){
    $.ajax({    
         url:'/caipiao_simple/home/jsp/member/getAllLotoInfo.jsp',
         type:"post", 
         dataType:"json",  
         cache: false,
         success:function(data)//当请求成功时触发函数
         {   
            //var data = jQuery.parseJSON( json_info );  //把josn数据解析为JS对象
            lotid.html("");
            var optgroupVar ="<option value='' selected='selected'>全部</option>";
            if (data['result']) {
                var map = new Map();
                //循环 组装map
                for (var i = 0; i < data['result'].length; i++) {
                    var op = new Map();
                    op.put(data['result'][i]['ID'],data['result'][i]['NAME']);
                    map.put(data['result'][i]['TYPE'],op);
                }
            }else{
                optgroupVar = "<option value='all' selected='selected'>全部</option>";
            }
            //循环取出map中的值  绑定页面
            var tempkey=new Array()
            for (var i = 0; i < map.size(); i++) {
                var temp= map.valuesByKey(map.key(i));
                if(optgroupVar.indexOf(map.key(i)) == -1){  //判断type 是否包含在之前的代码中
                    optgroupVar+="<optgroup label='"+map.key(i)+"'></optgroup>";
                    for (var key in temp) {
                        if(temp[key].keys() == lotid){
                            optgroupVar+="<option selected='selected' value='"+temp[key].keys()+"'> &nbsp; "+temp[key].values()+"</option>";
                        }else{
                            optgroupVar+="<option value='"+temp[key].keys()+"'> &nbsp; "+temp[key].values()+"</option>";
                        }
                   }
                }
            }
            lotid.html(optgroupVar); 
         }
     });
}
/**
 * 获取网店编号列表
 * @param  {jQuery}  存放option的select对象
 * @return {null}
 */
function getJsonToAjaxSalePointNo(salePointNo){
    $.ajax({    
         url: '/caipiao_simple/home/jsp/o2o/superboss/getSalePointList.js',
         type:"get", 
         dataType:"json",  
         cache: false,
         success:function(data)//当请求成功时触发函数
         {   
            //var data = jQuery.parseJSON( json_info );  //把josn数据解析为JS对象
            salePointNo.html("");
            var optgroupVar ='<option value="" selected="selected">全部</option>';
            if(Gutils.isArray(data['result'])){
                var result = data['result'];
                for(var i = 0 ; i < result.length ; i ++){
                    var detail = result[i];
                    optgroupVar += '<option value="' + detail['SALE_POINT_NO'] + '">' + detail['SALE_POINT_NAME'] + '</option>';
                }
            }
            salePointNo.html(optgroupVar);
         }
     });
}

/**
 * 获取省份列表
 * @param  {jQuery}  存放option的select对象
 * @return {null}
 */
function getJsonToAjaxProvice(province){
    $.ajax({    
         url:'/caipiao_simple/home/jsp/o2o/superboss/getProviceCenterNoList.jsp',
         type:"post", 
         dataType:"json",  
         cache: false,
         success:function(data)//当请求成功时触发函数
         {   
            //var data = jQuery.parseJSON( json_info );  //把josn数据解析为JS对象
            province.html("");
            var optgroupVar ='<option value="" selected="selected">全部</option>';
            if(Gutils.isArray(data['result'])){
                var result = data['result'];
                for(var i = 0 ; i < result.length ; i ++){
                    var detail = result[i];
                    optgroupVar += '<option value="' + detail['proviceCenterNo'] + '">' + detail['proviceCenterName'] + '</option>';
                }
            }
            province.html(optgroupVar);
         }
     });
};

/**
 * 根据省份获取网店编号列表
 * @param  {jQuery}  存放option的select对象
 * @return {null}
 */
function getJsonToAjaxSalePointNoByProvcince(salePointNo,province){
    if(!province){
        salePointNo.html('<option value="" selected="selected">全部</option>');
        return false;
    }
    $.ajax({    
         url: '/caipiao_simple/home/jsp/o2o/superboss/getSalePointListByProviceNo.jsp?proviceCenterNo='+province,
         type:"post", 
         dataType:"json",  
         cache: false,
         success:function(data)//当请求成功时触发函数
         {   
            //var data = jQuery.parseJSON( json_info );  //把josn数据解析为JS对象
            salePointNo.html("");
            var optgroupVar ='<option value="" selected="selected">全部</option>';
            if(Gutils.isArray(data['result'])){
                var result = data['result'];
                for(var i = 0 ; i < result.length ; i ++){
                    var detail = result[i];
                    optgroupVar += '<option value="' + detail['salePointNo'] + '">' + detail['salePointNo'] + '-' + detail['salePointName'] + '</option>';
                }
            }
            salePointNo.html(optgroupVar);
         }
     });
}