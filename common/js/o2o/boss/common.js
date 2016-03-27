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
 * 根据className获取dom远素
 * @param  {object} oPare [父远素/容器]
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



    ///shadeCopyObj
}
/*
Gutils.CopyAndPaste = function (innerText){
    if($.browser.msie){  
        ie_set();  
    }else{  
        ff_set();  
    }  
    function ie_Show() {  
        //得到剪贴板的内容  
        var str1=window.clipboardData.getData("text");  
        alert(str1);  
    }  
  
    function ff_show() {  
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');  
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);  
        if (!clip) return;  
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);  
        if (!trans) return;  
        trans.addDataFlavor('text/unicode');  
        clip.getData(trans, clip.kGlobalClipboard);  
        var str = new Object();  
        var len = new Object();  
        try {  
            trans.getTransferData('text/unicode', str, len);  
        } catch(error) {  
            return null;  
        }  
        if (str) {  
            if (Components.interfaces.nsISupportsWString) strstr = str.value.QueryInterface(Components.interfaces.nsISupportsWString);  
            else if (Components.interfaces.nsISupportsString) strstr = str.value.QueryInterface(Components.interfaces.nsISupportsString);  
            else str = null;  
        }  
        if (str) {  
            alert(str.data.substring(0, len.value / 2));  
            return (str.data.substring(0, len.value / 2));  
        }  
        return null;  
    }  
      
    function ie_set(){  
        //显示剪贴板的内容是text类型的,给剪贴板的赋值为后面的字符串  
        window.clipboardData.setData("text",innerText);  
    }  
      
    function ff_set(){  
        //将copy变量的值放到内存当中去  
        var copy= innerText;  
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');  
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);  
        if (!clip) return;  
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);  
        if (!trans) return;  
        trans.addDataFlavor('text/unicode');  
        var str = new Object();  
        var len = new Object();  
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);  
        var copycopytext = copy;  
        str.data = copytext;  
        trans.setTransferData("text/unicode", str, copytext.length * 2);  
        var clipid = Components.interfaces.nsIClipboard;  
        if (!clip) return false;  
        clip.setData(trans, null, clipid.kGlobalClipboard);  
        alert(copy);  
    }
}
*/

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
		//this.pageCount = cfg.pageCount;
		//this.beforeFun = cfg.beforeFun || function(){return true;};//执行ajax前调用
		this.beforeFun = cfg.beforeFun ? cfg.beforeFun : function(){return true;};//执行ajax前调用
		
		pageSize = cfg.pageSize ? cfg.pageSize : 10 ;
	}
	
};

//请求
function getJosnToAjax(undefined){
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
			pageConfig.succesFun(msg,undefined);

			intAllCount = msg.intAllCount;
			if(intAllCount == undefined){ intAllCount = 0; }
			pages();
			if(!undefined || undefined.length < 1){ iframeHeight($('#wrap').height()+50); }
		},
		error:function(a,b,c){
			pageConfig.errorFun(a,b,c,undefined);
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
			//start = end-pageCount;
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
	
	//$('#pageArea li').removeClass('curr').eq(currentPage%pageCount).addClass('curr');
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
		if(typeof(obj[key]) == 'object'){
			str += '{"'+key+'":"'+utf8ToGBK(obj[key].val())+'"}';
		}else{
			str += '{"'+key+'":"'+utf8ToGBK(obj[key])+'"}';
		}
		
		
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
	var start = $('#pageArea li').first().text()*1-pageCount-1;
	if(start < 0){ return false; }
	pageChange(start,(start+pageCount) < maxPage ? (start+pageCount) : maxPage);
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


//打印 kmkim add 2015/06/23	

var isPrintTimer;
var map = new SimpleMap();

function SimpleMap(){
    this.items = window.parent.map;

    this.remove = function remove(key) {
        var v;
        for (var i = 0; i < this.items.length; i++) {
            v = this.items.pop() ;
            if(v[0]==key){
                continue;
            }
            this.items.unshift(v);
        }
        v = null ;
    };

    this.put=function put(key,value){
        this.items.push([key,value]);
    };

    this.set=function set(key,value){
        for(var i=0;i<this.items.length;i++){
            if(this.items[i][0]==key){
                this.items[i][1]=value;
                return true;
            };
        };
        return false;
    };
    this.clear = function clear() {
        this.items.length = 0 ;
    };
    this.get=function get(key){
        for(var i=0;i<this.items.length;i++){
            if(this.items[i][0]==key)
                return this.items[i][1];
        }
        return null;
    };
    this.search = function(value){
        if(this.items.length == 0){ return false; }
        for(var i=0;i<this.items.length;i++){
            if(this.items[i][1] == value){
                return true;
            };
        }
    };

    this.reMin = function(){

        var min = this.items[0][1];
        for(var i=0;i<this.items.length;i++){
            if(min > this.items[i][1]){ min = this.item[i][1]; };
        }
        //console.log(min);
        return min;//最小值
    }
    this.getLength=function(){
        return this.items.length;
    };
    this.getItem=function(row,col){
        return this.items[row][col];
    };
}

$('#btn_printClose').click(function(){
	timerControl = true;
	$('#PrintActiveX_Bg').hide();
	$('#PrintActiveX_Div').hide();
	clearInterval(isPrintTimer);
});

function checkPrintStatus(orderId,index,type) {
	var result = document.getElementById("PrintActiveX").getPrintStatus("check");
	//console.log("getPrintStatus=" + result);
    //var result = 'finished';
	if (result=="finished") {
        timerControl = true; /*kmkim mode 2015/07/02 打印成功之后 check 订单的 checkbox 同时 停止 iframe 的 自动刷新*/
        //$('.info_tab').eq(index).find('.checkbox_choose').prop('checked',true);

        clearInterval(isPrintTimer);
        map.put(orderId,orderId);
        $('.info_tab').eq(index).addClass('print_com');
        //2015/08/03 kmkim mod
        //if(type == 3){ location.href = location.href; }

		alert('打印成功！');
		$('#PrintActiveX_Bg').hide();
		$('#PrintActiveX_Div').hide();
	};
}

function merge_showPrintActiveX_Div(msg,piao) {

    var ticketid = '';
    var str = '';
    if(!piao){
        ticketid = 'all';
        for(var i=0;i<msg.TICKET.length;i++){ str += (i == 0 ? '' : '-') + msg.TICKET[i].ORDERDID + ',' +msg.TICKET[i].SUM; }
    }else{
        ticketid = msg.TICKET[piao].ORDERDID;
        str = msg.TICKET[piao].ORDERDID + ',' + msg.TICKET[piao].SUM;
    };
	//console.log(str)
    /*
    console.log('------order_id-----')
    console.log(msg.ORDERID)
    console.log('------ticket_num-----')
    console.log(msg.TICKET.length)
    console.log('------username-----')
    console.log(msg.USERNAME)
    console.log('------sale_point-----')
    console.log(window.parent.userInfo.result.SALE_POINT_NO)
    console.log('------total_sum-----')
    console.log(str)
    console.log('------ticketid-----')
    console.log(ticketid)
    */
	//document.getElementById("PrintActiveX").PutData('http://192.168.1.222/caipiao_simple/home/html/touzhudan/touzhudan.html?order_id='+msg.ORDERID+'&ticket_num='+msg.TICKET.length+'&username='+msg.USERNAME+'&sale_point='+window.parent.userInfo.result.SALE_POINT_NO+'&total_sum='+msg.TOTALSUM+'&perTicketSum='+str);
	document.getElementById("PrintActiveX").PutData('http://'+location.host+'/caipiao_simple/home/html/touzhudan/mergeOrderTouzhudan.html?order_id='+msg.ORDERID+'&ticket_num='+msg.TICKET.length+'&username='+msg.USERNAME+'&sale_point='+window.parent.userInfo.result.SALE_POINT_NO+'&total_sum='+str+'&ticketid='+ticketid);
	//document.getElementById("PrintActiveX").PutData('http://'+location.host+'/caipiao_simple/home/html/touzhudan/touzhudan.html?order_id='+msg.ORDERID+'&ticket_num='+msg.TICKET.length+'&username='+msg.USERNAME+'&sale_point='+window.parent.userInfo.result.SALE_POINT_NO);
	$('#PrintActiveX_Div').show();
	$('#PrintActiveX_Bg').show();
	$('#PrintActiveX_Div').css('top',(getScrollTop()<30 ? 30 : getScrollTop())+'px');
}
function showPrintActiveX_Div(msg,piao) {

    var ticketid = '';
    var str = '';
    if(!piao){
        ticketid = 'all';
        for(var i=0;i<msg.TICKET.length;i++){ str += (i == 0 ? '' : '-') + msg.TICKET[i].ORDERDID + ',' +msg.TICKET[i].SUM; }
    }else{
        ticketid = msg.TICKET[piao].ORDERDID;
        str = msg.TICKET[piao].ORDERDID + ',' + msg.TICKET[piao].SUM;
    };
	//console.log(str)
    /*
    console.log('------order_id-----')
    console.log(msg.ORDERID)
    console.log('------ticket_num-----')
    console.log(msg.TICKET.length)
    console.log('------username-----')
    console.log(msg.USERNAME)
    console.log('------sale_point-----')
    console.log(window.parent.userInfo.result.SALE_POINT_NO)
    console.log('------total_sum-----')
    console.log(str)
    console.log('------ticketid-----')
    console.log(ticketid)
    */
	//document.getElementById("PrintActiveX").PutData('http://192.168.1.222/caipiao_simple/home/html/touzhudan/touzhudan.html?order_id='+msg.ORDERID+'&ticket_num='+msg.TICKET.length+'&username='+msg.USERNAME+'&sale_point='+window.parent.userInfo.result.SALE_POINT_NO+'&total_sum='+msg.TOTALSUM+'&perTicketSum='+str);
	document.getElementById("PrintActiveX").PutData('http://'+location.host+'/caipiao_simple/home/html/touzhudan/touzhudan.html?order_id='+msg.ORDERID+'&ticket_num='+msg.TICKET.length+'&username='+msg.USERNAME+'&sale_point='+window.parent.userInfo.result.SALE_POINT_NO+'&total_sum='+str+'&ticketid='+ticketid);
	//document.getElementById("PrintActiveX").PutData('http://'+location.host+'/caipiao_simple/home/html/touzhudan/touzhudan.html?order_id='+msg.ORDERID+'&ticket_num='+msg.TICKET.length+'&username='+msg.USERNAME+'&sale_point='+window.parent.userInfo.result.SALE_POINT_NO);
	$('#PrintActiveX_Div').show();
	$('#PrintActiveX_Bg').show();
	$('#PrintActiveX_Div').css('top',(getScrollTop()<30 ? 30 : getScrollTop())+'px');
}

function getBonusStatus(funMsg,index,piao){

    $.ajax({
        url:'/caipiao_simple/home/jsp/o2o/boss/common/getBonusStatus.jsp',
        data:{projectid:funMsg.PROJECTID,orderid:funMsg.ORDERID},
        dataType:'json',
        type:'post',
        success:function(msg) {
            if(msg.errorMsg == 'OK'){
                if(msg.result == 'false'){
                    if(confirm('该追号方案的上一期订单未算奖,是否打印')){
                        showPrintActiveX_Div(funMsg,piao);

                        isPrintTimer = setInterval(function(){
                            checkPrintStatus(funMsg.ORDERID,index,3);
                            $('#PrintActiveX_Div').css('top',(getScrollTop()<30 ? 30+'px' : getScrollTop())+'px');
                        }, 100);
                    }else{
                        timerControl = true;
                    };
                }else{
                    showPrintActiveX_Div(funMsg,piao);

                    isPrintTimer = setInterval(function(){
                        checkPrintStatus(funMsg.ORDERID,index,3);
                        $('#PrintActiveX_Div').css('top',(getScrollTop()<30 ? 30+'px' : getScrollTop())+'px');
                    }, 100);
                };
            }else{
                alert(msg.errorMsg);
                timerControl = true;
            };
        },
        error:function(a,b,c){
            pageConfig.errorFun(a,b,c);
            return false;

        }
    });
}