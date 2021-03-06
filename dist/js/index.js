console.log('hello')

document.addEventListener('DOMContentLoaded', () => {

  const animItems = document.querySelectorAll('._anim-items');
  const cakes = document.querySelectorAll('.progress__amount');

  if (animItems.length > 0) {
    window.addEventListener('scroll', () => {
      fixedHeader();
      animOnScroll();
      scrollUp();
    });
    function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;

        let animItemPoint = window.innerHeight - animItemHeight / 4;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / 4;
        }

        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
          animItem.classList.add('_active');

          cakes.forEach(() => {
            animate(cakes[0], 0, 350, 2000);
            animate(cakes[1], 0, 150, 2000);
            animate(cakes[2], 0, 500, 2000);
            animate(cakes[3], 0, 685, 2000);
          });
        } else {
          if (!animItem.classList.contains('_anim-no-repeat')) {
            animItem.classList.remove('_active');
          }
        }
      }
    }

    setTimeout(() => {
      document.querySelector('.title__text').classList.add('_active');
      animOnScroll();
    }, 300)

  }

  function offset(element) {
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    }
  }

});

const iconMenu = document.querySelector('.label_checkbox');
const burgerMenu = document.querySelector('.burger-menu');


if (iconMenu) {
  const menuBody = document.querySelector('.burger__list');

  iconMenu.addEventListener('click', (e) => {
    menuBody.classList.toggle('_active');
  })

  const burgerListItem = document.querySelectorAll('.burger__list-item');
  burgerListItem.forEach((item) => {
    item.addEventListener('click', () => {
      menuBody.classList.toggle('_active');
      document.getElementById('menu_checkbox').checked = false;
    })
  })
}

//webp
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp')
  }
});

//num++

function animate(obj, initVal, lastVal, duration) {

  if (!obj.classList.contains('_active')) {
    let startTime = null;

    //get the current timestamp and assign it to the currentTime variable
    let currentTime = Date.now();

    //pass the current timestamp to the step function
    let step = (currentTime) => {

      //if the start time is null, assign the current time to startTime
      if (!startTime) {
        startTime = currentTime;
      }

      //calculate the value to be used in calculating the number to be displayed
      let progress = Math.min((currentTime - startTime) / duration, 1);

      //calculate what to be displayed using the value gotten above
      obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal) + '+';

      //checking to make sure the counter does not exceed the last value (lastVal)
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
      else {
        window.cancelAnimationFrame(window.requestAnimationFrame(step));
      }
    };
    window.requestAnimationFrame(step);
  }
}

// fix header
const header = $('.nav');
const headerWrapper = $('.nav__wrapper');
const hederHeight = header.height(); // ?????????????????? ???????????? ??????????

function fixedHeader() {
  if ($(this).scrollTop() > 170 || window.pageYOffset > 170) {
    header.addClass('nav__fixed _active');
    $('body').css({
      'paddingTop': hederHeight + 'px' // ???????????? ???????????? ?? body, ???????????? ???????????? ??????????
    });
    headerWrapper.css({
      'padding': '0.5% 0 0.5% 13.5%'
    });
  } else {
    header.removeClass('nav__fixed');
    $('body').css({
      'paddingTop': 0 // ???????????? ???????????? ?? body, ???????????? ???????????? ??????????
    })
    headerWrapper.css({
      'padding': '3% 0 3% 13.5%'
    });
  }
};

//slider
$('.about__slider').slick({
  prevArrow: '<button id="prev" type="button" class="btn btn-juliet"><i class="arrow left"></button>',
  nextArrow: '<button id="next" type="button" class="btn btn-juliet"><i class="arrow right"></button>'
});

//scroll up
function scrollUp() {
  if ($(this).scrollTop() > 200) {
    $('.scrollup').fadeIn();
  }
  else {
    $('.scrollup').fadeOut();
  }
}
$(function () {
  $('.scrollup').click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 800);
  })
});