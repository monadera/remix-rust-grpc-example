FROM rust:1.75-alpine3.19 as builder

ENV SQLX_OFFLINE=true
RUN apk update && apk add musl-dev protobuf-dev

RUN mkdir /build
WORKDIR /build
COPY ./src ./src
COPY Cargo.* .
RUN --mount=type=cache,target=target/release/build --mount=type=cache,target=target/release/deps --mount=type=cache,target=target/release/.fingerprint --mount=type=cache,target=target/CACHEDIR.TAG \
    cargo build --release

FROM alpine:3.19 as runner

COPY --from=builder /build/target/release/trading-api ./api
COPY ./.env ./.env

ENTRYPOINT ["./api"]