import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import ErrorFallback from "./ErrorFallback";

const ErrorBoundaryWrapper = (Component) => (props) => {
  const location = useLocation();

  return (
    <ErrorBoundary
      key={location.pathname} // use location from hook
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("Page error:", error);
        console.log("Component stack:", info.componentStack);
      }}
      resetKeys={[location.pathname]} // reset on route change
    >
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
