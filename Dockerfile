# Use Node base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Make run.sh executable
RUN chmod +x run.sh notif.sh entrypoint.sh

# Install cron
RUN apt-get update && apt-get install -y cron

# Copy crontab file and load it
RUN crontab crontab.txt

# Start cron in foreground and notif.sh in background
CMD ["/app/entrypoint.sh"]
