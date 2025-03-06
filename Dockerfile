FROM node:20-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
ENV PORT 80
RUN ["npm", "run", "build"]
ENV PORT 80
EXPOSE 80
CMD [ "npm", "run", "start"]