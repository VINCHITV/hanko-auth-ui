import { useContext } from 'react';
import { ToastContext } from '@/stores/toastStore';

const useToast = () => {
  const { addToast } = useContext(ToastContext);

  return {
    error: (message: string, autoClear?: number) =>
      addToast({ message, type: 'error', autoClear }),
    info: (message: string, autoClear?: number) =>
      addToast({ message, type: 'info', autoClear }),
    warning: (message: string, autoClear?: number) =>
      addToast({ message, type: 'warning', autoClear }),
    success: (message: string, autoClear?: number) =>
      addToast({ message, type: 'success', autoClear }),
  };
};

export default useToast;
