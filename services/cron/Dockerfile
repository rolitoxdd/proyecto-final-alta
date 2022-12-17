FROM denoland/deno:1.28.3

WORKDIR /app
COPY . .

# Install cron
RUN apt-get update && apt-get install -y cron

# Add crontab file in the cron directory
RUN echo "* * * * * deno run -A /app/index.ts > /app/log 2> /app/error_log" > /etc/cron.d/hello-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/hello-cron

# Apply cron job
RUN crontab /etc/cron.d/hello-cron

# Run the command on container startup
CMD ["cron", "-f"]