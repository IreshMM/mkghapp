FROM node:22

# Create app directory
WORKDIR /usr/app

# Copy app source
COPY src/ /usr/app

# Create output dir with permissions
RUN mkdir /usr/app/output && chown -R node:node /usr/app/output

# Install app dependencies
RUN npm install --omit=dev

CMD [ "node", "server.js"]