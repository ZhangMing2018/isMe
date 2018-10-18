$(function(){
	//左侧菜单
	var top = $(".sec-mainL").offset().top+$(".sec-mainL").outerHeight();
	$(".sec-mainNav").children("li").hover(
		function(){
			/*悬浮显示二级菜单*/
			$(this).siblings().removeClass("hover");
			$(this).addClass("hover");
			$(this).siblings().find(".menu-panel").hide();
			$(this).find(".menu-panel").show();
			//判断左侧二级菜单是否超出菜单高度
			var litop = $(this).find(".menu-panel").offset().top + $(this).find(".menu-panel").outerHeight();
			if(litop>top){
				$(this).find(".menu-panel").css("top","-"+(litop-top)+"px");
			}
		},
		function(){
			$(this).removeClass("hover");
			$(this).find(".menu-panel").hide();
		}
	);


	/**
	 * @图片轮播
	 */
	var page = -1;//设置开始轮播第一个图片
	var len = 4;//设定图片数量
	var stop = false;//设置轮播是否停止

	/**定义轮播函数**/
	function slide(){
		if(!stop){
			page++;//当前轮播加1（下一个图片显示）
			if(page == len){
				page = 0;//当page大于图片长度时，从第一个图片开始播放
				$(".silde").animate({"left":"0"},300);
			}
			$(".silde").animate({"left":"-"+page*666+"px"},300);
			$(".silde-page li").removeClass("on");
			$(".silde-page li").eq(page).addClass("on");
		}
		setTimeout(slide,1000);
	}
	slide();
	/**悬浮到轮播图  **/
	$(".focus").mouseover(function(){
		stop = true;//停止轮播
	}).mouseout(function(){
		stop = false;//鼠标离开 开始轮播
	});
	/**按钮悬浮**/
	$(".silde-page li").mouseover(function(){
		page = $(this).index();//将page 设置成当前点击按钮的 下标值
		$(".silde").stop(true,true).animate({"left":"-"+page*666+"px"},300);
		$(".silde-page li").removeClass("on");
		$(".silde-page li").eq(page).addClass("on");
	});


	//右侧搜索样式
	$(".login").hover(
		function(){
			$(".search-all").css("overflow","visible");
			$(this).find(".search-all").stop(true,true).animate({"opacity":"1","height":"140px"},500);
		},
		function(){
			$(".search-all").css("overflow","hidden");
			$(this).find(".search-all").stop(true,true).animate({"opacity":"0","height":"0"},500);
			$(".search-all .btm:visible").hide();
		}
	);

	$(".search-all a").click(function(){
		if($(this).find(".btm").is(":hidden")){
			$(".search-all .btm:visible").hide();
			$(this).css("zIndex","2");
			$(this).siblings().css("zIndex","1");
			$(this).find(".btm").show("fast");
		}else{
			var self = $(this);
			$(this).find(".btm").hide("fast",function(){
				self.css("zIndex","1");
			});
		}
	});

	//右侧广告悬浮
	$(window).scroll(function(){
		if($(this).scrollTop()>100){
			$(".ad").hide();
			$(".rightMenu").animate({"bottom":"50px"},300);
		}else{
			$(".ad").show();
			$(".rightMenu").stop(true,true).css("bottom","-150px");
		}
	});
	//获得彩贝、微信悬浮
	rightMenu($(".menu-edu"),"700","120");//彩贝
	rightMenu($(".menu-wx"),"186","96");//微信
	//获得彩贝、微信二级内容
	$(".rightMenuHover").hover(
		function(){
			if(rightMenuTime) clearTimeout(rightMenuTime);
			$(this).show();
		},
		function(){
			$(this).hide();
		}
	);
	//返回顶部
	$(".backTop").click(function(){
		$("html,body").animate({"scrollTop":"0"},500);
	});

});
var rightMenuTime=null;
//获得彩贝、微信
function rightMenu(obj,w,h){
	obj.hover(
		function(){
			if(rightMenuTime) clearTimeout(rightMenuTime);
			var index = $(".rightMenuBtn").index($(this));//获取index值
			//所有的二级内容隐藏
			$(".rightMenuHover").hide();
			//二级内容显示
			$(".rightMenuHover").eq(index).css({"width":0,"height":0,"opacity":0,"display":"block"}).stop(true,true).delay(50).animate({"width":w+"px","height":h+"px","opacity":1},300,function(){
				$(".rightMenuHover").eq(index).attr("style","display:block")
			});
		},
		function(){
			rightMenuTime = setTimeout(function(){
				$(".rightMenuHover").stop(true,true).hide();
			},1000);
		}
	);
}


