import { usePromiseTracker } from "react-promise-tracker";
import ReactLoading from 'react-loading';

const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();
    
    return <div >
    {promiseInProgress && 
    <ReactLoading type={"spokes"} color={"#0000ff"} height={64} width={64} />}

    </div>
}

export default LoadingIndicator;