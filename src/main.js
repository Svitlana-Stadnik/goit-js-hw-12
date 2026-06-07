import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { countImagesPerPage, getImagesByQuery } from './js/pixabay-api.js';
import {
  moreBtn,
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const toastParam = {
  messageColor: 'black',
  backgroundColor: 'lightblue',
  position: 'topRight',
  progressBar: false,
  timeout: 4000,
};

const form = document.querySelector('.form');

let curPage = 1;
let countPages = 1;
let query = '';

form.addEventListener('submit', onSubmit);
moreBtn.addEventListener('click', onMoreBtnClick);

async function onSubmit(event) {
  event.preventDefault();
  clearGallery();
  const queryElem = event.target.elements['search-text'];
  if (!queryElem.value.trim()) {
    queryElem.value = '';
    return;
  }
  curPage = 1;
  query = queryElem.value.trim();
  hideLoadMoreButton();
  showLoader();
  try {
    const photo = await getImagesByQuery(query, curPage);
    if (!photo.hits.length) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        ...toastParam,
      });
      return;
    }
    countPages = Math.ceil(photo.totalHits / countImagesPerPage);
    createGallery(photo.hits);
    checkMoreButton();
    event.target.reset();
  } catch {
  iziToast.show({
    message: "Server Pixabay is not available",
    ...toastParam,
  });
} finally {
    hideLoader();
  }
}

async function onMoreBtnClick() {
  curPage += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const photo = await getImagesByQuery(query, curPage);

    createGallery(photo.hits);
    scrollGallery();
    checkMoreButton();
  } catch {
    iziToast.show({
      message: 'Server Pixabay is not available',
      ...toastParam,
    });
  } finally {
    hideLoader();
  }
}

function checkMoreButton() {
  if (curPage < countPages) {
    showLoadMoreButton();
  } else {
    iziToast.show({
      message: `We're sorry, but you've reached the end of search results.`,
      ...toastParam,
    });
  }
}

function scrollGallery() {
  const galleryItem = document.querySelector('.gallery-item');

  if (!galleryItem) {
    return;
  }

  const cardHeight = galleryItem.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}


