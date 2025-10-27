let toastInstance = null

export function setToastInstance(instance) {
  toastInstance = instance
}

export function useToast() {
  return {
    success: (message) => {
      if (toastInstance) {
        toastInstance.showToast(message, 'success')
      }
    },
    error: (message) => {
      if (toastInstance) {
        toastInstance.showToast(message, 'error')
      }
    },
  }
}
