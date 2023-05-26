import React from 'react';

import {
  askNotificationPermission,
  subscribeUserToPush,
} from './notificationsPermissions';

export const App: React.FC = () => {
  function sendNotification() {
    const text = 'Take a look at this brand new t-shirt!';
    const title = 'New Product Available';
    const options = {
      body: text,
      vibrate: [200, 100, 200],
      tag: 'new-product',
      actions: [
        {
          action: 'Detail',
          title: 'View',
          icon: 'https://via.placeholder.com/128/ff0000',
        },
      ],
    };

    navigator.serviceWorker.ready.then(serviceWorker => {
      serviceWorker.showNotification(title, options);
    });
  }

  return (
    <div>
      <h1>hi</h1>
      <button
        type="button"
        onClick={() => {
          askNotificationPermission();
        }}
      >
        permission
      </button>

      <button
        type="button"
        onClick={() => {
          subscribeUserToPush();
        }}
      >
        subscribe
      </button>

      <button
        type="button"
        onClick={() => {
          sendNotification();
        }}
      >
        send
      </button>

      <div>
        <a href="https://www.flaticon.com/free-icons/web-coding" title="web coding icons">
          Web coding icons created by Good Ware - Flaticon
        </a>
      </div>
    </div>
  );
};
