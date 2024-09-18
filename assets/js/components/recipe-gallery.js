import { getFilteredRecipes } from '../utils/api-array.js';

class RecipeGallery {
	constructor() {}

	template(recipesList = getFilteredRecipes()) {
		return `
		<section class="main-recipes-section bg-gray-100 px-16 py-8 grid grid-cols-3 gap-16 items-start">
		${recipesList
			.map(
				(recipesList) => `
			<article class="main-recipes-section__single-element flex flex-col rounded-2xl overflow-hidden relative w-full">
				<img class="min-h-256px max-h-256px object-cover" src="../../../assets/pictures/${
					recipesList.image
				}" />
				<div class="main-recipes-section__single-element__subcontainer bg-white p-6 flex flex-col gap-6 h-full">
			  		<h2 class="text-lg font-bold">${recipesList.name}</h2>
			  		<div class="main-recipes-section__single-element__subcontainer__recipe">
						<h3 class="mb-4 uppercase text-gray-500">Recette</h3>
						<p>${recipesList.description}</p>
			 		</div>
			  		<div class="main-recipes-section__single-element__subcontainer__ingredients">
						<h3 class="mb-4 uppercase text-gray-500">Ingrédients</h3>
						<div class="main-recipes-section__single-element__subcontainer__ingredients__subcontainer grid grid-flow-row grid-cols-2 gap-4 items-start">${recipesList.ingredients
							.map(
								(ingredient) => `
							<div class="main-recipes-section__single-element__subcontainer__ingredients__subcontainer__details flex flex-col items-center justify-center">
					  		<h4 class="w-full">${ingredient.ingredient}</h4>
								${
									ingredient.quantity
										? `<p class="text-gray-500 text-left w-full">${ingredient.quantity} ${
												ingredient.unit || ''
										  }</p>`
										: ''
								}
							</div>
							`,
							)
							.join('')}
						</div>
			  		</div>
			  		<p class="absolute top-6 right-6 bg-yellow-300 py-1 px-4 rounded-2xl">${recipesList.time}min</p>
				</div>
			</article>`,
			)
			.join('')}
		</section>
		`;
	}

	events() {}

	render() {
		return this.template();
	}
}

export default RecipeGallery;
