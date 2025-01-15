import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// custom hook to make notification in the app  

const Notification = (msg, type) => {
    switch (type) {
        case 'success':
            toast.success(msg);
            break;
        case 'warn':
            toast.warn(msg);
            break;
        case 'error':
            toast.error(msg);
            break;
        default:
            toast.done(msg)
    }
}
export default Notification
