import $ from 'jquery';

$('.customer-reviews__slides').slick({
  dots: true,
  arrows: true,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 2,

  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
});