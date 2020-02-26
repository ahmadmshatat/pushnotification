import {AppState, PushNotificationIOS} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messages from '../assets/Salawat';
import moment from 'moment';

const _handleAppStateChange = nextAppState => {
  console.log('nextAppState', nextAppState);
  if (nextAppState === 'active') {
    _registerLocalNotification();
  }
};

const todayMessages = () => {
  const todayDate = moment(new Date()).format('DD/MM');

  const currentMonth = todayDate.split('/')[1];
  const currentDay = todayDate.split('/')[0];
  const messagesList = messages.filter(
    msg => +msg.month === +currentMonth && +msg.day === +currentDay,
  );
  return messagesList;
};

const _registerLocalNotification = () => {
  PushNotification.setApplicationIconBadgeNumber(0);
  PushNotification.cancelAllLocalNotifications();

  const todaySalawat = todayMessages()[0];

  const fajerTime = new Date(Date.now());
  fajerTime.setHours(todaySalawat.fajer.split(':')[0]);
  fajerTime.setMinutes(todaySalawat.fajer.split(':')[1]);

  const sunriseTime = new Date(Date.now());
  sunriseTime.setHours(todaySalawat.sunrise.split(':')[0]);
  sunriseTime.setMinutes(todaySalawat.sunrise.split(':')[1]);

  const dhuhurTime = new Date(Date.now());
  dhuhurTime.setHours(todaySalawat.dhuhur.split(':')[0]);
  dhuhurTime.setMinutes(todaySalawat.dhuhur.split(':')[1]);

  const asrTime = new Date(Date.now());
  asrTime.setHours(todaySalawat.asr.split(':')[0]);
  asrTime.setMinutes(todaySalawat.asr.split(':')[1]);

  const maghrebTime = new Date(Date.now());
  maghrebTime.setHours(todaySalawat.maghreb.split(':')[0]);
  maghrebTime.setMinutes(todaySalawat.maghreb.split(':')[1]);

  const IshaaTime = new Date(Date.now());
  IshaaTime.setHours(todaySalawat.Ishaa.split(':')[0]);
  IshaaTime.setMinutes(todaySalawat.Ishaa.split(':')[1]);

  new Date(Date.now()).getTime() <= fajerTime.getTime() &&
    PushNotification.localNotificationSchedule({
      vibrate: true,
      vibration: 300,
      priority: 'hight',
      visibility: 'public',
      importance: 'hight',
      foreground: true,

      message: 'حان الان موعد صلاة الفجر', // (required)
      playSound: true,
      soundName: 'default',
      autoCancel: true,
      ticker: 'My Notification Ticker',
      number: 1,
      actions: '["OK"]',
      repeatType: 'day',
      date: fajerTime,
    });
  if (new Date(Date.now()).getTime() <= sunriseTime.getTime()) {
    PushNotification.localNotificationSchedule({
      vibrate: true,
      vibration: 300,
      priority: 'hight',
      visibility: 'public',
      importance: 'hight',
      foreground: true,

      message: 'حان الان موعد صلاة الشروق', // (required)
      playSound: true,
      soundName: 'default',
      autoCancel: true,
      ticker: 'My Notification Ticker',
      number: 1,
      actions: '["OK"]',
      repeatType: 'day',
      date: sunriseTime,
    });
    console.log('sunriseTime pushhed');
  }
  new Date(Date.now()).getTime() <= dhuhurTime.getTime() &&
    PushNotification.localNotificationSchedule({
      vibrate: true,
      vibration: 300,
      priority: 'hight',
      visibility: 'public',
      importance: 'hight',
      foreground: true,

      message: 'حان الان موعد صلاة الظهر', // (required)
      playSound: true,
      soundName: 'default',
      autoCancel: true,
      ticker: 'My Notification Ticker',
      number: 1,
      actions: '["OK"]',
      repeatType: 'day',
      date: dhuhurTime,
    });

  new Date(Date.now()).getTime() <= asrTime.getTime() &&
    PushNotification.localNotificationSchedule({
      vibrate: true,
      vibration: 300,
      priority: 'hight',
      visibility: 'public',
      importance: 'hight',
      foreground: true,

      message: 'حان الان موعد صلاة العصر', // (required)
      playSound: true,
      soundName: 'default',
      autoCancel: true,
      ticker: 'My Notification Ticker',
      number: 1,
      actions: '["OK"]',
      repeatType: 'day',
      date: asrTime,
    });
  new Date(Date.now()).getTime() <= maghrebTime.getTime() &&
    PushNotification.localNotificationSchedule({
      vibrate: true,
      vibration: 300,
      priority: 'hight',
      visibility: 'public',
      importance: 'hight',
      foreground: true,

      message: 'حان الان موعد صلاة المغرب', // (required)
      playSound: true,
      soundName: 'default',
      autoCancel: true,
      number: 1,
      actions: '["OK"]',
      ticker: 'push notify',
      repeatType: 'day',
      date: maghrebTime,
    });
  new Date(Date.now()).getTime() <= IshaaTime.getTime() &&
    PushNotification.localNotificationSchedule({
      vibrate: true,
      vibration: 300,
      priority: 'hight',
      visibility: 'public',
      importance: 'hight',
      foreground: true,

      message: 'حان الان موعد صلاة العشاء', // (required)
      playSound: true,
      soundName: 'default',
      autoCancel: true,
      number: 1,
      actions: '["OK"]',
      ticker: 'push notify',
      repeatType: 'day',
      date: IshaaTime,
    });
};

export default {
  register: async () => {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('notification', notification);
        console.log(
          'PushNotificationIOS.FetchResult.NoData',
          PushNotificationIOS.FetchResult.NoData,
        );
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
