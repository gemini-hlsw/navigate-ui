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
