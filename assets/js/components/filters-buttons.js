import { getQueryParams, setQueryParams } from '../utils/queryParamsHandler.js';

class FiltersButtons {
	constructor() {}

	template(queryParams = getQueryParams(), buttonsHTML = '') {
		const createFilterButtons = () => {
			for (const keyValue of Object.entries(queryParams)) {
				if (Array.isArray(keyValue[1]) && keyValue[1].length > 0) {
					keyValue[1].forEach((paramsValue) => {
						buttonsHTML += createFilterButton(keyValue[0], paramsValue);
					});
				}
			}
			return buttonsHTML;
		};

		const createFilterButton = (key, value) => {
			return `
			<div class="main-filters-buttons__single-button flex flex-row items-center justify-between p-4 bg-yellow-400 rounded-lg"
				 data-active-key=${key}>
				<p>${value}</p>
				<i class="fa-solid fa-xmark text-black text-lg cursor-pointer"></i>
			</div>
			`;
		};

		return `
		<section class='main-filters-buttons bg-gray-100 grid grid-cols-5 gap-4 px-16 py-8'>
			${createFilterButtons()}
		</section>
		`;
	}

	events() {
		const filterButtons = document.querySelectorAll('.main-filters-buttons__single-button > i');
		filterButtons.forEach((button, index) => {
			button.addEventListener('click', () => {
				const filterButtonsContainer = document.querySelectorAll(
					'.main-filters-buttons__single-button',
				);
				const key = filterButtonsContainer[index].getAttribute('data-active-key');
				const value = filterButtonsContainer[index].outerText;
				setQueryParams(key, value);
			});
		});
	}

	render() {
		return this.template();
	}
}

export default FiltersButtons;
