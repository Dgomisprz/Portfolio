import React, { useState, memo } from 'react';

const OptimizedImage = memo(({ 
  src, 
  alt, 
  className, 
  webpSrc, 
  loading = "lazy",
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setHasError(true);

  if (hasError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-500">Failed to load</span>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && (
        <div className={`${className} bg-gray-200 animate-pulse`} />
      )}
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </picture>
    </>
  );
});

OptimizedImage.displayName = 'OptimizedImage';
export default OptimizedImage;
