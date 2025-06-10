import React from "react";

const Modal = ({ anime, onClose }) => {
  return (
    <div className="modal-overlay" onClick={(e) => e.target.className === "modal-overlay" && onClose()}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{anime.title}</h2>
        <img src={anime.images?.jpg?.image_url} alt={anime.title} />
        <p>
          <strong>Episodes:</strong> {anime.episodes || "?"}
        </p>
        <p>
          <strong>Type:</strong> {anime.type}
        </p>
        <p>
          <strong>Score:</strong> {anime.score || "N/A"}
        </p>
        <p>
          <strong>About:</strong> {anime.synopsis || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default Modal;
