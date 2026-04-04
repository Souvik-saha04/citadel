#!/usr/bin/env bash
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
