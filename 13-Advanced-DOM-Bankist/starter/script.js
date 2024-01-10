'use strict';

///////////////////////////////////////
// Modal window
///////////////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Smooth Scrolling: Learn more btn
///////////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' }); // Modern way of scrolling
});

///////////////////////////////////////
//        Event Delegation:
//  Implementing Page Navigation
///////////////////////////////////////
// Two steps:
// 1. add EventListener to a common parent of all elements we are interested in.
// 2. Determine what element originated the event

// '.nav__links' is the common parent of .nav_link
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching Strategy: Don't want to scroll when the border is clicked
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
////////////// LECTURES ///////////////
///////////////////////////////////////

const h1 = document.querySelector('h1');

// Going downwards: selecting child elements
console.log(h1.querySelectorAll('.highlight')); // This works no matter how deep these child elements would be inside the h1 element. Also, other highlight will not be selected if they are not children of h1 element.
console.log(h1.childNodes); // Gives us a nodeList
console.log(h1.children); // Gives us the HTML elements only
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// Need to find parent element no matter how far away in the DOM tree
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Sideway: accessing siblings
