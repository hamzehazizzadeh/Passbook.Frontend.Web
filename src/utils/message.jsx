import { toast } from 'react-toastify';

const option = {
  position: 'top-right',
  closeOnClick: true,
};

export const successMessage = (message) => {
  toast.success(message, option);
};

export const errorMessage = (message) => {
  toast.error(message, option);
};
