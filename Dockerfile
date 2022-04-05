FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# install
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# copy files into app
COPY ./ ./

# expose endpoint
EXPOSE 3000

# set environment variables
ENV REACT_APP_API_ENDPOINT $REACT_APP_API_ENDPOINT

# run application
CMD [ "npm", "start" ]
