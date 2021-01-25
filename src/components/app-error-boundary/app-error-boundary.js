import React from 'react';
import './app-error-boundary.css';

class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
   }

   componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      this.logErrorToMyService(error, errorInfo);
   }

   logErrorToMyService(error, errorInfo) {
      console.log(error);
   }

   render() {
      if (this.state.hasError) {
         // You can render any custom fallback UI
         return (<div className="error-container">
            <img src="/logo/app-logo.png"
               alt="Instagram Logo"
            />
            <h1>Oops! Something went wrong.</h1>
         </div>);
      }

      return this.props.children;
   }
}

export default ErrorBoundary;