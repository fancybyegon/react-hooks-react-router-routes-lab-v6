import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 

function MovieCard({ movie }) {
  if (!movie) return null; 
  return (
    <article>
      <h2>{movie.title}</h2>
      <Link to={`/movie/${movie.id}`}>View Info</Link>
    </article>
  );
}

//prop-typeS validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
