// "use client";

// import { useTranslations } from "next-intl";
// import styles from "./graphiForm.module.scss";
// import { useFieldArray, useForm } from "react-hook-form";
// import { usePathname, useRouter } from "@/navigation";
// import { useParams, useSearchParams } from "next/navigation";
// import { convertFromBase64, convertToBase64 } from "@/utils/convertBase64";
// import { useEffect, useState } from "react";
// import isJson from "@/utils/isJson";
// import SubmitButton from "./components/SubmitButton";

// type FormValues = {
//   endpoint: string;
//   sdlEndpoint: string;
//   headers: { key: string; value: string }[];
//   body: { query: string; variables: string }[];
// };

// const GraphiForm = (): React.ReactNode => {
//   const t = useTranslations("GraphiQL");
//   const router = useRouter();
//   const urlParams = useParams();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [json, setJson] = useState<string>();
//   const [headerKey, setHeaderKey] = useState<string>("");
//   const [headerValue, setHeaderValue] = useState<string>("");

//   const [schema, setSchema] = useState<string | null>(null);
//   const [sdlError, setSDLError] = useState<string | null>(null);

//   const {
//     register,
//     control,
//     formState: { errors },
//     watch,
//     setValue,
//   } = useForm<FormValues>({
//     mode: "onChange",
//     defaultValues: {
//       body: [
//         {
//           query: handleDefaultValue()?.body ?? "",
//           variables: handleDefaultValue()?.body ?? "",
//         },
//       ],
//     },
//   });

//   const endpointValue = watch("endpoint");
//   const sdlEndpoint = watch("sdlEndpoint") || `${endpointValue}?sdl`;

//   const fetchSDL = async (sdlEndpoint: string): Promise<void> => {
//     try {
//       const res = await fetch(sdlEndpoint);
//       if (!res.ok) throw new Error("Failed to fetch SDL");

//       const sdlData = await res.text();
//       setSchema(sdlData);
//       setSDLError(null);
//     } catch (e) {
//       setSchema(null);
//       setSDLError("Failed to load documentation");
//     }
//   };

//   useEffect(() => {
//     if (
//       sdlEndpoint &&
//       sdlEndpoint !== "undefined?sdl" &&
//       sdlEndpoint !== "?sdl"
//     ) {
//       fetchSDL(sdlEndpoint);
//     }
//   }, [sdlEndpoint]);

//   useEffect(() => {
//     setValue("sdlEndpoint", endpointValue ? `${endpointValue}?sdl` : "");
//   }, [endpointValue, setValue]);

//   const {
//     fields: headersFields,
//     append: headersAppend,
//     remove: headersRemove,
//   } = useFieldArray({
//     name: "headers",
//     control,
//   });

//   const {
//     fields: bodyFields,
//     append: bodyAppend,
//     remove: bodyRemove,
//   } = useFieldArray({
//     name: "body",
//     control,
//   });

//   const handleUrlBlur = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     const base64 = convertToBase64(event.target.value);
//     if (!event.target.value) return;

//     if (!urlParams.requestUrl) {
//       const newPathname = urlParams.method
//         ? `${pathname}/${base64}`
//         : `${pathname}/${base64}`;
//       router.push(newPathname);
//     } else if (handleDefaultValue().url && handleDefaultValue().url.length) {
//       const newPathname = pathname.split("/").slice(0, 3).join("/");
//       router.push(`${newPathname}/${base64}`);
//     } else if (handleDefaultValue().body && handleDefaultValue().body.length) {
//       const [, url] = pathname.split(`${urlParams.method}/`);
//       const [, body] = url.split("/");
//       const newPathname = pathname.split("/").slice(0, 3).join("/");
//       router.push(`${newPathname}/${base64}/${body}`);
//     }
//   };

//   function handleDefaultValue(): { url: string; body: string } {
//     const defaultValues = {
//       url: "",
//       body: "",
//     };
//     if (urlParams.requestUrl) {
//       console.log("urlParams", urlParams);
//       const [url, body] = urlParams.requestUrl;
//       defaultValues.url = convertFromBase64(url);
//       defaultValues.body = body && convertFromBase64(body);
//     }
//     return defaultValues;
//   }

//   const handleBodyChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ): void => {
//     setJson(event.target.value);
//   };

//   const handlePrettyButtonClick = (): void => {
//     let prettyJson;
//     if (json) {
//       prettyJson = JSON.stringify(JSON.parse(json), null, 2);
//     } else if (handleDefaultValue().body) {
//       prettyJson = JSON.stringify(
//         JSON.parse(handleDefaultValue().body),
//         null,
//         2
//       );
//     }
//     setJson(prettyJson);
//   };

//   const handleBodyBlur = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ): void => {
//     event.preventDefault();
//     if (!json) return;

//     if (!errors.body) {
//       const newPathname =
//         handleDefaultValue().body && handleDefaultValue().body.length > 0
//           ? `${pathname.split("/").slice(0, -1).join("/")}/${convertToBase64(event.target.value)}`
//           : `${pathname}/${convertToBase64(event.target.value)}`;

//       router.push(newPathname);
//     }
//   };

//   const handleDeleteBody = (): void => {
//     bodyRemove(bodyFields.length - 1);
//     setJson("");
//     if (handleDefaultValue().body && handleDefaultValue().body.length) {
//       const newPathname = pathname.split("/").slice(0, -1).join("/");
//       router.push(newPathname);
//     }
//   };

//   const handleHeaderKeyChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ): void => {
//     setHeaderKey(event.target.value);
//   };

//   const handleHeaderValueChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ): void => {
//     setHeaderValue(event.target.value);
//   };

//   const handleHeaderApplyClick = (): void => {
//     if (headerKey && headerValue) {
//       const params = new URLSearchParams(searchParams);
//       params.set(headerKey, headerValue);
//       router.push(`${pathname}?${params.toString()}`);
//       setHeaderKey("");
//       setHeaderValue("");
//     }
//   };

//   return (
//     <>
//       <h2>{t("header")}</h2>
//       <form className={styles.form}>
//         <div className={styles.form__row}>
//           <div className={`${styles.form__field} ${styles.form__field_url}`}>
//             <label
//               className={styles.form__label}
//               htmlFor="endpoint"
//             >
//               {t("endpoint")}
//             </label>
//             <input
//               {...(register("endpoint"), { required: true })}
//               className="input"
//               type="text"
//               name="url"
//               id="endpoint"
//               defaultValue={handleDefaultValue().url || ""}
//               placeholder="https://example.com"
//               onBlur={handleUrlBlur}
//             />

//             <label htmlFor="sdlEndpoint">SDL URL</label>
//             <input
//               className="input"
//               id="sdlEndpoint"
//               placeholder="SDL URL"
//               {...register("sdlEndpoint")}
//             />
//           </div>
//         </div>

//         <div className={`${styles.form__body} ${styles.form__body}`}>
//           {bodyFields.map((field, index) => (
//             <div
//               key={field.id}
//               className={styles.form__row}
//             >
//               <label className={styles.form__label}>
//                 {t("query")}
//                 <textarea
//                   className="textarea"
//                   {...register(`body.${index}.query`, {
//                     validate: (value) => isJson(value) || "Invalid JSON",
//                     onChange: handleBodyChange,
//                     onBlur: handleBodyBlur,
//                   })}
//                 />
//               </label>
//               <label className={styles.form__label}>
//                 {t("variables")}
//                 <textarea
//                   className="textarea"
//                   {...register(`body.${index}.variables`)}
//                 />
//               </label>
//               {errors?.body?.[index]?.query && (
//                 <p className="error">{errors.body[index].query.message}</p>
//               )}
//             </div>
//           ))}

//           <div className={styles.body__buttons}>
//             <button
//               className="button"
//               type="button"
//               disabled={
//                 bodyFields.length !== 1 ||
//                 !urlParams.requestUrl ||
//                 !!handleDefaultValue().body
//               }
//               title="Please, first fill the url field"
//               onClick={() => bodyAppend({ value: " " })}
//             >
//               {t("addBody")}
//             </button>
//             {bodyFields.length > 1 || !!handleDefaultValue().body ? (
//               <>
//                 <button
//                   className="button"
//                   type="button"
//                   onClick={handleDeleteBody}
//                 >
//                   {t("removeBody")}
//                 </button>
//                 <button
//                   type="button"
//                   className="button"
//                   onClick={handlePrettyButtonClick}
//                   disabled={!!errors.body}
//                 >
//                   {t("prettyJson")}
//                 </button>
//               </>
//             ) : null}
//           </div>
//         </div>
//         <div className={`${styles.form__headers} ${styles.headers}`}>
//           {headersFields.map((field, index) => (
//             <div
//               key={field.id}
//               className={styles.headers__row}
//             >
//               <label className={styles.headers__label}>
//                 <span className={styles.form__label}>{t("headerKey")}:</span>
//                 <input
//                   {...register(`headers.${index}.key`)}
//                   className="input"
//                   type="text"
//                 />
//               </label>
//               <label className={styles.headers__label}>
//                 <span className={styles.form__label}>{t("headerValue")}:</span>
//                 <input
//                   {...register(`headers.${index}.value`)}
//                   className="input"
//                   type="text"
//                 />
//               </label>
//               <button
//                 className="button"
//                 type="button"
//                 onClick={() => headersRemove(index)}
//               >
//                 {t("deleteHeader")}
//               </button>
//             </div>
//           ))}
//           <div className={styles.headers__button}>
//             <input
//               className="input"
//               value={headerKey}
//               type="text"
//               placeholder="Key"
//               onChange={handleHeaderKeyChange}
//             />
//             <input
//               className="input"
//               value={headerValue}
//               type="text"
//               placeholder="Value"
//               onChange={handleHeaderValueChange}
//             />
//             <button
//               className="button"
//               type="button"
//               onClick={handleHeaderApplyClick}
//             >
//               {t("applyHeader")}
//             </button>
//             <button
//               className="button"
//               type="button"
//               title="Click to add more headers"
//               onClick={() => headersAppend({ key: "", value: "" })}
//             >
//               {t("addHeader")}
//             </button>
//           </div>
//         </div>
//       </form>
//       <SubmitButton t={t} />
//       {schema && (
//         <section className={styles.documentation}>
//           <h2>{t("documentation")}</h2>
//           <pre className={styles.documentation__text}>{schema}</pre>
//         </section>
//       )}
//       {/* {sdlError && (
//         <p>
//           {t("documentationError")} {sdlError}
//         </p>
//       )} */}
//     </>
//   );
// };

// export default GraphiForm;
