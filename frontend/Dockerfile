# Build phase - in this phase code is copied from directory and build using npm
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run phase - in this phase build is packaged into docker image and can be run by starting container from image
FROM node:14-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build /app/build
EXPOSE 443
CMD ["serve", "-s", "build", "-l", "443"]
