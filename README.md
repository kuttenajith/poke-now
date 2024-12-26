# PokeNow - Pokémon API Frontend

A responsive React application to explore Pokémon data using the Pokémon API.

## Features

- Search for Pokémon by name or ID.
- Modern and user-friendly UI using Tailwind CSS.
- Used consistent spacing, typography, and color palettes that align with the Pokémon theme.
- View detailed Pokémon information (name, type, abilities, height, weight, and sprite).
- Save favorite Pokémon and manage them.
- Loading spinner and error handling for better UX.
- Fully responsive design using Tailwind CSS.

## **Fixes and Improvements**

**Error Handling:**
Added a try-catch block in the fetchAllPokemon function to catch API errors.
Displays a friendly error message if fetching fails.

**Loading State:**
A spinner is displayed centrally while data is being fetched.

**Conditional Rendering:**
The component handles three states: loading, error, and success.

**Pagination Logic:**
The Pokémon list is sliced based on the current page, and numbered pagination buttons work seamlessly.
**Dynamic Pagination**: Handles a large number of Pokémon and dynamically generates pagination buttons.

Responsive Design:****
Ensures a grid layout for Pokémon cards that adapts to different screen sizes.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/poke-now.git
   cd poke-now
   npm install
   npm start
   ```
