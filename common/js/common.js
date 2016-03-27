     
      $(function(){

      //´óÀÖÍ¸  Ñ¡ºÅÍ¶×¢  ÉÏ´«·½°¸  ·¢ÆðºÏÂò  ²ÎÓëºÏÂò  
      $(".c_hd_top_btn1 ul li").each(function(i){
            $(this).click(function(){
               $(this).addClass("curr").siblings().removeClass("curr");
               $(".lot-dlt:eq("+i+")").show().siblings(".lot-dlt").hide();
            });
          });

      //´óÀÖÍ¸  Ñ¡ºÅÍ¶×¢  ÉÏ´«·½°¸  ·¢ÆðºÏÂò  ²ÎÓëºÏÂò 
     
      $(".lot_title1 input").each(function(i){
            $(this).click(function(){
               $(this).addClass("curr").siblings().removeClass("curr");
               $(".lot_con1:eq("+i+")").show().siblings(".lot_con1").hide();
            });
          });
      //µã»÷²é¿´±ê×¼¸ñÊ½µ¯³ö¿ò
      $(".sing_font_dlt span").click(function(){
          var h=$(document).height();
          $(".pop_bg").height(h);
          $(".format").center();
          $(".format, .pop_bg").show();
        });
      $(".pop_bg, #format_close").click(function(){
          $(".format, .pop_bg").hide();
        });
     
       // ´óÀÖÍ¸µ¥Ê½ÉÏ´«
      $(".textarea1_dlt").val("µÚÐÐ´ú±í1×¢£¬×î¶àÊäÈë5000×¢\r\n±ê×¼¸ñÊ½:01,02,03,04,05|01,02\r\n¼æÈÝ¸ñÊ½(Ò»):01,02,03,04,05#01,02\r\n¼æÈÝ¸ñÊ½(¶þ):01,02,03,04,05@01,02");
      var textarea1_dlt=$(".textarea1_dlt").val();
      $(".textarea1_dlt").focus(function(){
       var currtext=$(this).val();
       if(currtext==textarea1_dlt){$(this).val("");}
      }).blur(function(){
         var currtext=$(this).val();
       if(currtext==""){$(this).val(textarea1_dlt);}
      });


      });


      ////µ¯³ö²ã´¹Ö±¾ÓÖÐ
        jQuery.fn.center = function(loaded) {
          var obj = this;
          body_width = parseInt($(window).width());
          body_height = parseInt($(window).height());
          block_width = parseInt(obj.width());
          block_height = parseInt(obj.height());
          
          left_position = parseInt((body_width)/2-(block_width)/2  + $(window).scrollLeft());
          if (body_width<block_width) { left_position = 0 + $(window).scrollLeft(); };
          top_position = parseInt((body_height/2) - (block_height/2) + $(window).scrollTop());
          if (body_height<block_height) { top_position = 0 + $(window).scrollTop(); };
          
          if(!loaded) {
            
            obj.css({'position': 'absolute'});
            obj.css({ 'top': top_position, 'left': left_position });
            $(window).bind('resize', function() { 
              obj.center(!loaded);
            });
            $(window).bind('scroll', function() { 
              obj.center(!loaded);
            });
            
          } else {
            obj.stop();
            obj.css({'position': 'absolute'});
            obj.animate({ 'top': top_position }, 100, 'linear');
          }
        }