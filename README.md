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

## Authorization

Most of the endpoints are secured by JWT authorization. In a real world application I would expect that the token is obtained from a central authorization service which would be shared between all microservices. Hence, this service would only needs to validate the JWT. However, for convenience of demonstration I have set up an extra endpoint `/token` which will return an access token, valid for 1 hour. This should be sent in the `Authorization` header of the request.

```sh
# request fails without valid auth token
$ curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"Roast Chicken","content":"A quick and simple chicken recipe.","author":"Matthew"}' \
  'http://localhost:3000/post'
{"message":"Unauthorized","statusCode":401}

# get an auth token
$ curl 'http://localhost:3000/token'
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..."}

# request is successful when the token is sent in the auth header
$ TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...'
$ curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Roast Chicken","content":"A quick and simple chicken recipe.","author":"Matthew"}' \
  'http://localhost:3000/post'
{"title":"Roast Chicken","content":"A quick and simple chicken recipe.","author":"Matthew","createdAt":"2024-01-28T11:16:40.541Z","_id":"65b63798026024a73c379a08","__v":0}
```

Validation is done by the global [`AuthGuard`](./src/guards/auth.guard.ts).
