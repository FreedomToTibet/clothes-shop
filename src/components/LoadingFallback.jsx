import './LoadingFallback.scss';

const LoadingFallback = () => {
  return (
    <div className="loading-fallback">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingFallback;
