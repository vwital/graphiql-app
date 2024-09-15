"use client";
import AuthorCard from "../author-card/AuthorCard";
import vwitalImg from "@/assets/img/vwital.jpg";
import panakirImg from "@/assets/img/panakir.jpg";
import dzehil02Img from "@/assets/img/dzehil02.jpg";
import { authors } from "../author-card/authorsInfo";
import styles from "./authors-slider.module.scss";
import { useState } from "react";

const AuthorsSlider = (): React.ReactNode => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { vwital, panakir, dzehil02 } = authors();
  const slides = [
    {
      id: 1,
      elem: (
        <AuthorCard
          className={styles.slide}
          src={vwitalImg}
          text={vwital}
        ></AuthorCard>
      ),
    },
    {
      id: 2,
      elem: (
        <AuthorCard
          className={styles.slide}
          src={panakirImg}
          text={panakir}
        ></AuthorCard>
      ),
    },
    {
      id: 3,
      elem: (
        <AuthorCard
          className={styles.slide}
          src={dzehil02Img}
          text={dzehil02}
        ></AuthorCard>
      ),
    },
  ];

  const handleButtonClick = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slides__wrapper}>
        <div
          className={styles.slides}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => slide.elem)}
        </div>
      </div>
      <div className={styles.slider__controls}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.slider__btn} ${currentSlide === index ? styles.slider__btn_active : ""} button`}
            onClick={() => handleButtonClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default AuthorsSlider;
