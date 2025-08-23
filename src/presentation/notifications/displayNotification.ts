import notifee, { AndroidImportance } from '@notifee/react-native';

type NotificationData = {
  title: string;
  body: string;
};

export const displayNotification = async ({
  title,
  body,
}: NotificationData) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
  
  await notifee.requestPermission();

  try {
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
      },
      ios: {
        sound: 'default',
      },
    });
  } catch (err) {
    console.error('Error displaying notification:', err);
  }
};
