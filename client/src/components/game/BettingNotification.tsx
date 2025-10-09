
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
      
      // Hide after exactly 1000ms to match animation
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => {
        clearTimeout(hideTimer);
      };
    } else {
      setIsVisible(false);
    }
  }, [show, message]);

  if (!isVisible) return null;

  return (
    <div
      className="notification-container"
      style={{
        pointerEvents: 'none',
      }}
    >
      <div className="notification-content">
        <span className="notification-text">{message}</span>
      </div>
      
      <style>
        {`
          @keyframes fadeInOut {
            0% {
              opacity: 0;
              transform: scale(0.9) translateY(-10px);
            }
            20% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
            80% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
            100% {
              opacity: 0;
              transform: scale(0.9) translateY(-10px);
            }
          }

          .notification-container {
            animation: fadeInOut 1s ease-in-out;
          }

          .notification-content {
            background: linear-gradient(135deg, rgba(88, 28, 135, 0.95), rgba(59, 130, 246, 0.95));
            border: 2px solid rgba(147, 51, 234, 0.8);
            border-radius: 12px;
            padding: 12px 32px;
            box-shadow: 
              0 0 30px rgba(147, 51, 234, 0.6),
              0 0 50px rgba(59, 130, 246, 0.4),
              inset 0 2px 8px rgba(147, 51, 234, 0.4),
              0 4px 15px rgba(0, 0, 0, 0.4);
            position: relative;
            backdrop-filter: blur(10px);
          }

          .notification-content::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5));
            border-radius: 12px;
            z-index: -1;
            opacity: 0.6;
            filter: blur(8px);
          }

          .notification-text {
            font-size: 24px;
            font-weight: bold;
            color: #FFFFFF;
            text-shadow: 
              0 2px 4px rgba(0, 0, 0, 0.8),
              0 0 20px rgba(147, 51, 234, 0.8),
              0 0 30px rgba(59, 130, 246, 0.6);
            white-space: nowrap;
            letter-spacing: 1px;
          }

          @media (max-width: 768px) {
            .notification-content {
              padding: 10px 24px;
            }
            
            .notification-text {
              font-size: 20px;
            }
          }
        `}
      </style>
    </div>
  );
}
