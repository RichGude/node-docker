# Identify the starting image
FROM node:15
# Optional, but eases file fetching and storing
WORKDIR /app

# Identify what path/file needs to be copied to docker storage ('.' for Workdir)
COPY package.json .
# Install the package.json file dependencies (using bash to limit to certain dependencies)
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

# Copy amd run remaining files
COPY . ./
CMD ["node", "index.js"]

# docker run --name node-app -v %cd%:/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d node-app-image 