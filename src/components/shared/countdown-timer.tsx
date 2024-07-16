"use client"

import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState('');

  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to midnight

    const timeLeft = midnight - now;

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>

      
      <div className="flex justify-between">
        <h4 className="text-gray-500 font-medium">Next Rewards in:</h4>
        <p className="font-bold text-black text-lg md:text-xl">{countdown}</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
