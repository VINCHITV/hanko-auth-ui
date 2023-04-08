import { createContext, useState } from 'react';
import ToastProps from '@/interfaces/toast';

interface ToastContextProps {
  toast: ToastProps | null;
  addToast: (toast: ToastProps) => void;
  removeToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>(
  {} as ToastContextProps
);

const ToastStore = ({ children }: { children: any }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const addToast = (toast: ToastProps) => setToast(toast);

  const removeToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastStore;
