install:
		npm ci --prefix frontend

preinstall:
		npm ci

build: preinstall install
		npm run build

start-frontend:
		make -C frontend start

start:
		npx start-server -s ./frontend/dist
