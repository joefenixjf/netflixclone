const API_KEY = "0943446e62854e299d5d694c71e0fcf7";
const API_BASE = "https://api.themoviedb.org/3";
const langAndKey = "language=pt-BR&api_key";
// let teste = "https://api.themoviedb.org/3/discover/tv?with_network=213&language=pt-BR&api_key=0943446e62854e299d5d694c71e0fcf7";
/* 
- originais netflix
- recomendados (trending)
- em alta(top rated)
- ação
- comédia
- terror
- romance
- documentários
*/

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais Netflix",
        items: await basicFetch(
          `/discover/tv?with_network=213&${langAndKey}=${API_KEY}`
        ),
      },
      {
        slug: "treding",
        title: "Recomendados para Você",
        items: await basicFetch(`/trending/all/week?${langAndKey}=${API_KEY}`),
      },
      {
        slug: "toprated",
        title: "Em Alta",
        items: await basicFetch(`/movie/top_rated?${langAndKey}=${API_KEY}`),
      },
      {
        slug: "action",
        title: "ação",
        items: await basicFetch(
          `/discover/movie?with_genres=28&${langAndKey}=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "comédia",
        items: await basicFetch(
          `/discover/movie?with_genres=35&${langAndKey}=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFetch(
          `/discover/movie?with_genres=27&${langAndKey}=${API_KEY}`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?with_genres=10749&${langAndKey}=${API_KEY}`
        ),
      },
      {
        slug: "documentaries",
        title: "Documentários",
        items: await basicFetch(
          `/discover/movie?with_genres=99&${langAndKey}=${API_KEY}`
        ),
      },
    ];
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case "movie":
          info = await basicFetch(`/movie/${movieId}?${langAndKey}=${API_KEY}`);
          break;
        case "tv":
          info = await basicFetch(`/tv/${movieId}?${langAndKey}=${API_KEY}`);
          break;
        default:
          info = null;
          break;
      }
    }
    return info;
  },
};
