import { useEffect, useRef, useState } from 'react';
import Typed from 'react-typed';

const slides = [
  { type: 'image', src: require('../assets/slide-img.jpeg') },
  { type: 'video', src: require('../assets/demo.mp4') },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current); // clear previous timeout

    // Set timeout for both image and video slides
    const timeoutDuration = slides[currentIndex].type === 'image' ? 4000 : 10000;
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, timeoutDuration);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  const handleVideoEnded = () => {
    clearTimeout(timeoutRef.current); // just in case
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handleSlideClick = () => {
    clearTimeout(timeoutRef.current);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onClick={handleSlideClick}
    >
      {/* Background Slide */}
      <div className="absolute inset-0 w-full h-full transition-opacity duration-1000 opacity-100">
        {currentSlide.type === 'image' ? (
          <img
            src={currentSlide.src}
            alt="Slide Background"
            className="w-full h-full object-cover"
            onError={() => {
              console.warn('Image failed to load, skipping...');
              setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }}
          />
        ) : (
          <video
            src={currentSlide.src}
            className="w-full h-full object-cover"
            muted
            autoPlay
            loop={false}
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            onError={() => {
              console.warn('Video failed to load, skipping...');
              setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }}
          />
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-white">
        <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
          <p className="text-[hsl(358,77%,51%)] font-bold p-2">
            REVOLUTIONIZED RADIOLOGY IMAGING
          </p>
          <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
            Best Teleradiology Solutions
          </h1>
          <h2 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
            Welcome to U4RAD
          </h2>
          <div className="flex justify-center items-center">
            <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
              We provide..
            </p>
            <Typed
              className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
              strings={['24/7 reporting', 'eRaaS', 'SOAS']}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
          </div>
          <p className="md:text-2xl text-xl font-bold text-gray-300">
            We are AI enabled integrated Radiology Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;