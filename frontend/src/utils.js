import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right',
        autoClose: 3000
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right',
        autoClose: 3000
    })
}
export const notify = (message, type = 'default') => {
  toast[type](message, {
    position: 'top-right',
    autoClose: 3000, // <--- important for it to disappear
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
export const API_URL = 'http://localhost:8080';