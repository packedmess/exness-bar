import PropTypes from 'prop-types';
import {useEffect} from 'react';

import {connectMobX} from '@/mobx';
import {roofBarApi} from '@/utils/api';

function PushNotificationsProvider({children, store}) {
  const initNotifications = async () => {
    try {
      // Show notifications only for logged in users
      if (store.authStore.isLoggedIn) {
        return;
      }

      // Check if Push notification and service workers are supported by your browser
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('Your browser does not support push notifications.');
        return;
      }

      // Ask user consent to receive push notifications and returns the response of the user, one of granted, default, denied
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        return;
      }

      // Register service worker
      await navigator.serviceWorker.register('./push-service-worker.js');

      // Wait for service worker installation to be ready
      const serviceWorker = await navigator.serviceWorker.ready;

      // Try to get push subscription from service worker
      let pushSubscription = await serviceWorker.pushManager.getSubscription();

      // If current device is not subscribed then subscribe it
      if (!pushSubscription) {
        pushSubscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_PUSH_SERVER_PUBLIC_KEY,
        });

        await roofBarApi.subscibeToPushNotifications(pushSubscription);
      }
    } catch (err) {
      console.error('Error trying to set up push notifications. Reason:', err);
    }
  };

  useEffect(() => {
    initNotifications();
  }, []);

  return children;
}

PushNotificationsProvider.defaultProps = {
  className: '',
};

PushNotificationsProvider.propTypes = {
  className: PropTypes.string,
  store: PropTypes.object,
};

export default connectMobX(PushNotificationsProvider);
