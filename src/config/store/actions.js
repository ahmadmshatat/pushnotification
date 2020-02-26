import {
  FETCH_NOTIFICATIONS_FROM_LOCAL,
  STORE_NOTIFICATION_LOCALLY,
} from './types';
import {AsyncStorage} from 'react-native';
import SalawatData from '../../data/Salawat.json';

const handleNotify = (notify, name, message) => {
  const month = notify.month;
  const day = notify.day;
  const hours = notify[name].split(':')[0];
  const minutes = notify[name].split(':')[1];
  const date = new Date(Date.now());
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setMonth(month);
  date.setDate(day);
  date.setFullYear(date.getFullYear());
  return {
    date,
    message,
  };
};
export const fetchNotifications = () => async dispatch => {
  const notifications = await AsyncStorage.getItem('salatReminder');
  const parsedNotifications = JSON.parse(notifications);
  const processedNotifications = parsedNotifications.map(notify => {
    const fajer = handleNotify(notify, 'fajer', 'حان الان موعد صلاة الفجر');
    const sunrise = handleNotify(
      notify,
      'sunrise',
      'حان الان موعد صلاة الشروق',
    );
    const dhuhur = handleNotify(notify, 'dhuhur', 'حان الان موعد صلاة الظهر');
    const asr = handleNotify(notify, 'asr', 'حان الان موعد صلاة العصر');
    const maghreb = handleNotify(
      notify,
      'maghreb',
      'حان الان موعد صلاة المغرب',
    );
    const Ishaa = handleNotify(notify, 'Ishaa', 'حان الان موعد صلاة العشاء');
    return {
      fajer,
      sunrise,
      dhuhur,
      asr,
      maghreb,
      Ishaa,
    };
  });
  await AsyncStorage.setItem(
    'processedNotifications',
    JSON.stringify(processedNotifications),
  );

  dispatch({
    type: FETCH_NOTIFICATIONS_FROM_LOCAL,
    payload: {
      notifications: processedNotifications,
    },
  });
};
export const storeNotificationsLocally = () => async dispatch => {
  try {
    await AsyncStorage.setItem('salatReminder', JSON.stringify(SalawatData));
    dispatch({
      type: STORE_NOTIFICATION_LOCALLY,
    });
  } catch (error) {
    console.log('error', error.message);
  }
};
