# JUSTT

## Development

To start the application, we set up two Dockerfiles (one for each application, ex. client and api). We compose each of these via the `docker-compose.yaml` file.

The `Dockerfile` is the main file which contains the image for the client application; `Dockerfile.api` is the image for the api.

- To start the applications, use the following command: `docker-compose up --remove-orphans --build`.
  - If you need to just start client or api, append the name of what you need to build (ex. `docker-compose up --remove-orphans --build api` if you just need the api).
- To clean the containers, use the following command: `docker-compose down --rmi local -v --remove-orphans`.
