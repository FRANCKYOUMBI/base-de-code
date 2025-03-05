# Install dependencies only when needed
FROM node:16.14.2 AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install -g env-cmd

ENV NODE_ENV production

COPY . .

RUN yarn run db:gen
RUN npm run build

RUN rm /app/.env

EXPOSE 80
RUN npm install -g bcrypt

ENV NEXT_TELEMETRY_DISABLED 1

RUN ["chmod", "+x", "/app/entrypoint.sh"]

ENTRYPOINT ["./entrypoint.sh"]

CMD ["yarn", "start"]
