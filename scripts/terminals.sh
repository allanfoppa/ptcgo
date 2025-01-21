#!/bin/bash

pwd_path=$(pwd)
pwd_path=$(dirname "$pwd_path")

echo "Opening terminals in ${pwd_path}"

gnome-terminal \
  --tab --working-directory=${pwd_path}/backend \
  --tab --working-directory=${pwd_path}/frontend/shell \
  --tab --working-directory=${pwd_path}/frontend/core \
  --tab --working-directory=${pwd_path}/frontend/dashboard
