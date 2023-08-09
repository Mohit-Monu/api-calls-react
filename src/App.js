import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

 function App() {
  const [movies,setMovies]=useState([])
  async function fetchmovies(){
    try{
      const data=await (await fetch('https://swapi.dev/api/films')).json()
      const movieslist=data.results.map((item,index)=>{
        return {
          id:item.episode_id,
          title:item.title,
          releaseDate:item.release_date,
          openingText:item.opening_crawl
        }
      })
      setMovies(movieslist)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchmovies} >Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
