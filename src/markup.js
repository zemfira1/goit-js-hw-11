import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

export const gallery = document.querySelector('.gallery');
export function createMapkup(photo) {
  const mapkup = photo.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="photo-card" href="${largeImageURL}">
            <img class='picture' src="${webformatURL}" alt="${tags}" loading="lazy" width='290' height='240'/>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>${likes}
              </p>
              <p class="info-item">
                <b>Views</b>${views}
              </p>
              <p class="info-item">
                <b>Comments</b>${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>${downloads}
              </p>
            </div>
          </a>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', mapkup);

  lightbox.refresh();
}
