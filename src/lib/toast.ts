import { toast as api, ExternalToast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

const showToast = (type: ToastType, message: string, options?: ExternalToast) => {
  api[type](message, options);
};

const toast = {
  success: (message: string, options?: ExternalToast) => showToast('success', message, options),
  error: (message: string, options?: ExternalToast) => showToast('error', message, options),
  info: (message: string, options?: ExternalToast) => showToast('info', message, options),
  warning: (message: string, options?: ExternalToast) => showToast('warning', message, options),
};

export default toast;
