import { animeComponent } from './src/anime/animeComponent';

const appDiv = document.querySelector('#app');
const nextPageBtn = document.querySelector("#nextPageBtn");
let page = 1;

animeComponent(appDiv);

nextPageBtn.addEventListener('click', () => {
    page++;
    animeComponent(appDiv, page);
});