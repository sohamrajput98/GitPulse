import React from 'react';
import ReactConfetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';

const ConfettiEffect = () => {
  const { width, height } = useWindowSize();

  return (
    <ReactConfetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      tweenDuration={8000}
      gravity={0.1}
    />
  );
};

export default ConfettiEffect;
