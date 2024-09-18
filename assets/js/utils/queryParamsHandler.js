export const PARAMS_KEY = {
	INGREDIENTS: 'ingredients',
	APPLIANCE: 'appliances',
	USTENSILS: 'ustensils',
	SEARCH: 'search',
};

export const getQueryParams = () => {
	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);

	const paramsData = {
		[PARAMS_KEY.INGREDIENTS]: params.get(PARAMS_KEY.INGREDIENTS)?.split(',') || [],
		[PARAMS_KEY.APPLIANCE]: params.get(PARAMS_KEY.APPLIANCE)?.split(',') || [],
		[PARAMS_KEY.USTENSILS]: params.get(PARAMS_KEY.USTENSILS)?.split(',') || [],
		[PARAMS_KEY.SEARCH]: params.get(PARAMS_KEY.SEARCH) || '',
	};

	return paramsData;
};

export const setQueryParams = (key, value) => {
	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);

	let paramsValue = params.get(key)?.split(',') || [];
	if (paramsValue.includes(value)) {
		paramsValue = paramsValue.filter((v) => v !== value);
	} else {
		paramsValue.push(value);
	}

	paramsValue.length > 0 ? params.set(key, paramsValue.join(',')) : params.delete(key);

	if (key === 'search') {
		value === '' ? params.delete(key) : params.set(key, value);
	}

	url.search = params.toString();
	history.replaceState({}, '', url.toString());
	window.location.reload();
};
