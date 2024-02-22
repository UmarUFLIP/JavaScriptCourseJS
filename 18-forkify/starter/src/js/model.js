import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err} 🔥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};
loadSearchResults('pizza');

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  // When page is 2. 2 - 1 = 1 * 10 = 10, and 2 * 10 = 20 so start = 10, end = 20
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  // The end in slice is (exclusive)
  return state.search.results.slice(start, end);
};
