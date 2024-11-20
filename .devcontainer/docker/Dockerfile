FROM node:22.11.0-alpine as base

WORKDIR /home/node/rest-api

RUN corepack enable pnpm

USER node

RUN yes | pnpm -v

ENTRYPOINT [".devcontainer/entrypoints/docker-entrypoint.sh"]

CMD [ "sleep", "infinity" ]
