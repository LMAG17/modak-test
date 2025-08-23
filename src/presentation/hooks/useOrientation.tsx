import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const handleOrientationChange = ({
      window,
    }: {
      window: { width: number; height: number };
    }) => {
      setOrientation(window.height > window.width ? 'portrait' : 'landscape');
    };

    const dimensionsListener = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );
    return () => {
      dimensionsListener.remove();
    };
  }, []);

  return orientation;
};
