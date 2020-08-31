
function headerbg(){
  var scroll = $(window).scrollTop();  
   if (scroll >= 50) {
    $("header").addClass("header-bg");
   } 
   else {
     $("header").removeClass("header-bg");
    }
   }

 
$(window).scroll(function() {    
     headerbg();
});
/* =========scroll End========= */ 


/* =========Ready Start========= */
$(document).ready(function(){
	  $("#menuShow").on('click', function(e){
		$('#menubox').toggleClass('menu-slide');
	  });
	  $("#menuClose").on('click', function(e){
		$('#menubox').toggleClass('menu-slide');
	  });
	  

	
});/* =========Ready End========= */ 

/* ============Scroll Effect=============== */

var lastId,
    topMenu = $(".nav-menu-list"),
    topMenuHeight = topMenu.outerHeight()+40,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });
// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  },1000);
  e.preventDefault();
  $(this).parent("li").addClass("active").siblings().removeClass("active");

});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
  /* if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }*/                   
});

/* ============Scroll Effect END=============== */
  $('#supportslider').slick({
    slidesToShow:5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    infinite:false,
    dots: false,
     arrows: false,
       responsive: [
        {
          breakpoint:1200,
          settings: {
            arrows: true,
            slidesToShow:3
          }
        },
        {
          breakpoint:767,
          settings: {
            arrows: true,
            slidesToShow:2
          }
        }
      ]
    }); 

      $('#pressRelease_slider').slick({
    slidesToShow:5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    infinite:false,
    dots: false,
     arrows: false,
       responsive: [
        {
          breakpoint:1200,
          settings: {
            arrows: true,
            slidesToShow:3
          }
        },
        {
          breakpoint:767,
          settings: {
            arrows: true,
            slidesToShow:2
          }
        }
      ]
    });
      setTimeout(function(){ 
      $('#loader-wrapper').fadeOut("slow") 
		}, 20000);