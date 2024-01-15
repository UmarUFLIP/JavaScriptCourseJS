'use strict';

///////////////////////////////////////
// Modal window
///////////////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
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
//        Tabbed Components
///////////////////////////////////////

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  // When we have null which is a falsy value, it will become true and return.
  if (!clicked) return;

  // Remove active tab from other classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
//         Nav Options Fade
///////////////////////////////////////

// Refactoring code
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // Select all siblings element (all other links)
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      // Make sure the element is not one we hover over
      if (el !== link) el.style.opacity = this;
    });
    // The bind method will set the "this" keyword to whatever value we pass into the bind method
    logo.style.opacity = this;
  }
};

// The bind method will set the "this" keyword to whatever value we pass into the bind method
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
//    Sticky Navi: Observer API
///////////////////////////////////////
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // Makes the navigation appear before the threshold was reached.
});
headerObserver.observe(header);

///////////////////////////////////////
//   Revealing Elements on Scroll
///////////////////////////////////////
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  // We can use the target (part of the observer) to determine which section intersected the viewport, and then reveal that one and not all of them.

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  // After the animation, the observer will keep observing so we need to 'unobserve' it. Param: the element that needs to be unobserved.
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
//        Lazy Loading Images
///////////////////////////////////////
// 'img[data-src] is how you select the img with the data-src property
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src attribute with data-src
  entry.target.src = entry.target.dataset.src;
  // Best to remove the blurry filter only when the loading is done.
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );

  observer.unobserve(entry.target); // stop observing after all img load
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '90px', // load the img before we see it.
});

imgTarget.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
//        Slider Component
///////////////////////////////////////
const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };

  const activateDot = function (slide) {
    // Remove active class from all dots
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    // Add active class to current dot
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');

    curSlide = Number(slide); // Bug fix: when we click on the last slide (dot) and then click the next button, it will go to the second slide instead of the first slide
  };

  const goToSlide = function (slide) {
    slides.forEach(
      // Ex: curSlide is 1 and so 1-1 is 0 and that slide will become the 0%
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous Slide function
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowLeft') prevSlide(); // Your choice: If statement or short circuiting
    e.key === 'ArrowRight' && nextSlide(); // Short circuiting
  });

  // Event delegation for dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // console.log('DOT');
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliders(); // Stored the code above in a function to avoid global variables and then called the function.

///////////////////////////////////////
//      Efficient Script Loading
///////////////////////////////////////

///////////////////////////////////////
//      Lifecycle DOM Events
///////////////////////////////////////
// DOMContentLoaded: DOM is loaded and parsed, without waiting for images and other external resources to load.
// load: DOM is loaded and parsed, and all external resources are loaded as well.
// beforeunload: User is about to leave the page.
// unload: Page is unloaded.
// document.querySelector('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ''; // We used to leave messages here but people abused it. So we only get a generic message now.
// });

// window.addEventListener('unload', function (e) {
//   console.log('Page unloaded', e); // This event is not very useful. It's mostly used for analytics.
// });

///////////////////////////////////////
////////////// LECTURES ///////////////
///////////////////////////////////////
