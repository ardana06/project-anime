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