install:
		npm ci --prefix frontend

build: install
		npm run build

start-frontend:
		make -C frontend start

start:
		npx start-server -s ./frontend/dist
