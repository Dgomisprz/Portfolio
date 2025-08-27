import { useState, useEffect, useRef, useCallback } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  const observerCallback = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      if (options.once !== false) {
        if (entry.target.__observer) {
          entry.target.__observer.disconnect();
        }
      }
    } else if (options.once === false) {
      setIsVisible(false);
    }
  }, [options.once]);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: options.threshold || 0.2,
      rootMargin: options.rootMargin || '0px'
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      currentElement.__observer = observer;
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [observerCallback, options.threshold, options.rootMargin]);

  return [elementRef, isVisible];
};

export default useIntersectionObserver;