import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-green-400 to-orange-500 opacity-30 blur-md animate-pulse"></div>

        {/* Outer circle */}
        <div className="w-24 h-24 border-8 border-t-transparent border-blue-500 rounded-full animate-spin"></div>

        {/* Middle circle */}
        <div className="absolute w-16 h-16 border-8 border-t-transparent border-green-400 rounded-full animate-[spin_1.5s_linear_infinite]"></div>

        {/* Inner circle */}
        <div className="absolute w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full animate-[spin_2s_linear_infinite]"></div>

        {/* Center glowing dot */}
        <div className="absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full animate-pulse"></div>
      </div>

      {/* Loading text */}
      <div className="mt-6 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">
        Loading...
      </div>
    </div>
  );
};

export default Loading;
