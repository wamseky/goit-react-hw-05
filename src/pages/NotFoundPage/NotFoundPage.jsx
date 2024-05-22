import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <p>Sorry, but the page was not found.</p>
      <p>
        <Link to="/">Go Back!</Link>
      </p>
    </>
  );
}