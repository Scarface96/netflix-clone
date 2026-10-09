# 🎬 Reelhouse — streaming app (Netflix-style clone)

A streaming-style film browser built with **React**, **Tailwind CSS** and **Firebase**, using live data and trailers from **TMDB**. It started as a Netflix clone and has grown into its own product, **Reelhouse**, with its own name and look.

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB_API-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white)

## 🌐 Live Demo

**[scarface96.github.io/netflix-clone](https://scarface96.github.io/netflix-clone/)** — rebuilt and redeployed automatically on every push to `main`.

## ✨ Features

- 🎞️ **Hero banner** featuring a film that's trending today, with **Play trailer**, **More info** and **My List** buttons
- 📚 **Nine rows**: trending, popular, top rated, coming soon, plus action, science fiction, comedy, animation and horror
- 🎬 **Details dialog**: embedded YouTube trailer, rating, runtime, genres, director, cast and a "More like this" grid you can click through
- 🔍 **Search** across the TMDB catalogue, with shareable URLs (`#/search?q=dune`)
- ➕ **My List** for everyone: guests keep it in the browser; signed-in users keep it in Cloud Firestore, and anything saved as a guest is merged in when you sign in
- 🔐 **Accounts** with Firebase Auth: sign up, sign in, password reset, clear error messages, and an account page
- 🛡️ **Protected routes** that wait for Firebase to restore your session, so refreshing doesn't log you out
- 📱 Responsive, keyboard accessible (focus rings, Esc closes dialogs, labelled controls), skeleton loading states

## 🛠️ Built With

| Area | Technology |
|------|------------|
| UI | React 18, Tailwind CSS, React Icons |
| Routing | React Router 6 (`HashRouter`, so deep links work on GitHub Pages) |
| State | React Context for auth, My List and the details dialog |
| Auth & database | Firebase Authentication, Cloud Firestore |
| Data | TMDB API via `fetch` with `AbortController` |
| Tests | Jest (`src/tmdb.test.js`) |
| Hosting | GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`); `firebase.json` is kept for Firebase Hosting |

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx            # Featured film banner
│   ├── Row.jsx             # Scrolling row with skeletons
│   ├── MovieCard.jsx       # Card with My List toggle
│   ├── DetailsModal.jsx    # Trailer, details, cast, similar films
│   ├── AuthForm.jsx        # Shared sign-in / sign-up form with poster wall
│   ├── Navbar.jsx, Footer.jsx, ProtectedRoute.jsx
├── context/
│   ├── AuthContext.js      # Firebase auth state and friendly errors
│   ├── ListContext.js      # My List: browser storage + Firestore sync
│   └── DetailsContext.js   # Opens the details dialog from anywhere
├── pages/                  # Home, Search, MyList, Account, Login, Signup
├── tmdb.js                 # TMDB endpoints and helpers
├── tmdb.test.js            # Tests for tmdb.js
└── firebase.js             # Firebase setup
```

## 🚀 Getting Started

```bash
git clone https://github.com/Scarface96/netflix-clone.git
cd netflix-clone
npm install
npm start
```

The repo's `.env` already points at the demo Firebase project. To use your own, create a Firebase project with **Email/Password** auth and **Cloud Firestore**, and replace the `REACT_APP_FIREBASE_*` values in `.env`. To use your own TMDB key, set `REACT_APP_TMDB_KEY`.

## 📚 What I Learned

Using React Context for global state, protecting routes without flicker, syncing data between localStorage and Firestore, embedding trailers, building accessible dialogs, and deploying a single-page app to GitHub Pages.

> Reelhouse is a personal portfolio project and is not affiliated with Netflix or any streaming service. Film data and images are provided by TMDB; this product uses the TMDB API but is not endorsed or certified by TMDB.

---

👤 **Tony Mulunda** — [GitHub @Scarface96](https://github.com/Scarface96)

## About This Project

A full-featured React portfolio application inspired by streaming platforms. It demonstrates authentication, protected routes, cloud data persistence, third-party API integration, responsive UI development and global state management with React and Firebase.
