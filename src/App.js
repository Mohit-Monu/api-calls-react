import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

 function App() {
  const [movies,setMovies]=useState([])
  const [isLoading,setIsLoading]=useState(false,)
  const [error,setError]=useState(false)
  async function fetchmovies(){
    try{
      setError(false)
      setIsLoading(true)
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
      setIsLoading(false)
    }catch(err){
      setError(true)
      console.log(err)
      setTimeout(()=>{
        fetchmovies()
      },5000)
    }
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchmovies} >Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !error && <MoviesList movies={movies}/>}
        {isLoading && !error && <p>Loading...</p> }
        {error && <p>Something went wrong...<b>Retrying</b></p>}
      </section>
    </React.Fragment>
  );
}

export default App;
