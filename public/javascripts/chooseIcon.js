$(document).ready(function() {

  $('#responsive').lightSlider({
    autoWidth:true,
    loop:true,
    onSliderLoad: function() {
      $('#responsive').removeClass('cS-hidden');
    }
  });

  $("img.iconImg").click(function() {
    console.log(event.target.src)
  })

});