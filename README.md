# RSS React-Q1-2025

Implementation of the task https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md

## Overview

This is a React project that uses Vite as the development tool and TypeScript for type safety. The project fetches data from the Rick and Morty API and displays it. You can search for characters by name, and the application will fetch the data dynamically based on your input.

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tatihets/React-class-components.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the project: For development mode, run the following command:**:
   ```bash
   npm run dev
   ```

3. **Build the project: To build the project for production, run:**:
   ```bash
   npm run build
   ```

5. **Preview the project: You can preview the built version locally:**:
   ```bash
   npm run preview
   ```
## Scripts
- **`npm run dev`**: Starts the development server with Vite.
- **`npm run build`**: Builds the project for production. First compiles TypeScript files, then bundles the application using Vite.
- **`npm run lint`**: Runs ESLint to check for linting issues in your codebase.
- **`npm run preview`**: Previews the production build locally.
- **`npm run format:fix`**: Automatically formats the code using Prettier.

## API Integration

This project uses the Rick and Morty API https://rickandmortyapi.com/documentation to fetch characters. The data is fetched based on a search term entered by the user.
