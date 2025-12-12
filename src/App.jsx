import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import LoadingScreen from "./ErrorHandling/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import { ErrorBoundary } from "./ErrorHandling/ErrorBoundary";
import ErrorFallback from "./ErrorHandling/ErrorFallback";

function App() {
  return (
    <BrowserRouter>
       <ScrollToTop/>
      {/* Highest protection around the entire app */}
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, info) => {
          console.error("Logged error:", error);
          console.error("Component Stack:", info?.componentStack);
        }}
        onReset={() => {
          console.log("Error boundary reset");
        }}
      >
        {/* Needed for lazy loading */}
        <Suspense fallback={<LoadingScreen />}>
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
