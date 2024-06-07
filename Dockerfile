FROM node:22-alpine


# Create navigate app directory
WORKDIR /opt/navigate
RUN addgroup -S software -g 3624 && adduser -S software -u 3624 -G software
RUN chown -R software:software /opt/navigate

# Change user
USER software

# Copy dependency definitions
COPY --chown=software:software package*.json ./

# Install dependencies
RUN npm install

# Copy all the remaining code
COPY --chown=software:software . .

# Create environment vars to build project
ENV VITE_ODB_TOKEN=${VITE_ODB_TOKEN}
ENV VITE_ODB_URI=${VITE_ODB_URI}
ENV VITE_NG_SERVER_URI=${VITE_NG_SERVER_URI}
ENV VITE_NG_CONFIGS_URI=${VITE_NG_CONFIGS_URI}
ENV VITE_NG_WS=${VITE_NG_WS}
