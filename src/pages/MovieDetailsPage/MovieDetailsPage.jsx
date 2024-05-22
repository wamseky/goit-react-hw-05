import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import { getDetailsMovies } from '../../movies-api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const savedURL = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getDetailsMovies(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoviesById();
  }, [movieId]);

  return (
    <div className={css.containerPage}>
      {
        <div>
          <Link to={savedURL.current} className={css.back}>
            Go back
          </Link>
        </div>
      }
      {movieDetails && (
        <div className={css.wrapper}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.overview}
            />
          </div>
          <div>
            <p className={css.title}>{movieDetails.title}</p>
            <p className={css.genres}>
              Genres:{' '}
              {movieDetails.genres.map(genre => (
                <span key={genre.id}>{genre.name}. </span>
              ))}
            </p>
            <p className={css.overview}>Overview: </p>
            <p className={css.overviewText}>{movieDetails.overview}</p>
            <p className={css.rating}>Rating: {movieDetails.vote_average}</p>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={css.listInfo}>
        <li>
          <Link to="cast" className={css.link}>
            MovieCast
          </Link>
        </li>
        <li>
          <Link to="reviews" className={css.link}>
            MovieReviews
          </Link>
        </li>
      </ul>
      <Suspense fallback={<b>Loading...</b>}>
        <Outlet />
      </Suspense>
    </div>
  );
}