# Alvorada Dev DogExplorer — Front-end 🐶

SPA in Vue 3 + TypeScript to browse dog breeds, bookmark favorites and display images.  
Structured for performance, visual consistency and easy evolution.


## ✨ Features

| View            | What it does                                                                |
|-----------------|---------------------------------------------------------------------------|
| **home**        | Lists all available breeds (data from Dog CEO API via backend).           |
| **Modal**       | Shows 3 random images of the selected breed.                              |
| **Favorites**   | Adds/removes breeds as favorites. If the backend is offline, use `localStorage`. |
| **UX**          | Loading states, friendly error messages, full-width responsive layout. |

## 🛠️ Stack

- **Vue 3** + Composition API  
- **TypeScript**  
- **Vite** (Hot-Module Reload)  
- **Pinia** 
- **Axios** Composable `useApi()`  
- **Tailwind CSS** With design-tokens and utility components
- **Zod** for light validations

## ⚙️ Prerequisites

- **Node >= 20**
- **npm >= 8**  

## Project Setup

```sh
npm install
```

### Start development environment

```sh
npm run dev # Open http://localhost:5173
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
