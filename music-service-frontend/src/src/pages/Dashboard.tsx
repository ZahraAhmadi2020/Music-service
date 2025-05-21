import React, { useEffect, useState } from 'react';
import TrackCard from '../components/TrackCard';
import './Dashboard.css';

// Данные для тестирования UI
const mockTracks = [
  { id: 1, title: "Песня 1", artist: "Исполнитель 1", genre: "Поп", durationSeconds: 180, image: "https://via.placeholder.com/150" },
  { id: 2, title: "Песня 2", artist: "Исполнитель 2", genre: "Рок", durationSeconds: 240, image: "https://via.placeholder.com/150" },
  { id: 3, title: "Песня 3", artist: "Исполнитель 3", genre: "Поп", durationSeconds: 200, image: "https://via.placeholder.com/150" },
  { id: 4, title: "Песня 4", artist: "Исполнитель 4", genre: "Джаз", durationSeconds: 300, image: "https://via.placeholder.com/150" },
  { id: 5, title: "Песня 5", artist: "Исполнитель 5", genre: "Поп", durationSeconds: 220, image: "https://via.placeholder.com/150" },
  { id: 6, title: "Песня 6", artist: "Исполнитель 6", genre: "Рок", durationSeconds: 260, image: "https://via.placeholder.com/150" },
];

interface Track {
  id: number;
  title: string;
  artist: string;
  genre?: string;
  durationSeconds?: number;
  image?: string;
}

const Dashboard: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [loading, setLoading] = useState(true);

  // Подключение к бэкенду (пока закомментирован для тест UI)
  // useEffect(() => {
  //   const fetchTracks = async () => {
  //     try {
  //       const response = await fetch('/api/tracks');
  //       if (!response.ok) {
  //         throw new Error('Ошибка сети');
  //       }
  //       const data = await response.json();
  //       setTracks(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Ошибка при загрузке треков:', error);
  //       setTracks(mockTracks);
  //       setLoading(false);
  //     }
  //   };
  //   fetchTracks();
  // }, []);

  // برای تست UI، داده‌های موقت لود می‌شن
  useEffect(() => {
    setTracks(mockTracks);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center text-white">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen   text-white p-6 font-noto">
      {/* Популярные треки (کارت‌های دایره‌ای) */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">Популярные треки</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {tracks.slice(0, 8).map((track, index) => (
            <div key={track.id} className={`circle-card border-animation-${index + 1}`}>
              <TrackCard track={track} isCircle />
            </div>
          ))}
        </div>
      </div>

      {/* Новые треки */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Новые треки</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.slice(0, 3).map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>

      {/* Популярные жанры */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Популярные жанры</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Поп', 'Рок', 'Джаз', 'Классика'].map((genre) => (
            <div
              key={genre}
              className="relative p-4 bg-gray-800 rounded-lg shadow-lg neon-effect hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold text-center">{genre}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Все треки */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Все треки</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;