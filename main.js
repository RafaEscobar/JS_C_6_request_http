import { animeComponent } from './src/anime/animeComponent';
import divMain from './src/htmlComponents/divMain.html?raw';

document.querySelector('#app').innerHTML = divMain;

const appDiv = document.querySelector('#appdiv');

animeComponent(appDiv);
