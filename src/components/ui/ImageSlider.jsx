import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ImageSlider.css';

export default function ImageSlider({ images = [], aspectRatio = '16/9', showDots = true }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const trackRef = useRef(null);

  const goTo = (index) => {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    setCurrent(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(current + 1);
      else goTo(current - 1);
    }
  };

  if (!images.length) return null;

  return (
    <div className="image-slider" style={{ aspectRatio }}>
      <div
        className="image-slider__track"
        ref={trackRef}
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, i) => (
          <div key={i} className="image-slider__slide">
            <img src={img.src || img} alt={img.alt || `Slide ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button className="image-slider__btn image-slider__btn--prev" onClick={() => goTo(current - 1)} aria-label="Anterior">
            <ChevronLeft size={20} />
          </button>
          <button className="image-slider__btn image-slider__btn--next" onClick={() => goTo(current + 1)} aria-label="Siguiente">
            <ChevronRight size={20} />
          </button>

          {showDots && (
            <div className="image-slider__dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`image-slider__dot ${i === current ? 'image-slider__dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
