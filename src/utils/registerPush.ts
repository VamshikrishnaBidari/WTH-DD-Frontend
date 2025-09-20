import api from "./axiosInstance";

export async function registerPush() {
  try {
    // Check for support
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.log("Push notifications not supported");
      return false;
    }

    // Request permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return false;
    }

    // Register service worker (change to .js file)
    const reg = await navigator.serviceWorker.register("/sw.js");
    await reg.update(); // Ensure latest version

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;

    // Subscribe to push notifications
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        import.meta.env.VITE_VAPID_PUBLIC_KEY,
      ),
    });

    // Send subscription to backend (don't stringify here - send as object)
    await api.post("/users/subscribe-to-push", {
      subscription: subscription.toJSON(), // Convert to plain object
    });

    console.log("Push notification registration successful");
    return true;
  } catch (error) {
    console.error("Error registering push notifications:", error);
    return false;
  }
}

// Helper function to unsubscribe (optional)
export async function unsubscribePush() {
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return;

    const subscription = await reg.pushManager.getSubscription();
    console.log("subscription", subscription);
    if (subscription) {
      await subscription.unsubscribe();
      // Optionally notify backend to remove subscription
      await api.post("/users/unsubscribe-push");
    }
  } catch (error) {
    console.error("Error unsubscribing from push notifications:", error);
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding: string = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64: string = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData: string = window.atob(base64);
  return Uint8Array.from(
    [...rawData].map((char: string) => char.charCodeAt(0)),
  );
}
