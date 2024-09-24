import { PARAMS_KEY, getQueryParams, setQueryParams } from '../utils/queryParamsHandler.js';
import { getFilteredServices } from '../utils/api.js';
import { recipes } from '../../../data/recipes.js';

class SearchBar {
	constructor() {}

	template(paramValue = getQueryParams()) {
		return `
                <section
                    class="main-searchbar-section min-h-768px flex flex-col items-center justify-center gap-8"
                >
                    <h1 class="text-4xl text-yellow-500 text-center font-semibold font-anton max-w-800px">
                        CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
                    </h1>
                    <form class="main-searchbar-section__form max-w-900px w-full flex flex-row items-center gap-4 rounded-lg py-3 px-4 bg-white">
                        <input
                            class="w-full py-4"
                            type="text"
                            placeholder="Rechercher une recette, un ingrédient, ..."
                            value="${paramValue.search}"
                            data-active-key="${PARAMS_KEY.SEARCH}"
                        />
                        <button
                            class="main-searchbar-section__form__searchButton bg-black text-white hover:bg-yellow-500 hover:text-black rounded-lg"
                            type="submit"
                        >
                            <i class="fas fa-search w-12 flex items-center justify-center aspect-square text-2xl"></i>
                        </button>
                    </form>
                </section>
            `;
	}

	events() {
		const updateSearchParams = (event) => {
			event.preventDefault();
			const inputSearchFormKey = inputSearchForm.getAttribute('data-active-key');
			const inputSearchFormValue = inputSearchForm.value;

			setQueryParams(inputSearchFormKey, inputSearchFormValue);
		};

		const toggleDeleteButton = () => {
			const deleteButton = document.querySelector('.main-searchbar-section__form__delete-button');

			if (inputSearchForm.value) {
				if (!deleteButton) {
					const buttonTemplate = `
						<button class="main-searchbar-section__form__delete-button text-gray-500" type="button">
							<i class="fa-solid fa-xmark w-12 flex items-center justify-center aspect-square text-2xl"></i>
						</button>
					`;
					inputSearchForm.insertAdjacentHTML('afterend', buttonTemplate);
					const newDeleteButton = document.querySelector(
						'.main-searchbar-section__form__delete-button',
					);
					newDeleteButton.addEventListener('click', () => {
						inputSearchForm.value = '';
						setQueryParams('search', inputSearchForm.value);
					});
				}
			} else {
				deleteButton?.remove();
			}
		};

		const submitButton = document.querySelector('.main-searchbar-section__form__searchButton');
		const inputSearchForm = document.querySelector('.main-searchbar-section__form > input');
		submitButton.addEventListener('click', updateSearchParams);
		inputSearchForm.addEventListener('input', toggleDeleteButton);
		toggleDeleteButton();
	}

	render() {
		return this.template();
	}
}

export default SearchBar;
