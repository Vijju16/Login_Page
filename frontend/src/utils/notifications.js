import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleError = (message) => toast.error(message);
export const handleSuccess = (message) => toast.success(message);
