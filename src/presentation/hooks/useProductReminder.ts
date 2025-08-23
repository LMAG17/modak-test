import { useCallback } from 'react';
import { triggerNotification } from '../../domain/usecases/triggerNotification';
import { addProductReminder } from '../nativeModules/addProductReminder';

export const useProductReminder = (productTitle?: string) => {
  return useCallback(async () => {
    if (!productTitle) return;

    try {
      await addProductReminder(
        `Recordatorio para comprar ${productTitle}`,
        new Date(Date.now() + 60 * 60 * 1000),
      );
      triggerNotification({
        title: `Recordatorio para comprar ${productTitle}`,
        body: 'Se ha creado un evento en tu calendario',
      });
    } catch (error) {
      triggerNotification({
        title: `Error al crear recordatorio`,
        body: 'No se pudo crear evento en tu calendario',
      });
    }
  }, [productTitle]);
};
