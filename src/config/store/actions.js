import {
  FETCH_NOTIFICATIONS_FROM_LOCAL,
  STORE_NOTIFICATION_LOCALLY,
} from './types';
import {AsyncStorage} from 'react-native';
import SalawatData from '../../data/Salawat.json';
import moment from 'moment';
import constant from '../constants/constants';

const handleNotify = (notify, name, message, timeType = 'AM') => {
  const month = notify.month;
  const day = notify.day;
  const time = `${notify[name]} ${timeType}`;
  var dt = moment(time, ['h:mm A']).format('HH:mm');
  const hours = dt.split(':')[0];
  const minutes = dt.split(':')[1];
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
    const fajer = handleNotify(notify, 'fajer', constant.fajerMsg, 'AM');
    const sunrise = handleNotify(notify, 'sunrise', constant.sunriseMsg, 'AM');
    const dhuhur = handleNotify(notify, 'dhuhur', constant.dhuhurMsg, 'PM');
    const asr = handleNotify(notify, 'asr', constant.asrMsg, 'PM');
    const maghreb = handleNotify(notify, 'maghreb', constant.maghrebMsg, 'PM');
    const Ishaa = handleNotify(notify, 'Ishaa', constant.ishaaMsg, 'PM');
    console.log('====================================');
    console.log({
      fajer,
      sunrise,
      dhuhur,
      asr,
      maghreb,
      Ishaa,
    });
    console.log('====================================');
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
