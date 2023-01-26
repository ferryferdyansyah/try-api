import './App.css';
import {getMovieList, searchMovie} from './API';
import { useEffect, useState } from 'react';

const App = () => {
const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })

  }, [])

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
          <div className='Movie-wrapper' key={i}>
            <div className='title'>{movie.title}</div>
            <img className='Movie-image' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}></img>
            <div className='sinopsis'>{movie.overview}</div>
            <div className='date'>Release: {movie.release_date}</div>
            <div className='rate'>Rate: {movie.vote_average}</div>
          </div>
      )
    })
  }

  const search = async(q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ferry's Movie 23</h1>
        <input 
        placeholder='Search movie here..' 
        className='Movie-search'
        onChange={({target}) => search(target.value)}
        />
        <div className='Movie-container'>
          <PopularMoviesList/>
        </div>
      </header>
    </div>
  );
}

export default App;
