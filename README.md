# Emergency Check-In (Serverless)

This project provides a React frontend and Firebase Cloud Functions backend for a simple emergency check‑in application. The API is served by Firebase Functions and data is stored in Firestore.

## Structure

- `frontend/` – React application (created with Create React App).
- `functions/` – Firebase Cloud Functions using Express and Firestore.
- `firebase.json` – Firebase deployment configuration.

## Getting Started

1. Install dependencies for both `functions` and `frontend`:
   ```bash
   cd functions && npm install
   cd ../frontend && npm install
   ```
2. To develop locally with Firebase emulators, run:
   ```bash
   firebase emulators:start
   ```
3. Build and deploy to Firebase:
   ```bash
   npm --prefix frontend run build
   firebase deploy
   ```

Firestore should contain a `teams` collection with member documents similar to those used in development.
