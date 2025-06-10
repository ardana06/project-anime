import React, { useState } from "react";
import useFetchAnime from "./useFetchAnime";
import AnimeCard from "./AnimeCard";
import Modal from "./Modal";
import { useTheme } from "./ThemeContext";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const {
    data: animeList,
    loading,
    error,
    genres,
  } = useFetchAnime(query, genre, page);
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setQuery(e.target.elements.search.value.trim());
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setPage(1);
  };

  const handleRandom = async () => {
    try {
      const res = await fetch("https://api.jikan.moe/v4/random/anime");
      const json = await res.json();
      setSelectedAnime(json.data);
    } catch {
      alert("Failed to fetch random anime");
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => {
            setQuery("");
            setGenre("");
            setPage(1);
          }}
        >
          Anime
        </h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>
<form className="search-form" onSubmit={handleSearch}>
        <input
          name="search"
          type="text"
          placeholder="Search anime by title..."
        />
        <button type="submit">Search</button>
      </form>

      <section className="categories">
        <select value={genre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {Array.isArray(genres) && genres.length > 0 ? (
            genres.map((g) => (
              <option key={g.mal_id} value={g.mal_id}>
                {g.name}
              </option>
            ))
          ) : (
            <option disabled>Loading genres...</option>
          )}
        </select>
      </section>

      <button className="random-button" onClick={handleRandom}>
        Get Random Anime
      </button>

      <section className="anime-list">
        {loading && (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}
        {error && <p>Error loading anime.</p>}
        {!loading && !error && animeList.length === 0 && <p>No results.</p>}

        {animeList.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onClick={() => setSelectedAnime(anime)}
          />
        ))}
      </section>

      <section className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="page-number">{page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </section>

      {selectedAnime && (
        <Modal anime={selectedAnime} onClose={() => setSelectedAnime(null)} />
      )}
    </div>
  );
};

export default App;
