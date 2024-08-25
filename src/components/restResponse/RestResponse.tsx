import styles from "./response.module.scss";
const RestResponse = (): React.ReactNode => {
  return (
    <section className={styles.response__wrapper}>
      <h2>Response</h2>
      <div className={styles.response}>
        <p className={styles.response__text}>
          Status code: <span>{`${200}`}</span>
        </p>
        <label htmlFor="response">Body</label>
        <textarea
          className="textarea"
          name="response"
          id="response"
          value={`{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}`}
          cols={30}
          rows={10}
        />
      </div>
    </section>
  );
};

export default RestResponse;
