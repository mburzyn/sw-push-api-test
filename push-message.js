const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:michal.burzynski@rockwool.com',
  'BPE1JZX6eHpS4FMSKirUCSQk4Ovk9Ff0moY3M5c9JrekMLVrEwxo6_aUKS8fjWPcgMg52o_rerx5BDehFnFhCI8',
  '1zwEyx8EwqEmSNGFoDK2QN8UdjMeOgrS9Zja-NS5Ujs',
);
const text = 'That is a new notification';
const title = 'The notification';
const subscription = {
  'endpoint': 'https://fcm.googleapis.com/fcm/send/cXV0Yt1wg_4:APA91bFwPAvdGUwchN56cDX_YVQYETouw8bv9YXs4BjJogKUcOzTyfQY2pBqBojgApQA3pcwbtQqs5Jpc14cJgPGwERhYa3s6vW_JgO_ubHcLrEpBLsZrS0kEUk0n2eWrLOooGw6Dr4i',
  'expirationTime': null,
  'keys': {
    'p256dh': 'BHNNWt7W2KI4tdvIr10VzFJZZrc1uGJX1lEZC7X0wDl0_sMvVBohiEEU40DGkBPZvheQQ8eoFzO-v4BJzzdMjYs',
    'auth': '_a0yrfo9pi3bXjp4R0Kbfw'
  }
}
webpush.sendNotification(subscription, JSON.stringify({title, text}));