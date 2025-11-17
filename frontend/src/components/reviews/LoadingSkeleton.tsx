import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <div>
      <Skeleton width={150} />
      <Skeleton width={100} />
      <Skeleton count={2} />
    </div>
  );
};

export default LoadingSkeleton;
