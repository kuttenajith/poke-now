import React, { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const paginatedData = favorites.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <div className="sticky top-0 z-20 bg-gray-100 dark:bg-gray-800 ">
        <button
          onClick={() => navigate("/")}
          className="p-2 my-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {paginatedData.length === 0 ? (
        <p>No Pokemon added to favorites yet.</p>
      ) : (
        <ul className="space-y-4">
          {paginatedData.map((pokemon) => (
            <li
              key={pokemon.name}
              className="p-4 bg-white dark:bg-gray-900 shadow rounded flex-col flex justify-between 
              items-center text-center hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {pokemon && (
                <div className="p-4">
                  <h1 className="text-3xl font-bold mb-4">
                    {pokemon.name.toUpperCase()}
                  </h1>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-32 h-32 mx-auto mb-4"
                  />
                  <ul className="list-none">
                    <li>
                      Type(s):{" "}
                      {pokemon.types.map((type) => type.type.name).join(", ")}
                    </li>
                    <li>
                      Abilities:{" "}
                      {pokemon.abilities
                        .map((ability) => ability.ability.name)
                        .join(", ")}
                    </li>
                    <li>Height: {pokemon.height}</li>
                    <li>Weight: {pokemon.weight}</li>
                  </ul>
                </div>
              )}
              <button
                onClick={() => removeFavorite(pokemon.name)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {favorites.length > 5 &&
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(favorites.length / ITEMS_PER_PAGE)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      }
    </div>
  );
};

export default FavoritesPage;
