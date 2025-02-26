
import { useEffect, useRef, useState } from "react";

interface ParkingSpace {
  id: string;
  x: number;
  y: number;
  status: "available" | "occupied" | "reserved";
}

interface ParkingMapProps {
  showGrid: boolean;
  level: number;
  parkingImage: string | null;
  onClearMarkers?: () => void;
}

export function ParkingMap({ showGrid, level, parkingImage, onClearMarkers }: ParkingMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spaces, setSpaces] = useState<ParkingSpace[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image if exists
    if (parkingImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawGrid();
        drawSpaces();
      };
      img.src = parkingImage;
    } else {
      drawGrid();
      drawSpaces();
    }

    function drawGrid() {
      if (!showGrid) return;
      
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    function drawSpaces() {
      spaces.forEach(space => {
        ctx.beginPath();
        ctx.arc(space.x, space.y, 10, 0, Math.PI * 2);
        
        switch (space.status) {
          case "available":
            ctx.fillStyle = "#22c55e";
            break;
          case "occupied":
            ctx.fillStyle = "#ef4444";
            break;
          case "reserved":
            ctx.fillStyle = "#3b82f6";
            break;
        }
        
        ctx.fill();
      });
    }
  }, [showGrid, parkingImage, spaces, level]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setSpaces([
      ...spaces,
      {
        id: `space-${Date.now()}`,
        x,
        y,
        status: "available"
      }
    ]);
  };

  const clearMarkers = () => {
    setSpaces([]);
    if (onClearMarkers) {
      onClearMarkers();
    }
  };

  useEffect(() => {
    if (onClearMarkers) {
      onClearMarkers = clearMarkers;
    }
  }, [onClearMarkers]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onClick={handleCanvasClick}
      className="border border-gray-200 rounded-lg w-full h-full cursor-crosshair"
    />
  );
}
