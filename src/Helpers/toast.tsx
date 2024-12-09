import { Toast } from 'primereact/toast';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const ToastContext = createContext<Toast | null>(null);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: React.PropsWithChildren<unknown>) {
  const ref = useRef<Toast>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  // We have to wrap the ref in a state to force a re-render on initial mount, otherwise the context value will be null
  useEffect(() => {
    if (ref.current) setToast(ref.current);
  }, [ref]);

  return (
    <>
      <Toast ref={ref} />
      <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
    </>
  );
}
