import { useEffect, useState } from "react";
import apiClient from "../components/services/api-client";
import { CanceledError } from "axios";
export interface Platforms {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platforms }[];
}
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController(); // Moved inside useEffect

    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return; // This check is crucial to avoid setting state after unmount
        setError(err.message);
      });

    return () => controller.abort(); // Cleanup function to abort the request on unmount
  }, []); // Empty dependency array means this runs once on mount

  return { games, error };
};

export default useGames;
