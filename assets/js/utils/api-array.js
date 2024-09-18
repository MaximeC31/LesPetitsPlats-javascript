import { getQueryParams } from './queryParamsHandler.js';
import { recipes } from '../../../data/recipes.js';

export const getRecipesIngredients = () => {
	const allIngredients = recipes.flatMap((recipe) =>
		recipe.ingredients.map((ingredient) => ingredient.ingredient),
	);
	return [...new Set(allIngredients)];
};

export const getRecipesAppliances = () => {
	const allAppliances = recipes.flatMap((recipe) => recipe.appliance);
	return [...new Set(allAppliances)];
};

export const getRecipesUstensils = () => {
	const allUstensils = recipes.flatMap((recipe) => recipe.ustensils);
	return [...new Set(allUstensils)];
};

export const getFilteredIngredients = (recipe, ingredientsParams) => {
	if (ingredientsParams.length === 0) {
		return true;
	}
	return ingredientsParams.every((ingredient) =>
		recipe.ingredients.some((recipeIngredient) => recipeIngredient.ingredient === ingredient),
	);
};

export const getFilteredAppliances = (recipe, appliancesParams) => {
	if (appliancesParams.length === 0) {
		return true;
	}
	return appliancesParams.every((appliance) => recipe.appliance.includes(appliance));
};

export const getFilteredUstensils = (recipe, ustensilsParams) => {
	if (ustensilsParams.length === 0) {
		return true;
	}
	return ustensilsParams.every((ustensil) => recipe.ustensils.includes(ustensil));
};

export const getFilteredServices = (recipe, searchParam) => {
	const normalizeString = (str) => {
		return str
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-zA-Z0-9\s]/g, '');
	};

	const searchQueryParamsNormalized = normalizeString(searchParam);
	if (!searchQueryParamsNormalized) {
		return true;
	}

	if (searchQueryParamsNormalized) {
		const recipeString = JSON.stringify(recipe, null);
		const recipeNormalized = normalizeString(recipeString);
		return recipeNormalized.includes(searchQueryParamsNormalized);
	}
};

export const getFilteredRecipes = (queryParams = getQueryParams()) => {
	const filteredRecipes = recipes.filter((recipe) => {
		return (
			getFilteredIngredients(recipe, queryParams.ingredients) &&
			getFilteredAppliances(recipe, queryParams.appliances) &&
			getFilteredUstensils(recipe, queryParams.ustensils) &&
			getFilteredServices(recipe, queryParams.search)
		);
	});

	return filteredRecipes;
};
