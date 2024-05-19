import { Field, Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (values, actions) => {
    if (!values.query.trim()) {
      toast.error('Please enter text to search for images.');
      actions.setSubmitting(false);
      return;
    }
    onSubmit(values.query);
    actions.resetForm();
  };

  return (
    <header>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.field}
            type="text"
            name="query"
            placeholder="Start searching photos"
          />
          <button className={css.searchBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
}
