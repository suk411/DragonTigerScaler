import { ReactNode, useEffect, useState } from "react";

interface ResponsiveGameContainerProps {
  children: ReactNode;
  aspectRatio?: number; // default 16/9 for landscape
  baseWidth?: number; // reference width for scaling calculations
  baseHeight?: number; // reference height for scaling calculations
}

export default function ResponsiveGameContainer({
  children,
  aspectRatio = 16 / 9,
  baseWidth = 1600,
  baseHeight = 900,
}: ResponsiveGameContainerProps) {
  const [scale, setScale] = useState(1);
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const calculateScale = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate what dimensions we can fit in the viewport while maintaining aspect ratio
      let containerWidth = viewportWidth;
      let containerHeight = viewportWidth / aspectRatio;

      // If height is too tall, scale based on height instead
      if (containerHeight > viewportHeight) {
        containerHeight = viewportHeight;
        containerWidth = viewportHeight * aspectRatio;
      }

      // Calculate scale factor based on reference dimensions
      const scaleX = containerWidth / baseWidth;
      const scaleY = containerHeight / baseHeight;
      const finalScale = Math.min(scaleX, scaleY);

      setScale(finalScale);
      setContainerStyle({
        width: `${baseWidth}px`,
        height: `${baseHeight}px`,
        transform: `scale(${finalScale})`,
        transformOrigin: "top left",
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: `${-(baseWidth * finalScale) / 2}px`,
        marginTop: `${-(baseHeight * finalScale) / 2}px`,
      });
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    
    return () => window.removeEventListener("resize", calculateScale);
  }, [aspectRatio, baseWidth, baseHeight]);

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black flex items-center justify-center"
      style={{ 
        width: "100vw", 
        height: "100vh",
      }}
    >
      <div style={containerStyle}>
        {children}
      </div>
    </div>
  );
}
