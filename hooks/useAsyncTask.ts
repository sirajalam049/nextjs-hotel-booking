import { useState } from 'react';

type TStatus = 'IDEAL' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
function useAsyncTask<T>(task: (arg: T) => Promise<any>) {

    const [status, setStatus] = useState<TStatus>('IDEAL');
    const [message, setMessage] = useState('');
    const run = async (arg: T) => {
        setStatus('PROCESSING');
        //let resp;
        try {
            const resp: any = await task(arg);
            setStatus('SUCCESS');
            setMessage(resp?.message || '');
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