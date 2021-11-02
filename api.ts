const API_KEY = "002961bd2140e2ec107152021c382b9d";
const BASE_URL = "https://api.themoviedb.org/3";

interface BaseResponse {
  page: number;
  total_results: number;
  toatl_pages: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const movieAPI = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then(
      (response) => response.json()
    ),

  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-us&page=1&region=KR`
    ).then((response) => response.json()),

  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-us&page=1&region=KR`
    ).then((response) => response.json()),

  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-us&page=1&region=KR&query=${query}`
    ).then((response) => response.json());
  },
};

export const tvAPI = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((response) =>
      response.json()
    ),
  airing: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((response) =>
      response.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((response) =>
      response.json()
    ),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-us&page=1&region=KR&query=${query}`
    ).then((response) => response.json());
  },
};
