import React from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  genre?: string;
  durationSeconds?: number;
  image?: string;
}

interface TrackCardProps {
  track: Track;
  isCircle?: boolean; // برای کارت‌های دایره‌ای در ردیف اول
}

const TrackCard: React.FC<TrackCardProps> = ({ track, isCircle = false }) => {
  return (
    <div
      className={`relative bg-gray-800 p-4 rounded-lg shadow-lg ${
        isCircle ? 'rounded-full w-40 h-40 flex flex-col items-center justify-center' : 'neon-effect'
      } hover:scale-105 transition-transform duration-300 font-noto`}
    >
      <img
        src={track.image}
        alt={track.title}
        className={`mb-2 ${isCircle ? 'w-20 h-20 rounded-full object-cover' : 'w-full h-32 object-cover rounded-lg'}`}
      />
      <h3 className={`text-${isCircle ? 'sm' : 'xl'} font-semibold text-white text-center`}>{track.title}</h3>
      <p className={`text-${isCircle ? 'xs' : 'base'} text-gray-300 text-center`}>{track.artist}</p>
      {!isCircle && (
        <>
          <p className="text-sm text-gray-400">{track.genre || 'Неизвестно'}</p>
          <p className="text-sm text-gray-400">
            {track.durationSeconds
              ? `${Math.floor(track.durationSeconds / 60)}:${(track.durationSeconds % 60)
                  .toString()
                  .padStart(2, '0')}`
              : 'Неизвестно'}
          </p>
        </>
      )}
    </div>
  );
};

export default TrackCard;