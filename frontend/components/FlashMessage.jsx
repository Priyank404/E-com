import { useEffect, useState } from 'react';

const FlashMessage = ({ message, delay = 500 }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let showTimer, hideTimer;

    if (message) {
      setShouldRender(true);

      showTimer = setTimeout(() => {
        setVisible(true);

        // Hide after 3s
        hideTimer = setTimeout(() => {
          setVisible(false);

          // Wait for exit animation to finish before removing from DOM
          setTimeout(() => setShouldRender(false), 400);
        }, 3000);
      }, delay);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [message, delay]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 px-6 py-3 rounded shadow-lg z-[9999] text-white text-center transition-all duration-400 ease-out
        ${visible ? 'bg-green-500 animate-slide-in-right' : 'animate-slide-out-right'}
      `}
      style={{
        minWidth: '240px',
        maxWidth: '90vw',
      }}
    >
      {message}
    </div>
  );
};

export default FlashMessage;
