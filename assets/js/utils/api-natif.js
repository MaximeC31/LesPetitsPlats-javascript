import { getQueryParams } from './queryParamsHandler.js';
import { recipes } from '../../../data/recipes.js';

export const getRecipesIngredients = () => {
	const allIngredients = [];
	for (const recipe of recipes) {
		for (const ingredient of recipe.ingredients) {
			if (!allIngredients.includes(ingredient.ingredient)) {
				allIngredients.push(ingredient.ingredient);
			}
		}
	}
	return allIngredients;
};

export const getRecipesAppliances = () => {
	const allAppliances = [];
	for (const recipe of recipes) {
		if (!allAppliances.includes(recipe.appliance)) {
			allAppliances.push(recipe.appliance);
		}
	}
	return allAppliances;
};

export const getRecipesUstensils = () => {
	const allUstensils = [];
	for (const recipe of recipes) {
		for (const ustensil of recipe.ustensils) {
			if (!allUstensils.includes(ustensil)) {
				allUstensils.push(ustensil);
			}
		}
	}
	return allUstensils;
};

export const getFilteredIngredients = (recipe, ingredientsParams) => {
	if (ingredientsParams.length === 0) {
		return true;
	}
	for (const ingredient of ingredientsParams) {
		let found = false;
		for (const recipeIngredient of recipe.ingredients) {
			if (recipeIngredient.ingredient === ingredient) {
				found = true;
				break;
			}
		}
		if (!found) {
			return false;
		}
	}
	return true;
};

export const getFilteredAppliances = (recipe, appliancesParams) => {
	if (appliancesParams.length === 0) {
		return true;
	}
	for (const appliance of appliancesParams) {
		if (!recipe.appliance.includes(appliance)) {
			return false;
		}
	}
	return true;
};

export const getFilteredUstensils = (recipe, ustensilsParams) => {
	if (ustensilsParams.length === 0) {
		return true;
	}
	for (const ustensil of ustensilsParams) {
		if (!recipe.ustensils.includes(ustensil)) {
			return false;
		}
	}
	return true;
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
	const filteredRecipes = [];
	for (const recipe of recipes) {
		if (
			getFilteredIngredients(recipe, queryParams.ingredients) &&
			getFilteredAppliances(recipe, queryParams.appliances) &&
			getFilteredUstensils(recipe, queryParams.ustensils) &&
			getFilteredServices(recipe, queryParams.search)
		) {
			filteredRecipes.push(recipe);
		}
	}
	return filteredRecipes;
};
