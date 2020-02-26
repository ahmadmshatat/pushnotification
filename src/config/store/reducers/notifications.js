import {
  FETCH_NOTIFICATIONS_FROM_LOCAL,
  STORE_NOTIFICATION_LOCALLY,
} from '../types';

const INITIAL_STATE = {
  notifications: [],
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case STORE_NOTIFICATION_LOCALLY:
      return {
        notifications: [],
      };

    case FETCH_NOTIFICATIONS_FROM_LOCAL:
      return {
        notifications: payload.notifications,
      };

    default:
      return state;
  }
};
