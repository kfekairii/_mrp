FROM node:16.14.2-alpine AS development

RUN apk add yarn

WORKDIR /app

COPY package.json .
COPY yarn.lock .
# COPY prisma ./prisma/

RUN yarn 

COPY . .

# ============ BUILDER =============== #
FROM node:16.14.2-alpine AS builder

RUN apk add yarn

WORKDIR /app

COPY --from=development /app ./

RUN yarn build

# ============ PRODUCTION =============== #
FROM node:16.14.2-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# COPY --from=development /app .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma


EXPOSE 3001

CMD ["yarn", "start:prod"]
