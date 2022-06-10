'use strict';

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

//tab container
const tabs = document.querySelectorAll('.operations__tab');
const tabs_container = document.querySelector('.operations__tab-container');
const tab_contents = document.querySelectorAll('.operations__content');

const nav_links = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const lazyImage = document.querySelectorAll('img[data-src]');

const sliderItem = document.querySelectorAll('.slide');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const sliderBtnLeft = document.querySelector('.slider__btn--left');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookie for functional improvements and analytics
   <button class = "btn btn--close-cookie">Got it!</button>`;

const header = document.querySelector('.header');
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

///style and attributes and classes
message.style.width = '105%';
message.style.height = `${
  parseFloat(getComputedStyle(message).height, 10) + 30
}px `;

//Implementing smooth navigation
const sectionOne = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', e => {
  e.preventDefault();
  // const sectionOneRect = sectionOne.getBoundingClientRect();
  // const docScroll = window.pageYOffset;
  // window.scrollTo({
  //   left: sectionOneRect.left,
  //   top: sectionOneRect.top + docScroll,
  //   behavior: 'smooth',
  // });

  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

//implementing event delegation

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// implementing tab container

tabs_container.addEventListener('click', e => {
  //selecting targeted element
  const tab = e.target.closest('.operations__tab');

  //Guard condition
  if (!tab) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tab.classList.add('operations__tab--active');
  tab_contents.forEach(tc =>
    tc.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${tab.dataset.tab}`)
    .classList.add('operations__content--active');
});

//implementing hover effect on nav
const hoverEffect = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const parent = link.closest('.nav');
    const siblings = parent.querySelectorAll('.nav__link');
    siblings.forEach(el => (el.style.opacity = this));
    parent.querySelector('#logo').style.opacity = this;
    link.style.opacity = 1;
  }
};

nav_links.addEventListener('mouseover', hoverEffect.bind(0.5));
nav_links.addEventListener('mouseout', hoverEffect.bind(1));

//sticky navigation

//
// window.onscroll = function () {
//   if (window.scrollY > 300) {
//     sticky.classList.add('sticky');
//   } else if (window.scrollY == 0) {
//     sticky.classList.remove('sticky');
//   }
// };

//implementing sticky navigation using scroll event and bounding client rect
// const initialCoordinates = sectionOne.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoordinates.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

//////////////////////////////
//implementing sticky navigation using intersection observer

const stickyNavCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observer = new IntersectionObserver(stickyNavCallback, {
  root: null,
  rootMargin: '100px',
  threshold: 0,
});
observer.observe(header);

//implementing lazy load images using intersection observer
const lazyImageCallBack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImageObserver = new IntersectionObserver(lazyImageCallBack, {
  root: null,
  threshold: 0.5,
  rootMargin: '-200px',
});

lazyImage.forEach(img => lazyImageObserver.observe(img));

//implementing translating sections
const sections = document.querySelectorAll('section');
const sectionCallBack = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};
const sectionObserver = new IntersectionObserver(sectionCallBack, {
  root: null,
  threshold: 0.2,
  rootMargin: '-100px',
});
sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//implementing slider
const slider = function () {
  let currentIndex = 0;
  const currentSelected = function (slide) {
    sliderItem.forEach((item, index) => {
      item.style.transform = `translateX(${(index - slide) * 100}%)`;
    });
  };

  const prvSlideItem = function () {
    if (currentIndex === 0) {
      currentIndex = sliderItem.length - 1;
    } else {
      --currentIndex;
    }
    currentSelected(currentIndex);
    currentSelectedDot(currentIndex);
  };

  const nextSlideItem = function () {
    if (currentIndex === sliderItem.length - 1) {
      currentIndex = 0;
    } else {
      ++currentIndex;
    }

    currentSelected(currentIndex);
    currentSelectedDot(currentIndex);
  };

  sliderBtnRight.addEventListener('click', nextSlideItem);
  sliderBtnLeft.addEventListener('click', prvSlideItem);

  //adding keyboard event listener to slider
  window.addEventListener('keydown', function (e) {
    e.key == 'ArrowRight' && nextSlideItem();
    e.key == 'ArrowLeft' && prvSlideItem();
  });

  //adding dot indicators at the button
  const dotIndicator = document.querySelector('.dots');
  const createDots = function () {
    sliderItem.forEach((_, index) => {
      dotIndicator.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot " data-dot="${index}"></button>`
      );
    });
  };

  const currentSelectedDot = function (dot) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-dot = "${dot}"]`)
      .classList.add('dots__dot--active');
  };

  dotIndicator.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { dot } = e.target.dataset;
      currentSelected(dot);
      currentSelectedDot(dot);
    }
  });

  const initSlider = function () {
    currentSelected(0);
    createDots();
    currentSelectedDot(0);
  };

  initSlider();
};
slider();
