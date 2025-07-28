import { useState, useRef, useCallback, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  initialPosition?: Position;
}

interface UseDraggableReturn {
  position: Position;
  isDragging: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  elementRef: React.RefObject<HTMLDivElement>;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleTouchStart: (e: React.TouchEvent) => void; 
}

export function useDraggable(options: UseDraggableOptions = {}): UseDraggableReturn {
  const { initialPosition = { x: 50, y: 50 } } = options;
  
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!elementRef.current) return;

    setIsDragging(true);
    const rect = elementRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!elementRef.current) return;

    e.preventDefault(); 
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = elementRef.current.getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || !containerRef.current || !elementRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = elementRef.current.getBoundingClientRect();

    let newX = clientX - containerRect.left - dragOffset.x;
    let newY = clientY - containerRect.top - dragOffset.y;

    const maxX = containerRect.width - elementRect.width;
    const maxY = containerRect.height - elementRect.height;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({ x: newX, y: newY });
  }, [isDragging, dragOffset]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  }, [handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault(); 
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }, [handleMove]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
    
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  return {
    position,
    isDragging,
    containerRef,
    elementRef,
    handleMouseDown,
    handleTouchStart, 
  };
}
