import { getQueryParams, setQueryParams } from '../utils/queryParamsHandler.js';
import { PARAMS_KEY } from '../utils/queryParamsHandler.js';
import {
	getRecipesIngredients,
	getRecipesAppliances,
	getRecipesUstensils,
	getFilteredRecipes,
} from '../utils/api.js';

class FiltersBox {
	constructor() {
		this.sortRecipesIngredients = getRecipesIngredients().sort();
		this.sortRecipesAppliances = getRecipesAppliances().sort();
		this.sortRecipesUstensils = getRecipesUstensils().sort();
	}

	template() {
		const createFilterBoxItems = (title, recipesList, key) => {
			return `
				<article class='main-filters-section__filters-container__single-filter bg-white w-60 rounded-lg overflow-hidden group/filter'>
					<div class='main-filters-section__filters-container__single-filter__title-container flex flex-row justify-between items-center p-4 cursor-pointer bg-white'>
						<p>${title}</p>
						<i class='fa-solid fa-chevron-up group-hover/filter:rotate-180 transition-all'></i>
					</div>
					<div class='main-filters-section__filters-container__single-filter__form-container bg-white overflow-hidden h-0 group-hover/filter:overflow-auto group-hover/filter:h-auto'>
						<form class='border border-black flex items-center justify-between gap-3 p-2 my-2 mx-4 rounded' style='border: 1px solid grey'>
							<input class='main-filters-section__filters-container__single-filter__form-container__input w-full' data-active-key=${key}>
							<button type='submit'>
								<i class='fas fa-search aspect-square text-gray-500'></i>
							</button>
						</form>
					</div>
					<div class="main-filters-section__filters-container__single-filter__items-container w-full rounded-lg overflow-hidden">
						<div class="main-filters-section__filters-container__single-filter__items-container__subcontainer h-0 overflow-hidden group-hover/filter:overflow-scroll group-hover/filter:h-48 transition-all">
							${recipesList
								.map(
									(subElement) => `
								<div class="main-filters-section__filters-container__single-filter__items-container__subcontainer__item flex flex-row items-center justify-between my-1 p-4 hover:bg-yellow-400 cursor-pointer" data-active-key=${key}>
									<p>${subElement}</p>
								</div>`,
								)
								.join('')}
						</div>
					</div>
				</article>
			`;
		};

		const displayRecipesResults = () => {
			switch (getFilteredRecipes().length) {
				case 0:
					return 'Aucune recette trouvée';

				case 1:
					return '1 recette';

				default:
					return `${getFilteredRecipes().length} recettes`;
			}
		};

		return `
			<section class="main-filters-section bg-gray-100 flex flex-row justify-between items-start gap-12 px-16 py-8">
				<div class="main-filters-section__filters-container flex flex-row gap-6 items-start">
					${createFilterBoxItems('Ingrédients', this.sortRecipesIngredients, PARAMS_KEY.INGREDIENTS)}
					${createFilterBoxItems('Appareils', this.sortRecipesAppliances, PARAMS_KEY.APPLIANCE)}
					${createFilterBoxItems('Ustensiles', this.sortRecipesUstensils, PARAMS_KEY.USTENSILS)}
				</div>
				<p class="main-filters-section__recipes-found font-anton font-bold text-xl min-w-fit mt-3">
					${displayRecipesResults()}
				</p>
			</section>
		`;
	}

	events() {
		const toggleDeleteButton = (inputForm, form, container) => {
			const deleteButton = form.querySelector(
				'.main-filters-section__filters-container__single-filter__form-container__delete-button',
			);
			if (inputForm.value) {
				if (!deleteButton) {
					const buttonTemplate = `
						<button class="main-filters-section__filters-container__single-filter__form-container__delete-button" type="button">
							<i class="fa-solid fa-xmark aspect-square text-gray-500"></i>
						</button>
					`;
					inputForm.insertAdjacentHTML('afterend', buttonTemplate);
					const newDeleteButton = form.querySelector(
						'.main-filters-section__filters-container__single-filter__form-container__delete-button',
					);
					newDeleteButton.addEventListener('click', () => {
						inputForm.value = '';
						newDeleteButton?.remove();
						container
							.querySelectorAll(
								'.main-filters-section__filters-container__single-filter__items-container__subcontainer__item',
							)
							.forEach((item) => {
								item.style.display = 'flex';
							});
					});
				}
			} else {
				deleteButton?.remove();
			}
		};

		const filterContainers = document.querySelectorAll(
			'.main-filters-section__filters-container__single-filter',
		);
		filterContainers.forEach((container) => {
			const inputForm = container.querySelector(
				'.main-filters-section__filters-container__single-filter__form-container__input',
			);
			const form = container.querySelector('form');
			inputForm.addEventListener('change', () => toggleDeleteButton(inputForm, form, container));
			form.addEventListener('submit', function (event) {
				event.preventDefault();
				container
					.querySelectorAll(
						'.main-filters-section__filters-container__single-filter__items-container__subcontainer',
					)
					.forEach((item) => {
						item.querySelectorAll('div').forEach((filterItem) => {
							filterItem.style.display = filterItem.outerText.includes(inputForm.value)
								? 'flex'
								: 'none';
						});
					});
			});
		});

		const setQueryParamsOnItem = (item) => {
			const activ = item.getAttribute('data-active');
			const key = item.getAttribute('data-active-key');
			const value = item.outerText;
			if (!activ) {
				setQueryParams(key, value);
			}
		};

		const updateFormButton = (item) => {
			for (const params in getQueryParams()) {
				if (getQueryParams()[params].length > 0) {
					for (const param of getQueryParams()[params]) {
						if (param === item.innerText) {
							item.classList.add('bg-yellow-400');
							item.classList.add('cursor-auto');
							item.setAttribute('data-active', 'true');
							item.innerHTML +=
								'<i class="fa-solid fa-xmark text-black text-lg cursor-pointer"></i>';
						}
					}
				}
			}
		};

		const filterItems = document.querySelectorAll(
			'.main-filters-section__filters-container__single-filter__items-container__subcontainer__item',
		);
		filterItems.forEach((item) => {
			item.addEventListener('click', () => setQueryParamsOnItem(item));
			updateFormButton(item);
			const activ = item.getAttribute('data-active');
			const key = item.getAttribute('data-active-key');
			const value = item.outerText;
			if (activ) {
				item.querySelector('i').addEventListener('click', () => {
					setQueryParams(key, value);
				});
			}
		});
	}

	render() {
		return this.template();
	}
}

export default FiltersBox;
