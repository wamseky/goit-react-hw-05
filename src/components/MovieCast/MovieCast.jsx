import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCreditsMovies } from '../../movies-api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getCreditsMovies(movieId);
        setMovieCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoviesById();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movieCast.length > 0 && (
        <ul className={css.list}>
          {movieCast.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                title={actor.name}
              />
              <p>{actor.original_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}