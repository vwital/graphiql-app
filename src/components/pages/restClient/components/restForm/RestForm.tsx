"use client";

import { useTranslations } from "next-intl";
import styles from "./restForm.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { usePathname, useRouter } from "@/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { convertFromBase64, convertToBase64 } from "@/utils/convertBase64";
import { useEffect, useState } from "react";
import isJson from "@/utils/isJson";
import { METHODS } from "./constants";
import restClientFormAction from "@/app/actions/restClientFormAction";
import { useFormState } from "react-dom";
import { addResponse } from "@/app/lib/features/restClient/slice";
import { useDispatch } from "react-redux";
import SubmitButton from "./components/SubmitButton";

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
  const searchParams = useSearchParams();
  const [json, setJson] = useState<string>();
  const [headerKey, setHeaderKey] = useState<string>("");
  const [headerValue, setHeaderValue] = useState<string>("");
  const [state, submitAction] = useFormState(restClientFormAction, null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state !== null) {
      dispatch(addResponse(state));
    }
  }, [state]);

  const {
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      body: [
        {
          value: handleDefaultValue()?.body ?? null,
        },
      ],
    },
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

  const handleUrlBlur = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const base64 = convertToBase64(event.target.value);
    if (event.target.value === "") {
      return;
    }
    if (!urlParams.requestUrl) {
      const newPathname = urlParams.method
        ? `${pathname}/${base64}`
        : `${pathname}/GET/${base64}`;
      router.push(newPathname);
    }
    if (handleDefaultValue().url && handleDefaultValue().url.length) {
      const newPathname = pathname.split("/").slice(0, 3).join("/");
      router.push(`${newPathname}/${base64}`);
    }
    if (handleDefaultValue().body && handleDefaultValue().body.length) {
      const [, url] = pathname.split(`${urlParams.method}/`);
      const [, body] = url.split("/");
      const newPathname = pathname.split("/").slice(0, 3).join("/");
      router.push(`${newPathname}/${base64}/${body}`);
    }
  };

  function handleDefaultValue(): { url: string; body: string } {
    const defaultValues = {
      url: "",
      body: "",
    };
    if (urlParams.requestUrl) {
      const [url, body] = urlParams.requestUrl;
      defaultValues.url = convertFromBase64(url);
      defaultValues.body = body && convertFromBase64(body);
    }
    return defaultValues;
  }

  const handleBodyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setJson(event.target.value);
  };

  const handlePrettyButtonClick = (): void => {
    let prettyJson;
    if (json) {
      prettyJson = JSON.stringify(JSON.parse(json), null, 2);
    } else if (handleDefaultValue().body) {
      prettyJson = JSON.stringify(
        JSON.parse(handleDefaultValue().body),
        null,
        2
      );
    }
    setJson(prettyJson);
  };

  const handleBodyBlur = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    if (!json) {
      return;
    }
    if (!errors.body) {
      const newPathname =
        handleDefaultValue().body && handleDefaultValue().body.length > 0
          ? `${pathname.split("/").slice(0, -1).join("/")}/${convertToBase64(
              event.target.value
            )}`
          : `${pathname}/${convertToBase64(event.target.value)}`;

      router.push(newPathname);
    }
  };

  const handleDeleteBody = (): void => {
    bodyRemove(bodyFields.length - 1);
    setJson("");
    if (handleDefaultValue().body && handleDefaultValue().body.length) {
      const newPathname = pathname.split("/").slice(0, -1).join("/");
      router.push(newPathname);
    }
  };

  const handleHeaderKeyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setHeaderKey(event.target.value);
  };

  const handleHeaderValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setHeaderValue(event.target.value);
  };

  const handleHeaderApplyClick = (): void => {
    if (headerKey && headerValue) {
      const params = new URLSearchParams(searchParams);
      params.set(headerKey, headerValue);
      router.push(`${pathname}?${params.toString()}`);
      setHeaderKey("");
      setHeaderValue("");
    }
  };

  return (
    <>
      <h2>{t("title")}</h2>
      <form
        className={styles.form}
        action={submitAction}
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
              {METHODS.map((method) => (
                <option
                  key={method}
                  value={method}
                >
                  {method}
                </option>
              ))}
            </select>
          </div>
          <div className={`${styles.form__field} ${styles.form__field_url}`}>
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
              defaultValue={handleDefaultValue().url || ""}
              placeholder="https://example.com"
              onBlur={(event) => {
                handleUrlBlur(event);
              }}
            />
          </div>
        </div>

        <div className={`${styles.form__body} ${styles.form__body} `}>
          {bodyFields.map((field, index) =>
            !field.value ? null : (
              <div
                key={field.id}
                className={`${styles.form__row} ${styles.body__row}`}
              >
                <label className={styles.headers__label}>
                  <span className={styles.form__label}>
                    {t("responseBody")}
                  </span>
                  <textarea
                    className="textarea"
                    {...register(`body.${index}.value`, {
                      validate: (value) =>
                        (value && isJson(value)) || "Invalid JSON",
                      onChange: (event) => handleBodyChange(event),
                      onBlur: (event) => handleBodyBlur(event),
                    })}
                    key={field.id}
                    name={`body.${index}.value`}
                    id={`body.${index}.value`}
                    rows={10}
                    value={json}
                  />
                </label>
                {errors?.body?.[index]?.value?.message ? (
                  <p className="error error__text">
                    The Data is not valid. It should be JSON
                  </p>
                ) : null}
              </div>
            )
          )}

          <div className={styles.body__buttons}>
            <button
              className="button"
              type="button"
              disabled={
                bodyFields.length !== 1 ||
                !urlParams.requestUrl ||
                !!handleDefaultValue().body
              }
              title="Please, first fill the url field"
              onClick={() => bodyAppend({ value: " " })}
            >
              {t("addBody")}
            </button>
            {bodyFields.length > 1 || !!handleDefaultValue().body ? (
              <>
                <button
                  className="button"
                  type="button"
                  onClick={() => handleDeleteBody()}
                >
                  {t("deleteBody")}
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={handlePrettyButtonClick}
                  disabled={!!errors.body}
                >
                  {t("prettyJson")}
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className={`${styles.form__headers} ${styles.headers}`}>
          {headersFields.map((field, index) => {
            return (
              <div
                key={field.id}
                className={styles.headers__row}
              >
                <label className={styles.headers__label}>
                  <span className={styles.form__label}>
                    {t("headerKey")} #{index + 1}
                  </span>
                  <input
                    {...register(`headers.${index}.key`)}
                    className={`${styles.headers__input} input`}
                    type="text"
                    name={`headerKey-${index}`}
                    id={`headerKey-${index}`}
                    value={headerKey}
                    onChange={(event) => handleHeaderKeyChange(event)}
                  />
                </label>
                <label className={styles.headers__label}>
                  <span className={styles.form__label}>
                    {t("headerValue")} #{index + 1}
                  </span>
                  <input
                    {...register(`headers.${index}.value`)}
                    className={`${styles.headers__input} input`}
                    type="text"
                    name={`headerValue-${index}`}
                    id={`headerValue-${index}`}
                    value={headerValue}
                    onChange={(event) => handleHeaderValueChange(event)}
                  />
                </label>
                <button
                  type="button"
                  className={`${styles.headers__button} button`}
                  onClick={handleHeaderApplyClick}
                >
                  {t("apply")}
                </button>
                <button
                  className={`${styles.headers__button} button`}
                  type="button"
                  onClick={() => headersRemove(index)}
                >
                  {t("delete")}
                </button>
              </div>
            );
          })}
          <button
            className={`${styles.form__button} button`}
            type="button"
            disabled={handleDefaultValue().url.length < 1}
            onClick={() => headersAppend({ key: "", value: "" })}
          >
            {t("addHeader")}
          </button>
        </div>
        <SubmitButton className={`${styles.form__button} button`} />
      </form>
    </>
  );
};

export default RestForm;
