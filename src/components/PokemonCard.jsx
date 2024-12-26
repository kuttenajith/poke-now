import React from "react";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ name = "Unknown", url }) => {
  const navigate = useNavigate();

  const handleDetails = () => {
    if (url) {
      const id = url.split("/").filter(Boolean).pop();
      navigate(`/pokemon/${id}`);
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-700 rounded shadow p-4 flex
       flex-col items-center cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-500 hover:shadow-lg transition"
      onClick={handleDetails}
    >
      <h3 className="text-lg font-bold capitalize">{name}</h3>
      {url ? (
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url
            .split("/")
            .filter(Boolean)
            .pop()}.png`}
          alt={name}
          className="w-24 h-24"
        />
      ) : (
        <p className="text-gray-500">Image unavailable</p>
      )}
    </div>
  );
};

export default PokemonCard;
