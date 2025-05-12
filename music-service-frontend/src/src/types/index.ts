 
export interface Track {
  id: number;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  rating?: number;
  releaseYear: number;
  durationSeconds: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  favoriteTracks: Track[];
}
 