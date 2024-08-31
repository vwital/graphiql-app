"use client";

import { useTranslations } from "next-intl";
import styles from "./restForm.module.scss";
import { useFieldArray, useForm } from "react-hook-form";

type FormValues = {
  method: string;
  url: string;
  headers: {
    key: string;
    value: string;
  }[];
  body: {
    value: string;
  }[];
};

const RestForm = (): React.ReactNode => {
  const t = useTranslations("RestClientPage");
  const { register, handleSubmit, control } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {},
  });

  const {
    fields: headersFields,
    append: headersAppend,
    remove: headersRemove,
  } = useFieldArray({
    name: "headers",
    control,
  });
  const {
    fields: bodyFields,
    append: bodyAppend,
    remove: bodyRemove,
  } = useFieldArray({
    name: "body",
    control,
  });

  const onSubmit = (data: FormValues): FormValues => {
    return data;
  };

  return (
    <>
      <h2>{t("title")}</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.form__row}>
          <div className={styles.form__field}>
            <label
              className={styles.form__label}
              htmlFor="method"
            >
              {t("method")}
            </label>
            <select
              {...register("method")}
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
              {t("url")}
            </label>
            <input
              {...register("url")}
              className="input"
              type="text"
              name="url"
              id="url"
              placeholder="https://example.com"
              value={"https://example.com"}
            />
          </div>
        </div>
        <div className={styles.form__headers + " " + styles.headers}>
          {headersFields.map((field, index) => {
            return (
              <div
                key={field.id}
                className={styles.headers__row}
              >
                <label className={styles.headers__label}>
                  <span>Header key</span>
                  <input
                    {...register(`headers.${index}.key`)}
                    className={`${styles.headers__input} input`}
                    type="text"
                    name="headerKey"
                    id="headerKey"
                  />
                </label>
                <label className={styles.headers__label}>
                  <span>Header value</span>
                  <input
                    {...register(`headers.${index}.value`)}
                    className={`${styles.headers__input} input`}
                    type="text"
                    name="headerValue"
                    id="headerValue"
                  />
                </label>
                <button
                  className={`${styles.headers__button} ${styles.headers__button_delete}  button`}
                  type="button"
                  onClick={() => headersRemove(index)}
                >
                  Delete
                </button>
              </div>
            );
          })}
          <button
            className={styles.form__button + " button"}
            type="button"
            onClick={() => headersAppend({ key: "", value: "" })}
          >
            {t("addHeader")}
          </button>
        </div>
        <div className={`${styles.form__body} ${styles.form__body} `}>
          {bodyFields.map((field, index) => (
            <div
              key={field.id}
              className={styles.form__row}
            >
              <label className={styles.headers__label}>
                <span>Body</span>
                <textarea
                  {...register(`body.${index}.value`)}
                  key={field.id}
                  name={`body.${index}.value`}
                  id={`body.${index}.value`}
                  rows={10}
                />
              </label>
            </div>
          ))}
          <div className={styles.body__buttons}>
            <button
              className="button"
              type="button"
              disabled={bodyFields.length === 1}
              onClick={() => bodyAppend({ value: "" })}
            >
              Add body
            </button>
            {bodyFields.length === 1 ? (
              <button
                className="button"
                type="button"
                onClick={() => bodyRemove(0)}
              >
                Delete body
              </button>
            ) : null}
          </div>
        </div>
        <button
          type="submit"
          className={styles.form__button + " button"}
        >
          {t("send")}
        </button>
      </form>
    </>
  );
};

export default RestForm;
