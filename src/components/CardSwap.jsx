import React, { Children, cloneElement, forwardRef, isValidElement, useCallback, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config = useMemo(
    () =>
      easing === 'elastic'
        ? {
            ease: 'elastic.out(0.6,0.9)',
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05
          }
        : {
            ease: 'power1.inOut',
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2
          },
    [easing]
  );

  const fastConfig = useMemo(() => ({
    ease: 'power2.inOut',
    durDrop: 0.3,
    durMove: 0.3,
    durReturn: 0.3,
    promoteOverlap: 0.6,
    returnDelay: 0.1
  }), []);

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const isFastForwarding = useRef(false);
  const isPaused = useRef(false);

  const doSwap = useCallback((cfg) => {
    if (order.current.length < 2) return Promise.resolve();

    return new Promise((resolve) => {
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline({ onComplete: () => resolve() });
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: cfg.durDrop,
        ease: cfg.ease
      });

      tl.addLabel('promote', `-=${cfg.durDrop * cfg.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: cfg.durMove,
            ease: cfg.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${cfg.durMove * cfg.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: cfg.durReturn,
          ease: cfg.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    });
  }, [refs, cardDistance, verticalDistance]);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (!isFastForwarding.current && !isPaused.current) {
        doSwap(config);
      }
    }, delay);
  }, [doSwap, config, delay]);

  const pause = useCallback(() => {
    isPaused.current = true;
    tlRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    isPaused.current = false;
    tlRef.current?.play();
  }, []);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    doSwap(config);
    startInterval();

    if (pauseOnHover) {
      const node = container.current;
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const handleCardClick = useCallback(async (clickedIdx) => {
    if (isFastForwarding.current) return;

    const posInOrder = order.current.indexOf(clickedIdx);
    if (posInOrder === 0) return;

    isFastForwarding.current = true;
    clearInterval(intervalRef.current);
    tlRef.current?.kill();

    for (let step = 0; step < posInOrder; step++) {
      await doSwap(fastConfig);
    }

    isFastForwarding.current = false;
    startInterval();
  }, [doSwap, fastConfig, startInterval]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
            handleCardClick(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
