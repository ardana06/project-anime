import React, { useState } from "react";

const AnimeCard = ({ anime, onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick();
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <div
      className={`anime-card ${clicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      <img src={anime.images?.jpg?.image_url} alt={anime.title} />
      <h3>{anime.title}</h3>
    </div>
  );
};

export default AnimeCard;