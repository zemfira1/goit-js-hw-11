import Notiflix from 'notiflix';
import { getPhoto } from './api';
import { createMapkup, gallery } from './markup';

const formEl = document.querySelector('.search-form');
const button = document.querySelector('.load-more');

formEl.addEventListener('submit', onSubmit);
button.addEventListener('click', loadMore);
let currentPage = 1;
let searchQuery = '';
let currentHits = 0;
const PER_PAGE = 200;

function onSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;

  searchQuery = event.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);

  getPhoto(searchQuery, currentPage, PER_PAGE)
    .then(r => {
      if (r.hits.length !== 0) {
        createMapkup(r);
        button.classList.remove('hidden');
        currentHits = r.totalHits - PER_PAGE;
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(err => console.log(err));
}

function loadMore() {
  currentPage += 1;
  currentHits -= PER_PAGE;
  getPhoto(searchQuery, currentPage, PER_PAGE)
    .then(r => {
      createMapkup(r);
      if (currentHits < 0) {
        button.classList.add('hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => console.log(err));
}
