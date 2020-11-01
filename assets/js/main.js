'use strict';

// 검색창
const searchModal = document.querySelector('.top-search-wrap');
const SearchClose = document.querySelector('.btn-search-close');
const searchOpen = document.querySelector('.btn-search');
searchOpen.addEventListener('click', () => {
  if (searchModal.style.display == 'none') {
    searchModal.style.display = 'block';
  } else {
    searchModal.style.display = 'none';
  }
});
SearchClose.addEventListener('click', () => {
  if (searchModal.style.display == 'block') {
    searchModal.style.display = 'none';
  } else {
    searchModal.style.display = 'block';
  }
});

// 슬라이더
let sliderWrap = document.querySelector('.section--slider');
let sliderContainer = document.querySelector('.slider__container');
let slide = document.querySelectorAll('.slide');
let navPrev = document.getElementById('prev');
let navNext = document.getElementById('next');
let slideCount = slide.length;
let slideHeight;
let currentIndex = 0;
let timer = undefined;
let pagerHTML = '';
let pager = document.querySelector('.pager');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < slide.length; i++) {
    if (slideHeight < slide[i].offsetHeight) {
      slideHeight = slide[i].offsetHeight;
    }
  }
  console.log(slideHeight);

  sliderWrap.style.height = slideHeight + 'px';
  sliderContainer.style.height = slideHeight + 'px';

  // 슬라이드가 있으면 가로로 배열하기
  for (let a = 0; a < slideCount; a++) {
    slide[a].style.left = a * 100 + '%';
    pagerHTML += `<span data-idx=${a}>${a+1}</span>`; // '<span data-idx="' + a + '">' + (a + 1) + "</span>";
    pager.innerHTML = pagerHTML;
  }

  let pagerBtn = document.querySelectorAll('.pager span');

  navPrev.addEventListener('click', () => {
    if (currentIndex == 0) {
      goToSlide(slideCount - 1);
    } else {
      goToSlide(currentIndex - 1);
    }
  });

navNext.addEventListener('click', () => {
    if (currentIndex == slideCount - 1) {
      goToSlide(0);
    } else {
      goToSlide(currentIndex + 1);
    }
  });

  // 자동 슬라이드 함수
  function startAutoSlide() {
    timer = setInterval(function () {
      let nextIdx = (currentIndex + 1) % slideCount; // 나눈 나머지
      goToSlide(nextIdx);
    }, 3000);
  }

  startAutoSlide();

  function stopAutoSlide() {
    clearInterval(timer);
  }

  // clearInterval
  sliderWrap.addEventListener('mouseenter', () => {
    stopAutoSlide();
  });

  sliderWrap.addEventListener('mouseleave', () => {
    startAutoSlide();
  });

  // 함수
  // 왼쪽으로 -100% 옮기기 함수
  function goToSlide(idx) {
    sliderContainer.classList.add('animated');
    sliderContainer.style.left = -100 * idx + '%';
    currentIndex = idx;

    // 모든 $pagerBtn에 active 제거, 클릭된 요소에만 active 추가
    for (let y = 0; y < pagerBtn.length; y++) {
      pagerBtn[y].classList.remove('active');
    }
    pagerBtn[idx].classList.add('active');
  } // goToslide

  goToSlide(0);

  // pager로 슬라이드 이동하기
  for (let x = 0; x < pagerBtn.length; x++) {
    pagerBtn[x].addEventListener('click', (event) => {
      console.log(event.target.innerText);
      // get 가져오는거 set 다시바꾸는거
      // id, class, data-idx 는 attribute
      // let pagerNum = event.target.getAttribute('data-idx');

      let pagerNum = event.target.innerText - 1;
      goToSlide(pagerNum);
    });
  }
}); // DOMContentLoaded

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  slidesPerGroup : 1,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: true,
  },
});


$(function(){
	$('#toggle').click(function(){
		if($('#nav_line').hasClass('on')==true){
			$('#nav_line').removeClass('on')
		}else{
			$('#nav_line').addClass('on')
		}
	})
})

$(function(){
  $('#toggle_nav > ul > li > h2').click(function(){
    var liHeight=$(this).next('ul').children('li').outerHeight();

    if(liHeight==0){
      $('#toggle_nav > ul > li > ul > li').css({height:0}); 
      $('#toggle_nav > ul > li').removeClass('active');
      
      $(this).next('ul').children('li').css({height:50,backgroundColor:"#F6F5F4"});
      $(this).parent('li').addClass('active');
    }else{
        $(this).next('ul').children('li').css({height:0}); 
      $('#toggle_nav > ul > li').removeClass('active');
    }    
  });
});

