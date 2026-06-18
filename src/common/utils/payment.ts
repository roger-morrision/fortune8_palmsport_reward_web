type PaymentOptions = {
  url: string;
  onSuccess?: (data?: any) => void;
  onFailure?: (data?: any) => void;
  onClose?: () => void;
};

let paymentPopup: Window | null = null;
let closeCheckTimer: ReturnType<typeof setInterval> | null = null;

const isIOS = () => {
  if (typeof window === "undefined") return false;

  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const PaymentGateway = {
  open({ url, onSuccess, onFailure, onClose }: PaymentOptions) {
    const iosBrowser = isIOS();

    const cleanup = () => {
      window.removeEventListener("message", handleMessage);

      if (closeCheckTimer) {
        clearInterval(closeCheckTimer);
        closeCheckTimer = null;
      }

      // Close popup safely
      if (paymentPopup && !paymentPopup.closed) {
        paymentPopup.close();
      }

      paymentPopup = null;
    };

    // Message listener
    const handleMessage = (event: MessageEvent) => {
      console.log("📩 Message received", event.data);
      const status = event.data?.status;

      switch (status) {
        case "success":
          console.log("✅ Payment SUCCESS");
          onSuccess?.(event.data);
          cleanup();
          break;

        case "failed":
          console.log("❌ Payment FAILED");
          onFailure?.(event.data);
          cleanup();
          break;

        default:
          break;
      }
    };

    window.addEventListener("message", handleMessage);

    // Mobile → redirect directly
    if (iosBrowser) {
      window.location.href = url;
      return;
    }

    // Desktop → popup
    paymentPopup = window.open(url, "_blank", "popup=yes,width=500,height=700");

    if (!paymentPopup) {
      alert("If payment page does not open, please allow popups in Safari settings.");
      return;
    }

    paymentPopup.focus();

    // Detect manual popup close
    closeCheckTimer = setInterval(() => {
      if (paymentPopup?.closed) {
        console.log("Popup closed manually");
        onClose?.();
        cleanup();
      }
    }, 500);
  },
};
