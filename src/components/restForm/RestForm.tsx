"use client";

import { useTranslations } from "next-intl";
import styles from "./restForm.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { convertFromBase64, convertToBase64 } from "@/utils/convertBase64";

type FormValues = {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  body: { value: string }[];
};

const RestForm = (): React.ReactNode => {
  const t = useTranslations("RestClientPage");
  const router = useRouter();
  const urlParams = useParams();
  const pathname = usePathname();
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

  const handleMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newPathname = urlParams.method
      ? pathname.replace(`/${urlParams.method}`, `/${event.target.value}`)
      : `${pathname}/${event.target.value}`;

    router.push(newPathname);
  };

  const handleUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const base64 = convertToBase64(event.target.value);
    if (event.target.value === "") {
      return;
    }
    if (!urlParams.requestUrl) {
      const newPath = urlParams.method
        ? `${pathname}/${base64}`
        : `${pathname}/GET/${base64}`;
      router.push(newPath);
    } else {
      const newPath = pathname.split("/").slice(0, -1).join("/");
      router.push(`${newPath}/${base64}`);
    }
  };

  const handleDefValue = (): string => {
    const valueBase64 = urlParams.requestUrl ? urlParams.requestUrl : "";
    if (!valueBase64) return "";
    return convertFromBase64(valueBase64);
  };

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
              onChange={(event) => {
                handleMethodChange(event);
              }}
              defaultValue={urlParams.method || "default"}
            >
              <option
                disabled
                value="default"
              >
                Choose method
              </option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
              <option value="HEAD">HEAD</option>
              <option value="OPTIONS">OPTIONS</option>
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
              defaultValue={handleDefValue()}
              placeholder="https://example.com"
              onBlur={(event) => {
                handleUrlChange(event);
              }}
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
