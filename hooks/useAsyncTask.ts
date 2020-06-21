import { useState } from 'react';

type TStatus = 'IDEAL' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
function useAsyncTask<T extends any[], R>(task: (...args: T) => Promise<R>) {

    const [status, setStatus] = useState<TStatus>('IDEAL');
    const [message, setMessage] = useState('');
    const run = async (...arg: T) => {
        setStatus('PROCESSING');
        //let resp;
        try {
            const resp: R = await task(...arg);
            setStatus('SUCCESS');
            return resp;
        } catch (error) {
            let message = error?.response?.data?.error?.message || error.message;
            setMessage(message);
            setStatus('ERROR');
            throw error
        }

    }
    const reset = () => {
        setMessage("");
        setStatus('IDEAL');
    }


    return {
        run,
        status,
        message,
        reset
    }
}

export default useAsyncTask;