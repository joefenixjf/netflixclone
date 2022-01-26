import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import "./App.css";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState({});
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Feature
      // lista de filmes originais
      let originals = list.filter((i) => i.slug === "originals")[0];
      let chosen =
        originals.items.results[
          Math.floor(Math.random() * originals.items.results.length + 1)
        ];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 12) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("scroll", scrollListener);
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {FeaturedMovie && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} item={item.items} />
        ))}
      </section>

      <footer>
        Feito com
        <span role="img" aria-label="coração">
          ❤️
        </span>
        pela B7web <br />
        Direitos de imagem para Netflix <br />
        Dados pegos do site Themoviedb.org
      </footer>
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="netflix loading"
            srcset=""
          />
        </div>
      )}
    </div>
  );
};
