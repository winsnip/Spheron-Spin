#!/bin/bash

# Setup
export PATH=$PATH:/usr/local/bin
cd "$(dirname "$0")" || { echo "Failed to cd into script directory"; exit 1; }

# Print schedule and actual time
echo "[INFO] Script running now at $(date)"

# Optional delay
DELAY=$((RANDOM % 180))
echo "[INFO] Sleeping for $DELAY seconds..."
sleep $DELAY

# Run your scripts
echo "[INFO] Running spin.ts"
/usr/local/bin/npx ts-node scripts/spheron/spin.ts

echo "[INFO] Running points.ts"
/usr/local/bin/npx ts-node scripts/spheron/points.ts
