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
  metacritic: number;
}
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [isLoading, setLoading] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController(); // Moved inside useEffect
    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return; // This check is crucial to avoid setting state after unmount
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort(); // Cleanup function to abort the request on unmount
  }, []); // Empty dependency array means this runs once on mount

  return { games, error, isLoading };
};

export default useGames;
