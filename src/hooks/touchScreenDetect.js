import { useState, useEffect } from 'react';

export default function useTouchScreenDetect() {
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;

    const isTouchScreen = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setIsTouchScreen(isTouchScreen);
  }, []);

  return { isTouchScreen };
}
