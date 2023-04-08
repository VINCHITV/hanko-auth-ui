import { useContext, useEffect } from 'react';
import { ToastContext } from '@/stores/toastStore';

export const Toast = () => {
  const { toast, removeToast } = useContext(ToastContext);

  useEffect(() => {
    if (toast?.autoClear) {
      setTimeout(removeToast, toast.autoClear);
    }
  }, [toast]);

  return (
    <div className="absolute z-30 bottom-5 w-full px-4">
      {toast ? (
        <div className={`alert shadow-lg alert-${toast.type} py-2 px-4`}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-base-100 flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 className="font-bold">{toast.message}</h3>
            </div>
          </div>
          <div className="flex-none">
            <button className="btn btn-sm" onClick={removeToast}>
              close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
