import SearchBar from './components/search-bar.js';
import FiltersBox from './components/filters-box.js';
import FiltersButtons from './components/filters-buttons.js';
import RecipeGallery from './components/recipe-gallery.js';

function pageRendering() {
	const searchBar = new SearchBar();
	const filterBox = new FiltersBox();
	const filtersButtons = new FiltersButtons();
	const recipeGallery = new RecipeGallery();

	const MAIN_ELEMENT = document.querySelector('#main');
	MAIN_ELEMENT.innerHTML += `
	${searchBar.render()}
	${filterBox.render()}
	${filtersButtons.render()}
	${recipeGallery.render()}
	`;

	searchBar.events();
	filterBox.events();
	filtersButtons.events();
}

pageRendering();
