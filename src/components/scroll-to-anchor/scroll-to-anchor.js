import $ from 'jquery';

$('[href^="#"]').click(function(){
  let link = $(this).attr('href');
  let coordinates = $(link).offset().top-$('.main-header').height();
  $('html, body').animate({scrollTop:coordinates}, 1000);
  return false;
})
