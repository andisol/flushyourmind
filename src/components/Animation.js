import React, { useEffect } from "react";
import { gsap } from "gsap";

function Animation({ thought, onAnimationComplete, startPosition }) {
  useEffect(() => {
    const animations = [
      confettiAnimation,
      balloonAnimation,
      fadeAwayAnimation,
      shatterAnimation,
      spinAwayAnimation,
      explodeIntoStarsAnimation,
    ];

    // Pick a random animation
    const animationFunc =
      animations[Math.floor(Math.random() * animations.length)];
    animationFunc(onCompleteAnimation, startPosition);
  }, [thought, onAnimationComplete, startPosition]);

  const setInitialPosition = (element) => {
    if (startPosition) {
      gsap.set(element, {
        position: "absolute",
        top: startPosition.top,
        left: startPosition.left,
        width: startPosition.width,
        height: startPosition.height,
      });
    }
  };

  const onCompleteAnimation = () => {
    onAnimationComplete();
  };

  const confettiAnimation = (onComplete, startPosition) => {
    const appElement = document.querySelector(".app");
    const thoughtElement = document.querySelector(".thoughtText");

    // Set initial position
    setInitialPosition(thoughtElement);

    const animation = gsap.timeline({
      onComplete: () => onComplete(),
    });
    animation
      .to(thoughtElement, { y: "-=100", duration: 2 }) // Float up
      .to(thoughtElement, { scaleX: 0.5, scaleY: 1.2, duration: 0.7 })
      .to(thoughtElement, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // Confetti effect
          for (let i = 0; i < 20; i++) {
            const confetti = document.createElement("div");
            confetti.className = "confetti";
            confetti.style.left = `${Math.random() * 100}%`;
            appElement.appendChild(confetti);

            gsap.to(confetti, {
              y: () => gsap.utils.random(50, 200),
              x: () => gsap.utils.random(-100, 100),
              rotation: () => gsap.utils.random(0, 360),
              opacity: 0,
              duration: 2,
              onComplete: () => confetti.remove(),
            });
          }
        },
      });
  };

  const balloonAnimation = (onComplete, startPosition) => {
    const thoughtElement = document.querySelector(".thoughtText");

    // Set initial position
    setInitialPosition(thoughtElement);

    gsap
      .timeline({
        onComplete: () => onComplete(),
      })
      .to(thoughtElement, { y: "-=100", duration: 2 }) // Float up
      .to(thoughtElement, { scale: 0.8, duration: 0.5 })
      .to(thoughtElement, {
        borderRadius: "50%",
        backgroundColor: "#FF69B4",
        color: "#FFFFFF",
        padding: "20px",
        duration: 0.5,
      })
      .to(thoughtElement, {
        y: -window.innerHeight,
        duration: 2,
        ease: "power1.in",
      })
      .to(thoughtElement, {
        opacity: 0,
        duration: 0.2,
      });
  };

  const fadeAwayAnimation = (onComplete, startPosition) => {
    const thoughtElement = document.querySelector(".thoughtText");

    // Set initial position
    setInitialPosition(thoughtElement);

    gsap
      .timeline({
        onComplete: () => onComplete(),
      })
      .to(thoughtElement, { y: "-=100", duration: 2 }) // Float up
      .to(thoughtElement, {
        opacity: 0,
        duration: 2,
      });
  };

  const shatterAnimation = (onComplete, startPosition) => {
    const thoughtElement = document.querySelector(".thoughtText");

    // Set initial position
    setInitialPosition(thoughtElement);

    gsap
      .timeline({
        onComplete: () => onComplete(),
      })
      .to(thoughtElement, { y: "-=100", duration: 2 }) // Float up
      .to(thoughtElement, {
        scale: 0,
        rotation: 180,
        duration: 1,
        ease: "power2.in",
      });
  };

  const spinAwayAnimation = (onComplete, startPosition) => {
    const thoughtElement = document.querySelector(".thoughtText");

    // Set initial position
    setInitialPosition(thoughtElement);

    gsap
      .timeline({
        onComplete: () => onComplete(),
      })
      .to(thoughtElement, { y: "-=100", duration: 2 }) // Float up
      .to(thoughtElement, {
        rotation: 720,
        scale: 0,
        duration: 2,
        ease: "power2.in",
      });
  };

  const explodeIntoStarsAnimation = (onComplete, startPosition) => {
    const thoughtElement = document.querySelector(".thoughtText");
    const appElement = document.querySelector(".app");

    // Set initial position
    setInitialPosition(thoughtElement);

    gsap
      .timeline()
      .to(thoughtElement, { y: "-=100", duration: 2 }) // Float up
      .to(thoughtElement, { scale: 0.5, duration: 0.5 })
      .to(thoughtElement, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // Get the final position of the thoughtElement
          const thoughtRect = thoughtElement.getBoundingClientRect();
          const appRect = appElement.getBoundingClientRect();

          const explosionX =
            thoughtRect.left + thoughtRect.width / 2 - appRect.left;
          const explosionY =
            thoughtRect.top + thoughtRect.height / 2 - appRect.top;

          // Create stars at the final position
          for (let i = 0; i < 20; i++) {
            const star = document.createElement("div");
            star.className = "star";
            star.style.left = `${explosionX}px`;
            star.style.top = `${explosionY}px`;
            appElement.appendChild(star);

            gsap.to(star, {
              x: () => gsap.utils.random(-200, 200),
              y: () => gsap.utils.random(-200, 200),
              scale: 0,
              opacity: 0,
              duration: 2,
              onComplete: () => star.remove(),
            });
          }
          // Call onComplete after the stars have been created
          onComplete();
        },
      });
  };

  return <div className="thoughtText">{thought}</div>;
}

export default Animation;
