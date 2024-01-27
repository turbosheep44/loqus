# Loqus Interview Task

The full description of the task can be found [here](./TASK.md). The OpenAPI 3.0 specification of this API can be found at [`api.yml`](./api.yml).

The project can be built using `docker`:

```sh
docker build . -t loqus:latest
```

In order to run, the application needs a MongoDB instance to be running. Once the image is built, use the provided `docker-compose.yml` to run a database instance and the application.

```sh
docker compose up -d
```

Once the server has started, the API can be accessed at `localhost:3000/`.
