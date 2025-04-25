import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

function Movie() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null); // Added error state
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const { id: movieId } = useParams();

  useEffect(() => {
    setIsLoading(true); // Set loading to true on each fetch
    fetch(`http://localhost:4000/movies/${movieId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Set error message
        setIsLoading(false);
      });
  }, [movieId]);

  if (isLoading) {
    return (
      <main>
        <p>Loading movie...</p>
      </main>
    );
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        {error ? (
          <p>{error}</p> // Show error if there's any
        ) : (
          <article>
            <h1>{movie.title}</h1>
            <p>Duration: {movie.time} mins</p>
            <div>
              {movie.genres.map((genre, index) => (
                <span key={index} style={{ marginRight: "8px" }}>
                  {genre}
                </span>
              ))}
            </div>
          </article>
        )}
      </main>
    </>
  );
}

export default Movie;