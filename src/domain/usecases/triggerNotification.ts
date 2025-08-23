import { displayNotification } from '../../presentation/notifications/displayNotification';

type NotificationData = {
  title: string;
  body: string;
};

export const triggerNotification = async ({
  title,
  body,
}: NotificationData) => {
  await displayNotification({ title, body });
};
