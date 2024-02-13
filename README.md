# Remix App with Rust gRPC backend

This is an example project of a [Remix](https://remix.run/) application talking to a Rust backend using gRPC.
It uses a local Postgres database for persistence, leveraging 
[SQLx's type safe queries](https://github.com/launchbadge/sqlx).

> This codebase supplements the
> [End-to-end type safety with Remix and Rust blog series](https://monadera.com/tag/remix-rust-grpc/)
> Please check out the blog posts for a step-by-step guide 
> for developing this application.

## Pre-requisites

These tools are needed to run the application:

- A recent version of [Node](https://nodejs.org/) (v18+).
- A recent version of [Rust](https://www.rust-lang.org/tools/install) (1.75+).
- [Docker](https://www.docker.com/).
- [SQLx CLI](https://github.com/launchbadge/sqlx/tree/main/sqlx-cli) - you can install this using Cargo.
- [protobuf](https://formulae.brew.sh/formula/protobuf)
- [grpcui](https://github.com/fullstorydev/grpcui) - if you want an interactive UI for gRPC.:w

## Running the gRPC service

In order to run the service, we'll need a Postgres database running locally.
You can spin up one using docker compose in the `./api` directory:

```bash
docker compose up -d db
```

Create an `.env` file to set the `DATABASE_URL` for SQLx.

```dotenv
DATABASE_URL=postgres://postgres:dummy@localhost:5432/trading
```

Use SQLx's CLI to create the database and apply the migrations.

```bash
sqlx database create
sqlx migrate run
```

With the database ready, you should be able to use Cargo to run the service:

```bash
cargo run
```
