import { useState, useEffect } from "react";

const baseUrl = "https://api.jikan.moe/v4";

function useFetchAnime(query, genre, page) {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(`${baseUrl}/genres/anime`);
        const json = await res.json();
        setGenres(Array.isArray(json.data) ? json.data : []);
      } catch (e) {
        console.error("Failed to load genres", e);
        setGenres([]);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchAnime() {
      setLoading(true);
      setError(null);

      let url = `${baseUrl}/anime?page=${page}`;

      if (query) url = `${baseUrl}/anime?q=${encodeURIComponent(query)}&page=${page}`;
      if (genre) url += `&genres=${genre}`;

      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json.data || []);
      } catch (e) {
        setError(e);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, [query, genre, page]);

  return { data, genres, loading, error };
}

export default useFetchAnime;



