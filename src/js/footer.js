import Notiflix from 'notiflix';
import { fetchPostApi } from './api-service/footer-api';
import { gsap } from 'gsap';

const formSubmit = document.querySelector('.js-footer-form');

formSubmit.addEventListener('submit', fetchSubscription);

function fetchSubscription(event) {
  event.preventDefault();

  const emailInput = document.querySelector('input[type="email"]');
  const email = emailInput.value;

  if (!isValidEmail(email)) {
    return Notiflix.Notify.failure('Invalid email address was entered.');
  }

  const subscriptionData = {
    email: email,
  };

  fetchPostApi(subscriptionData)
    .then(resp => {
      Notiflix.Notify.success(
        'Were excited to have you on board! 🎉 Thank you f…ep towards improving your fitness and well-being.'
      );
    })
    .catch(error => {
      if (error.response.status === 409) {
        Notiflix.Notify.warning('Subscription already exists');
      }
    });
  formSubmit.reset();
}
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailPattern.test(email);
}

const circleElement = document.querySelector('.footer_logo_icon');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};
const icon = document.querySelector('.footer_logo_icon');

const observer = new IntersectionObserver(handleIntersection, options);

observer.observe(icon);

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }

    const animation = gsap.to(icon, {
      duration: 5,
      fill: '#f4f4f4',
    });
  });
}
