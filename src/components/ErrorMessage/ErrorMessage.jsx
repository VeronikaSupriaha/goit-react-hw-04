import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <p className={css.errorMessage}>
      Oops...Something went wrong. Please try again later.
    </p>
  );
}
