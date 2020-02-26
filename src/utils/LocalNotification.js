import {AppState, PushNotificationIOS} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messages from '../assets/Salawat';
import moment from 'moment';

const _handleAppStateChange = nextAppState => {
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
  const fajerMsg = 'Fajer Salat Notify';

  const sunriseTime = new Date(Date.now());
  sunriseTime.setHours(todaySalawat.sunrise.split(':')[0]);
  sunriseTime.setMinutes(todaySalawat.sunrise.split(':')[1]);
  const sunriseMsg = 'Sunrise Salat Notify';

  const dhuhurTime = new Date(Date.now());
  dhuhurTime.setHours(todaySalawat.dhuhur.split(':')[0]);
  dhuhurTime.setMinutes(todaySalawat.dhuhur.split(':')[1]);
  const dhuhurMsg = 'dhuhur Salat Notify';

  const asrTime = new Date(Date.now());
  asrTime.setHours(todaySalawat.asr.split(':')[0]);
  asrTime.setMinutes(todaySalawat.asr.split(':')[1]);
  const asrMsg = 'asr Salat Notify';

  const maghrebTime = new Date(Date.now());
  maghrebTime.setHours(todaySalawat.maghreb.split(':')[0]);
  maghrebTime.setMinutes(todaySalawat.maghreb.split(':')[1]);
  const maghrebMsg = 'maghreb Salat Notify';

  const IshaaTime = new Date(Date.now());
  IshaaTime.setHours(todaySalawat.Ishaa.split(':')[0]);
  IshaaTime.setMinutes(todaySalawat.Ishaa.split(':')[1]);
  const IshaaMsg = 'Ishaa Salat Notify';

  const data = [
    {
      date: fajerTime,
      msg: fajerMsg,
    },
    {
      date: sunriseTime,
      msg: sunriseMsg,
    },
    {
      date: dhuhurTime,
      msg: dhuhurMsg,
    },
    {
      date: asrTime,
      msg: asrMsg,
    },
    {
      date: maghrebTime,
      msg: maghrebMsg,
    },
    {
      date: IshaaTime,
      msg: IshaaMsg,
    },
  ];
  const addNotification = ({date, message}) => {
    const notification = {
      vibrate: true,
      vibration: 300,
      priority: 'hight',
      visibility: 'public',
      importance: 'hight',
      foreground: true,
      message, // (required)
      playSound: true,
      soundName: 'default',
      autoCancel: true,
      ticker: 'My Notification Ticker',
      number: 1,
      actions: '["VIEW"]',
      repeatType: 'day',
      date,
    };
    if (date.getTime() > new Date(Date.now())) {
      PushNotification.localNotificationSchedule(notification);
    }
  };

  data.forEach(({date, msg}) => {
    addNotification({
      date,
      message: msg,
    });
  });
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
