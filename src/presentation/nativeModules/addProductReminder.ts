import { NativeModules, Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

const { PurchaseReminderModule } = NativeModules;

export const addProductReminder = async (title: string, date: Date) => {
  try {
    let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CALENDARS
        : PERMISSIONS.ANDROID.WRITE_CALENDAR;
    return new Promise<boolean>((resolve, reject) => {
      request(permission)
        .then(async status => {
          if (status === 'granted') {
            const timestamp = date.getTime() / 1000;
            const result = await PurchaseReminderModule.addPurchaseReminder(
              title,
              timestamp,
            );
            resolve(result);
          } else {
            reject(new Error('Permission denied'));
          }
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  } catch (err) {
    console.error(err);
  }
};
