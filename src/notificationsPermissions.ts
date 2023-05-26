// Check whether browser supports the promise version of requestPermission()
// Safari only supports the old callback-based version
function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);

  console.log(padding);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i = +1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const convertDataURIToBinary = (dataURI: string) =>
  Uint8Array.from(window.atob(dataURI.replace(/^data[^,]+,/, '')), v => v.charCodeAt(0));

// Public Key:
const VAPID_PUBLIC_KEY =
  'BPE1JZX6eHpS4FMSKirUCSQk4Ovk9Ff0moY3M5c9JrekMLVrEwxo6_aUKS8fjWPcgMg52o_rerx5BDehFnFhCI8';

// Private Key:
// 1zwEyx8EwqEmSNGFoDK2QN8UdjMeOgrS9Zja-NS5Ujs

export function subscribeUserToPush() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        const subscribeOptions: PushSubscriptionOptionsInit = {
          userVisibleOnly: true,
          applicationServerKey: VAPID_PUBLIC_KEY,
        };

        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then(pushSubscription => {
        console.log('Received PushSubscription: ', pushSubscription);

        return pushSubscription;
      });
  }
}

export function askNotificationPermission() {
  // Function to actually ask the permissions
  function handlePermission(permission: NotificationPermission) {
    console.log(permission);

    if (permission === 'granted') {
      console.log('permission granted');
    } else {
      console.log('permission not granted');
    }
  }

  // Check if the browser supports notifications
  if (!Reflect.has(window, 'Notification')) {
    console.log('This browser does not support notifications.');
  } else if (checkNotificationPromise()) {
    Notification.requestPermission().then(handlePermission);
  } else {
    Notification.requestPermission(handlePermission);
  }
}
