# Build the app for production
build:
	@docker compose -f docker-compose.prod.yml build --no-cache

# Run the app in production mode
start:
	@docker compose -f docker-compose.prod.yml up -d
	@echo "Ready at http://localhost:8080/"

# Stop and remove all docker services
stop: 
	@docker compose -f docker-compose.prod.yml down


# Run the app in development mode
dev:
	@docker compose up -d

# Run the app in development mode
dev-stop:
	@docker compose down