import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [movies, setMovies] = useState("");
  const url = `https://api.themoviedb.org/3/search/movie?query=${movies}&api_key=4f99c02e8bcad841aa80e81ea963d4f6`;

  

  //4f99c02e8bcad841aa80e81ea963d4f6
  const searchMovies = (event) => {
    if (event.key == "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      // setMovies("");
    }
  };

  const fetchDefault = async() =>{
    try {
      const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=4f99c02e8bcad841aa80e81ea963d4f6")
      setData(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchDefault();
  },[])

  
  return (
    <div className="app">
      <div className="search my-16 text-center">
        <input
          value={movies}
          onChange={(event) => setMovies(event.target.value)}
          onKeyDown={searchMovies}
          placeholder="Search Movie"
          type="text"
          className="w-72 h-10 rounded-2xl text-2xl p-6 placeholder:text-white bg-gradient-to-r from-stone-700 to-neutral-400"
        />
      </div>
      <div className="container my-7 ">
        <div className="results grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-10">
          {data.results && 
            data.results.map((movie) => (
              movie.poster_path && !movie.adult &&(
              <div key={movie.id} className="movie mx-6 my-5">
              
                  <>
                <img
                  className="w-52"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className="text-xl font-bold  bg-gradient-to-r from-amber-200 to-amber-600 bg-clip-text text-transparent">{movie.title}</p>
                <div className="details">
                  <p>{movie.release_date}</p>
                  <p>
                    <span className="font-semibold">Rating: </span>
                    {movie.vote_average}
                  </p>
                </div>
                </>
              </div>
            )))
          // ) : (
          //   <p>No movie data available.</p>
          // )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
