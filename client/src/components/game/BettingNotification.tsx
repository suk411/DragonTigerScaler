
import { useEffect, useState } from 'react';

interface BettingNotificationProps {
  message: string;
  show: boolean;
}

export default function BettingNotification({ message, show }: BettingNotificationProps) {
  const [animationState, setAnimationState] = useState<'enter' | 'pause' | 'exit' | 'hidden'>('hidden');

  useEffect(() => {
    if (show) {
      setAnimationState('enter');
      
      // Pause in center after 500ms
      const pauseTimer = setTimeout(() => {
        setAnimationState('pause');
      }, 500);

      // Start exit animation after 1500ms total (500ms enter + 1000ms pause)
      const exitTimer = setTimeout(() => {
        setAnimationState('exit');
      }, 1500);

      // Hide completely after 2000ms total
      const hideTimer = setTimeout(() => {
        setAnimationState('hidden');
      }, 2000);

      return () => {
        clearTimeout(pauseTimer);
        clearTimeout(exitTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setAnimationState('hidden');
    }
  }, [show]);

  if (animationState === 'hidden') return null;

  const getTransform = () => {
    switch (animationState) {
      case 'enter':
        return 'translateX(-150%)';
      case 'pause':
        return 'translateX(-50%)';
      case 'exit':
        return 'translateX(100%)';
      default:
        return 'translateX(-150%)';
    }
  };

  return (
    <div
      className="fixed left-1/2 z-50"
      style={{
        top: '50%',
        transform: `translate(-50%, -50%)`,
        pointerEvents: 'none',
      }}
    >
      <div
        className="betting-notification"
        style={{
          transform: getTransform(),
          transition: animationState === 'enter' ? 'transform 0.5s ease-out' : 
                     animationState === 'exit' ? 'transform 0.5s ease-in' : 'none',
        }}
      >
        <div className="notification-content">
          <span className="notification-text">{message}</span>
        </div>
      </div>
      
      <style>
        {`
          .betting-notification {
            position: relative;
            width: max-content;
            min-width: 400px;
          }

          .notification-content {
            background: linear-gradient(180deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%);
            border: 3px solid #8B4513;
            border-radius: 20px;
            padding: 20px 60px;
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.5),
              inset 0 2px 10px rgba(255, 255, 255, 0.3),
              inset 0 -2px 10px rgba(0, 0, 0, 0.3);
            position: relative;
          }

          .notification-content::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            background: linear-gradient(45deg, #FFD700, #FFA500, #FF8C00, #FFD700);
            border-radius: 20px;
            z-index: -1;
            opacity: 0.5;
            filter: blur(8px);
          }

          .notification-text {
            font-size: 48px;
            font-weight: bold;
            font-style: italic;
            color: #FFFFFF;
            text-shadow: 
              3px 3px 6px rgba(0, 0, 0, 0.8),
              -1px -1px 2px rgba(255, 255, 255, 0.3),
              0 0 20px rgba(255, 215, 0, 0.5);
            white-space: nowrap;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFE4B5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          @media (max-width: 768px) {
            .betting-notification {
              min-width: 300px;
            }
            
            .notification-content {
              padding: 15px 40px;
            }
            
            .notification-text {
              font-size: 36px;
            }
          }
        `}
      </style>
    </div>
  );
}
