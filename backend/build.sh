#!/usr/bin/env bash
cd backend
pip install -r requirements_utf8.txt
python manage.py collectstatic --noinput
python manage.py migrate
