#!/bin/bash
echo "[RUN.SH]"

export PATH=$PATH:/usr/local/bin  # For cron to find npx
cd "$(dirname "$0")" || { echo "Failed to cd into script directory"; exit 1; } # Change to current project directory

# Load ENV file
/usr/local/bin/npx ts-node scripts/loadenv.ts

echo "Script running..."
echo "Data update every 01:00 AM UTC"
