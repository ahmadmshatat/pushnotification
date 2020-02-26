import {AppState, PushNotificationIOS, AsyncStorage} from 'react-native';
import PushNotification from 'react-native-push-notification';

const _handleAppStateChange = nextAppState => {
  if (nextAppState === 'active') {
    _registerLocalNotification();
  }
};

const addNotification = async () => {
  const notification = {
    vibrate: true,
    vibration: 300,
    priority: 'hight',
    visibility: 'public',
    importance: 'hight',
    foreground: true,
    playSound: true,
    soundName: 'default',
    autoCancel: true,
    ticker: 'My Notification Ticker',
    number: 1,
    actions: '["VIEW"]',
  };
  const notifications = await AsyncStorage.getItem('processedNotifications');
  JSON.parse(notifications).forEach(
    ({fajer, asr, sunrise, dhuhur, maghreb, Ishaa}) => {
      const arrayOfSalawat = [fajer, asr, sunrise, dhuhur, maghreb, Ishaa];
      console.log('arrayOfSalawat', arrayOfSalawat);
      arrayOfSalawat.forEach(salat => {
        console.log('salat', salat.date);
        if (
          salat &&
          salat.date &&
          new Date(salat.date).getTime() &&
          new Date(salat.date).getTime() > new Date(Date.now())
        ) {
          PushNotification.localNotificationSchedule({
            ...notification,
            date: new Date(salat.date),
            message: salat.message,
          });
        }
      });
    },
  );
};

const _registerLocalNotification = () => {
  PushNotification.setApplicationIconBadgeNumber(0);
  PushNotification.cancelAllLocalNotifications();
  addNotification();
};

export default {
  register: async () => {
    PushNotification.configure({
      onNotification: function(notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      requestPermissions: true,
    });

    _registerLocalNotification();

    AppState.addEventListener('change', _handleAppStateChange);
  },
  unregister: () => {
    AppState.removeEventListener('change', _handleAppStateChange);
  },
};
