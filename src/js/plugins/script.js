

 $(document).ready(function(){


  $('.navigations').on('click', '.navigations__button', function(){
  	$('.navigations__menu').addClass('active');
  });

  $('.navigations').on('click', '.navigations__close', function(){
    $('.navigations__menu').removeClass('active');
  });

// close menu

  $(document).mouseup(function (e){ 
    var menu = $('.navigations__menu'); 
    if (!menu.is(e.target) && menu.has(e.target).length === 0) 
    {
      menu.removeClass('active');
    }
  });



    $( ".navigations__menu" ).on('click', 'a.js-anchor', function(event){
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
    });



  var granimInstance = new Granim({
   element: '#second',
   name: 'second-gradient',
   direction: "diagonal",
   opacity: [1, 1],
   elToSetClassOn: ".wrapper",
   states : {
       "default-state": {
           gradients: [
               ['#834D9B', '#D04ED6'],
               ['#1CD8D2', '#93EDC7']],
          transitionSpeed: 7500 
       }
   }
});



  var wow = new WOW(
  {
    boxClass: 'wow',
    animateClass:'animated',
    offset: 0,
    live:true
  });
  wow.init();


  });
