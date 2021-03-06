import { refs } from './refs'
import ImageApiService from './apiService'
import photoTpl from '../templates/photoTemplates.hbs'

const imageApiService = new ImageApiService();

refs.searchInput.addEventListener('submit', onSearch)

function onSearch(evt) {
    evt.preventDefault();

    clearImagesGallery()
    imageApiService.query = evt.currentTarget.elements.query.value;
    imageApiService.resetPage();
    imageApiService.fetchImages().then(appendImagesMarkup);
}

function appendImagesMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', photoTpl(images))
}

function clearImagesGallery() {
    refs.gallery.innerHTML = ''
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && imageApiService.query !== '') {
            imageApiService.fetchImages()
                .then(images => {
                appendImagesMarkup(images);
                imageApiService.incrementPage();
          }) 
        }
    })
}
const observer = new IntersectionObserver(onEntry);
observer.observe(refs.sentinel)