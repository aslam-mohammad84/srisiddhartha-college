import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import CoursePage from './CoursePage';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import './App.css';
import './index.css';
import data from './data.json';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 2800);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  if (!data) return <div style={{textAlign: 'center', padding: '50px'}}>Error loading data.</div>;

  return (
    <>
      <div className={`site-loader ${isLoading ? '' : 'site-loader-hidden'}`} aria-hidden={!isLoading}>
        <div className="site-loader-mark">
          <img src="/logo.png" alt="" />
        </div>
        <p>Sri Siddhartha</p>
        <span className="site-loader-line" aria-hidden="true"><i /></span>
      </div>
      <Navbar data={data} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/course/:id" element={<CoursePage data={data} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
  
}
function FacultyCarousel({ faculty }) {

  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);


  const scrollToCard = (index) => {
    if (!carouselRef.current) return;

    const cards = carouselRef.current.children;

    if (!cards[index]) return;

    // scrollIntoView(), which can also participate in page scrolling.
    const targetLeft = cards[index].offsetLeft;
    carouselRef.current.scrollTo({
      left: targetLeft,
      behavior: "smooth"
    });

    setCurrentIndex(index);
  };
  const handlePrevious = () => {

    const newIndex =
      currentIndex === 0
        ? faculty.length - 1
        : currentIndex - 1;

    scrollToCard(newIndex);
  };


  const handleNext = () => {

    const newIndex =
      currentIndex === faculty.length - 1
        ? 0
        : currentIndex + 1;

    scrollToCard(newIndex);
  };


  const handleScroll = () => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const firstCard = carousel.children[0];

    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 18;
    const index = Math.round(
      carousel.scrollLeft / (cardWidth + gap)
    );

    const nextIndex = Math.max(
      0,
      Math.min(index, faculty.length - 1)
    );

    setCurrentIndex((prev) =>
      prev === nextIndex ? prev : nextIndex
    );
  };


  return (
    <>

      {/* Desktop / Mobile Controls */}

      <div className="faculty-carousel-controls">

        <button
          type="button"
          className="faculty-arrow faculty-prev"
          onClick={handlePrevious}
          aria-label="Previous faculty member"
        >
          ←
        </button>


        <div className="faculty-counter">

          <strong>
            {String(currentIndex + 1).padStart(2, "0")}
          </strong>

          <span>/</span>

          <span>
            {String(faculty.length).padStart(2, "0")}
          </span>

        </div>


        <button
          type="button"
          className="faculty-arrow faculty-next"
          onClick={handleNext}
          aria-label="Next faculty member"
        >
          →
        </button>

      </div>


      {/* Cards */}

      <div
        className="faculty-grid"
        ref={carouselRef}
        onScroll={handleScroll}
      >

        {faculty.map((member) => {

          const isAdministration =
            member.department?.trim().toLowerCase() ===
            "administration";


          return (

            <article
              className={`faculty-card ${
                isAdministration
                  ? "administration-card"
                  : ""
              }`}
              key={member.id}
            >

              {/* Image */}

              <div className="faculty-image-container">

                <img
                  src={`/faculty/${member.image}`}
                  alt={member.name}
                  className="faculty-image"
                  loading="lazy"
                />


                <div className="faculty-image-gradient"></div>


                {/* Designation */}

                <div className="faculty-designation">
                  {member.designation?.trim()}
                </div>


                {/* View Icon */}

                <div className="faculty-view-icon">
                  <span>↗</span>
                </div>

              </div>


              {/* Card Content */}

              <div className="faculty-card-content">

                <h3 className="faculty-name">
                  {member.name}
                </h3>


                {/* Department */}

                <div className="faculty-department">

                  <div className="faculty-department-icon">
                    <span>▦</span>
                  </div>

                  <span>
                    {member.department}
                  </span>

                </div>


                {/* Experience
                    Hidden automatically for Administration */}

                {!isAdministration &&
                  member.experience && (

                    <div className="faculty-bottom">

                      <div className="faculty-experience">

                        <div className="faculty-experience-icon">
                          <span>✦</span>
                        </div>

                        <div className="faculty-experience-text">

                          <span>
                            Experience
                          </span>

                          <strong>
                            {member.experience}
                          </strong>

                        </div>

                      </div>

                    </div>

                  )}

              </div>

            </article>

          );

        })}

      </div>


      {/* Mobile swipe hint */}

      <div className="faculty-swipe-hint">

        <span>←</span>

        <span>
          Swipe to explore faculty
        </span>

        <span>→</span>

      </div>


      {/* Dots */}

      <div className="faculty-dots">

        {faculty.map((_, index) => (

          <button
            type="button"
            key={index}
            className={
              index === currentIndex
                ? "faculty-dot active"
                : "faculty-dot"
            }
            onClick={() => scrollToCard(index)}
            aria-label={`Go to faculty ${index + 1}`}
          />

        ))}

      </div>

    </>
  );
}
export default App;
