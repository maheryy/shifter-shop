# Install project dependencies
install:
	@npm install

# Remove all node_modules and dist folders
clear-app:
	@rm -rf node_modules dist
	@rm -rf apps/**/node_modules apps/**/dist
	@rm -rf libs/**/node_modules libs/**/dist


# Build the app for production
build:
	@docker compose -f docker-compose.ms-prod.yml build --no-cache

# Run the app in production mode
start:
	@docker compose -f docker-compose.ms-prod.yml up -d

# Stop and remove all docker services
stop: 
	@docker compose -f docker-compose.ms-prod.yml down

# Run the app in development mode
dev:
	@docker compose up -d

# Run the app in development mode
dev-stop:
	@docker compose down