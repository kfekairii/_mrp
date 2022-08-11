FROM node:16.14.2-alpine AS development

RUN apk add yarn

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn 

COPY . .

# ============ BUILDER =============== #
FROM node:16.14.2-alpine AS builder

RUN apk add yarn

WORKDIR /app

COPY --from=development /app ./

#React redux type conflict fix
# RUN rm ./node_modules/@types/hoist-non-react-statics/node_modules/@types/react/index.d.ts
# RUN rm ./node_modules/@types/react-redux/node_modules/@types/react/index.d.ts 

RUN yarn build

# ============ PRODUCTION =============== #

FROM nginx:stable-alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]