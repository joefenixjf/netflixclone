import React from "react";
import "./FeatureMovie.css";

export default ({ item }) => {
  console.log(item)
  let genres = []
  if (item.genres !== undefined) {
    genres = item.genres.map(i => i.name)
  }
  console.log(genres)
  return (
    <section className="featured" style={{
      backgroundSize:'cover',
      backgroundPosiion: "center",
      backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} pontos</div>
            <div className="featured--year">{
              String(new Date(item.first_air_date).getFullYear()
              )
            }
            </div>
            <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
            <div className="featured--description">{item.overview}</div>
            <div className="featured--buttons">
              <a href={ `/watch/${item.id}` } className="featured--watchButton">► Assistir</a>
              <a href={ `/list/add/${ item.id }`} className="featured--listButton">+ Minha Lista</a>
            </div>
            <div className="featured--genres"><strong>Gêneros:</strong> { genres.join(', ') }</div>

          </div>
        </div>
      </div>
      {/* <div>{ item.original_name }</div> */}
    </section>
  )
}