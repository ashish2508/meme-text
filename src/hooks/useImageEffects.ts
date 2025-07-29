import { useState } from 'react';

export const useImageEffects = () => {
  const [blur, setBlur] = useState(false);
  const [border, setBorder] = useState(false);
  const [sharpen, setSharpen] = useState(false);
  const [grayscale, setGrayscale] = useState(false);

  return {
    blur,
    border,
    sharpen,
    grayscale,
    setBlur,
    setBorder,
    setSharpen,
    setGrayscale,
  };
};
