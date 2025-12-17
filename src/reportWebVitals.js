// Performance measurements
const reportWebVitals = (onPerfEntry) => {
  if (typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ onCLS, onINP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);  // measures visual stability
      onINP(onPerfEntry);  // mearues interactivity
      onLCP(onPerfEntry);  // measure loading speed
      onTTFB(onPerfEntry);  // measures server response time
    });
  }
};

export default reportWebVitals;
