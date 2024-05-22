import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchMovies } from '../../movies-api';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const newQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!newQuery) return;

    async function fetchMovies() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getSearchMovies(newQuery, page);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [newQuery, page]);

  const handleSubmit = event => {
    event.preventDefault();
    const inputQuery = event.target.elements.query.value.trim();

    setMovies([]);
    setPage(1);
    searchParams.set('query', inputQuery);
    setSearchParams(searchParams);
    event.target.reset();

    if (!inputQuery) {
      notify();
      return;
    }
  };

  const notify = () => {
    toast.error('Enter something to search', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.input} type="text" name="query" autoFocus />
        <button className={css.formBtn} type="submit">
          Search
        </button>
        <ToastContainer />
      </form>
      {isLoading && <Loader />}
      <MovieList movies={movies} />
      {movies.length === 0 && !isLoading && newQuery && !error && (
        <ErrorMessage />
      )}
      {error && <ErrorMessage />}
    </div>
  );
}