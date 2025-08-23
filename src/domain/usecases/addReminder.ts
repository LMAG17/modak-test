import { addProductReminder } from '../../presentation/nativeModules/addProductReminder';

export const addReminder = async (title: string, date: Date) => {
  await addProductReminder(title, date);
};
