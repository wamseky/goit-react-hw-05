import axios from 'axios';

const url = 'https://api.themoviedb.org/3';

const options = {
  params: {
    include_adult: false,
    language: 'en-US',
    page: 1,
  },

  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzFhOTRhOGQzNzg4ODJjNDRiNDZjZjRkODY1N2EwZiIsInN1YiI6IjY2MmQzMzk1NWE3ODg0MDEyN2MxNjNiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yc0zv0l6Gz1Ru0UFSu4rjwylgkfLlA_tlvnXjTx5CUg',
  },
};

export const getTrendingMovies = async function () {
  const response = await axios.get(`${url}/trending/movie/week`, options);

  return response.data.results;
};

export const getSearchMovies = async function (query, page) {
  const response = await axios.get(`${url}/search/movie`, {
    params: {
      query: query,
      page: page,
    },
    headers: options.headers,
  });

  return response.data.results;
};

export const getDetailsMovies = async function (id) {
  const response = await axios.get(`${url}/movie/${id}`, options);

  return response.data;
};

export const getCreditsMovies = async function (id) {
  const response = await axios.get(`${url}/movie/${id}/credits`, options);

  return response.data;
};

export const getReviewsMovies = async function (id) {
  const response = await axios.get(`${url}/movie/${id}/reviews`, options);

  return response.data.results;
};