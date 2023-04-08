export default interface ToastProps {
  message: string;
  type: 'warning' | 'info' | 'error' | 'success';
  autoClear?: number;
}
