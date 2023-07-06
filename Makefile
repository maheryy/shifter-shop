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
	@docker compose -f docker-compose.demo.yml build --no-cache

# Run the app in production mode
start:
	@docker compose -f docker-compose.demo.yml up -d

# Stop and remove all docker services
stop: 
	@docker compose -f docker-compose.demo.yml down

# Run the app in development mode
dev:
	@docker compose up -d

# Run the app in development mode
dev-stop:
	@docker compose down


#### Development usage ####
services:=client admin api-gateway auth-svc user-svc product-svc category-svc review-svc order-svc payment-svc cart-svc invoice-svc files-svc mailer-svc profile-svc inventory-svc search-svc analytics-svc

docker-rename:
	@for service in $(services); do \
		docker image tag "shifter-shop-$$service" "maherydock77/shifter-shop.$$service" ; \
	done

docker-push:
	@for service in $(services); do \
		docker image push "maherydock77/shifter-shop.$$service" ; \
	done

copy-env:
	@for service in $(services); do \
		cp "apps/$$service/.env.example" "apps/$$service/.env" ; \
	done