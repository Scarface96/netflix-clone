# 🎬 Netflix Clone

A Netflix-style streaming UI built with **React**, **Tailwind CSS** and **Firebase**. Users can sign up, log in, browse rows of real movie data from **TMDB**, and save favourites to their own "My Shows" list.

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB_API-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white)

## ✨ Features

- 🔐 **Authentication** — sign up, log in and log out with Firebase Auth (email & password)
- 🎞️ **Hero banner** — a random featured movie on the home page
- 📚 **Movie rows** — horizontally scrolling rows for **Upcoming**, **Popular**, **Trending**, **Top Rated** and **Horror**, loaded live from the TMDB API
- ❤️ **Save shows** — click the heart on any movie to save it to your account (stored in Cloud Firestore)
- 👤 **My Shows** — an account page listing your saved movies, with the option to remove them
- 🛡️ **Protected routes** — the account page is only available when logged in
- 📱 **Responsive design** with Tailwind CSS

## 🛠️ Built With

| Area | Technology |
|------|------------|
| UI | React, Tailwind CSS, React Icons |
| Routing | React Router |
| Auth & database | Firebase Authentication, Cloud Firestore |
| Data | TMDB API via Axios |
| Hosting | Firebase Hosting |

## 📁 Project Structure

```
src/
├── components/
│   ├── Main.jsx            # Hero banner
│   ├── Row.jsx             # Scrolling movie row
│   ├── Movie.jsx           # Movie card + save button
│   ├── SavedShows.jsx      # User's saved list
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── context/AuthContext.js  # Auth state shared across the app
├── pages/                  # Home, Login, Signup, Account
├── Requests.js             # TMDB endpoints
└── firebase.js             # Firebase setup
```

## 🚀 Getting Started

1. Clone and install:
   ```bash
   git clone https://github.com/Scarface96/netflix-clone.git
   cd netflix-clone
   yarn install
   ```
2. Create a Firebase project with **Email/Password** auth and **Cloud Firestore** enabled.
3. Create a `.env` file in the project root with your Firebase settings:
   ```
   REACT_APP_FIREBASE_API_KEY=...
   REACT_APP_FIREBASE_AUTH_DOMAIN=...
   REACT_APP_FIREBASE_PROJECT_ID=...
   REACT_APP_FIREBASE_STORAGE_BUCKET=...
   REACT_APP_MESSAGING_SENDER=...
   REACT_APP_APP_ID=...
   ```
4. Add your own [TMDB API key](https://www.themoviedb.org/settings/api) in `src/Requests.js`.
5. Run `yarn start` and open [http://localhost:3000](http://localhost:3000).

## 📚 What I Learned

Using React Context for global auth state, protecting routes, reading and writing user data in Firestore, consuming a REST API, and styling quickly with Tailwind.

> This is a personal learning project and is not affiliated with Netflix. Movie data is provided by TMDB.

---

👤 **Tony Mulunda** — [GitHub @Scarface96](https://github.com/Scarface96)

## About This Project

A full-featured React portfolio application inspired by a streaming platform. It demonstrates authentication, protected routes, cloud data persistence, third-party API integration, responsive UI development and global state management with React and Firebase.
