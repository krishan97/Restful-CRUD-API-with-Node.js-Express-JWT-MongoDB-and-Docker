# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package.json /home/node/app

RUN npm install

COPY . /home/node/app

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 
ENV PORT ${PORT}
ENV MONGO_URI ${MONGO_URI}
EXPOSE ${PORT}
CMD [ “npm”, “start” ] 

