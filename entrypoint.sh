#!/bin/bash

# Run notif.sh in the background
./notif.sh &

# Run cron in the foreground
exec cron -f
