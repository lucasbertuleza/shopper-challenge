build:
	@devcontainer build --no-cache

up:
	@docker compose --file .devcontainer/docker/compose.devcontainer.yaml up --detach

down:
	@docker compose --file .devcontainer/docker/compose.devcontainer.yaml down

root:
	@docker compose --file .devcontainer/docker/compose.devcontainer.yaml exec --user=root devcontainer ash