install:
		npm ci

build: install
		npm run build

start-frontend:
		make -C frontend start

start-backend:
		npx start-server -s ./frontend/dist
