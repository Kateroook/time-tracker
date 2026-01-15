# Time Tracker

Minimal time-tracking app (frontend + backend + Prisma/Postgres).

## Requirements

- Node.js (v16+)
- PostgreSQL (local or hosted)
- npm

## Quick start

1. Clone the repo (if not already):

	 ```bash
	 git clone <repo-url>
	 cd time-tracker
	 ```

2. Backend

	 - Create a `.env` file in `backend/` with at least:

		 ```env
		 DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
		 PORT=3001
		 ```

	 - Install dependencies and prepare the database:

		 ```bash
		 cd backend
		 npm install
		 npx prisma generate
		 npx prisma migrate dev --name init
		 ```

	 - Start the backend (development):

		 ```bash
		 npm run dev
		 # or: npm start
		 ```

	 The API will be available at `http://localhost:3000` (or the port set in `.env`).

3. Frontend

	 - Create a `.env` file in `frontend/` with:

		 ```env
		 VITE_API_BASE="http://localhost:3000"
		 ```

	 - Install and run:

		 ```bash
		 cd ../frontend
		 npm install
		 npm run dev
		 ```

	 - Open the dev server shown by Vite (usually `http://localhost:5173`).

4. Use

	 - Create entries via the form and view/edit/delete them in the History list.

## Project architecture

- Backend
	- Node.js + Express server in `backend/src`
	- Prisma ORM in `backend/prisma/schema.prisma`
	- Postgres database configured via `DATABASE_URL` env var
	- Routes: `backend/src/routes/entries.js`
	- Controllers/Services/Validators pattern in `backend/src`

- Frontend
	- React + TypeScript (Vite) in `frontend/src`
	- Material UI (`@mui/material`) for UI components
	- API helpers in `frontend/src/api/entries.ts`
	- Main pages/components in `frontend/src/pages` and `frontend/src/components`

## File overview

Top-level layout:

```
README.md
backend/
	package.json
	prisma/
		schema.prisma
	src/
		app.js
		server.js
		routes/
		controllers/
		services/
		validators/
frontend/
	package.json
	src/
		App.tsx
		pages/
		components/
		api/
```

## Notes & Tips

- If you change the Prisma schema, run `npx prisma migrate dev` to apply migrations.
- The frontend reads `VITE_API_BASE` at build/dev time; restart the dev server after changing it.
- To run both servers concurrently you can open two terminals or use a process manager (e.g. `concurrently`).

## Troubleshooting

- Database connection errors: verify `DATABASE_URL` and that Postgres is running and reachable.
- CORS issues: backend uses `cors`; make sure `VITE_API_BASE` is pointing to the backend origin.