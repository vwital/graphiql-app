"use client";
import AuthorCard from "../author-card/AuthorCard";
import vwitalImg from "@/assets/img/vwital.jpg";
import panakirImg from "@/assets/img/panakir.jpg";
import dzehil02Img from "@/assets/img/dzehil02.jpg";
import { viwtal, panakir, dzehil02 } from "../author-card/authorsInfo";
import styles from "./authors-slider.module.scss";
import { useState } from "react";

const AuthorsSlider = (): React.ReactNode => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      elem: (
        <AuthorCard
          className={styles.slide}
          src={vwitalImg}
          text={viwtal()}
        ></AuthorCard>
      ),
    },
    {
      id: 2,
      elem: (
        <AuthorCard
          className={styles.slide}
          src={panakirImg}
          text={panakir()}
        ></AuthorCard>
      ),
    },
    {
      id: 3,
      elem: (
        <AuthorCard
          className={styles.slide}
          src={dzehil02Img}
          text={dzehil02()}
        ></AuthorCard>
      ),
    },
  ];

  const handleButtonClick = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles["slider-wrapper"]}>
      <div className={styles["slides-wrapper"]}>
        <div
          className={styles["slides"]}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((elem) => {
            return elem.elem;
          })}
        </div>
      </div>
      <div className={styles["slider-controls"]}>
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            className={`${styles["set-slide-btn"]} ${currentSlide === index ? styles["btn-active"] : ""}`}
            onClick={() => handleButtonClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default AuthorsSlider;
