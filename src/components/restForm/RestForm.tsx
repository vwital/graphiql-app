import styles from "./restForm.module.scss";

const RestForm = (): React.ReactNode => {
  return (
    <>
      <h2>REST client</h2>
      <form className={styles.form}>
        <div className={styles.form__row}>
          <div className={styles.form__field}>
            <label
              className={styles.form__label}
              htmlFor="method"
            >
              Method
            </label>
            <select
              className="select"
              name="method"
              id="method"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className={styles.form__field + " " + styles.form__field_url}>
            <label
              className={styles.form__label}
              htmlFor="url"
            >
              URL
            </label>
            <input
              className="input"
              type="text"
              name="url"
              id="url"
              placeholder="https://example.com"
            />
          </div>
        </div>
        <div className={styles.form__row + " " + styles.form__row_header}>
          <label className={styles.form__label}>Header</label>
          <div className={styles.form__field_wrapper}>
            <input
              className="input"
              type="text"
              name="headers"
              id="headerKey"
              placeholder="Header key"
            />
            <input
              className="input"
              type="text"
              name="headers"
              id="headerValue"
              placeholder="Header value"
            />
          </div>
          <button
            type="button"
            className={styles.form__button + " button"}
          >
            Add header
          </button>
        </div>
        <button
          type="submit"
          className={styles.form__button + " button"}
        >
          Send request
        </button>
      </form>
    </>
  );
};

export default RestForm;
