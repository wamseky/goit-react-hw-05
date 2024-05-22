import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(movie => {
        return (
          <li className={css.item} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              />
              <div className={css.nameWrapper}>
                <p className={css.title}>{movie.title}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}