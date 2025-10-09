
import { useEffect, useState } from 'react';

interface BettingNotificationProps {
  message: string;
  show: boolean;
}

export default function BettingNotification({ message, show }: BettingNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      // Hide after 1000ms
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => {
        clearTimeout(hideTimer);
      };
    }
  }, [show, message]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed left-1/2 top-1/2 z-50 betting-notification-container"
      style={{
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    >
      <div className="notification-content">
        <span className="notification-text">{message}</span>
      </div>
      
      <style>
        {`
          @keyframes glowPulse {
            0% {
              opacity: 0;
              transform: scale(0.8);
              filter: blur(10px);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
              filter: blur(0px);
            }
            100% {
              opacity: 0;
              transform: scale(0.8);
              filter: blur(10px);
            }
          }

          .betting-notification-container {
            animation: glowPulse 1s ease-in-out;
          }

          .notification-content {
            background: linear-gradient(180deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%);
            border: 3px solid #8B4513;
            border-radius: 20px;
            padding: 20px 60px;
            box-shadow: 
              0 0 60px rgba(255, 215, 0, 0.9),
              0 0 100px rgba(255, 165, 0, 0.7),
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
            opacity: 0.8;
            filter: blur(15px);
          }

          .notification-text {
            font-size: 48px;
            font-weight: bold;
            font-style: italic;
            color: #FFFFFF;
            text-shadow: 
              3px 3px 6px rgba(0, 0, 0, 0.8),
              -1px -1px 2px rgba(255, 255, 255, 0.3),
              0 0 30px rgba(255, 215, 0, 0.8),
              0 0 50px rgba(255, 165, 0, 0.6);
            white-space: nowrap;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFE4B5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          @media (max-width: 768px) {
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
