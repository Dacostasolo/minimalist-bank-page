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

const tryNum = '74px';

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

const initialCoordinates = sectionOne.getBoundingClientRect();

console.log(initialCoordinates);
window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoordinates.top) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
});
