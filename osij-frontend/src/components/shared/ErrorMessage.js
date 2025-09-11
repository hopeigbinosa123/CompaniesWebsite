// src/components/shared/ErrorMessage.jsx
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-70">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-red-600 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again 
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;