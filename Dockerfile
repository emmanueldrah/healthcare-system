# Use Python for API
FROM python:3.11-slim as api
WORKDIR /app
RUN apt-get update && apt-get install -y libpango-1.0-0 libharfbuzz0b libpangoft2-1.0-0
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ ./backend/
ENV PYTHONPATH=/app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8767"]

# Use Node for Web
FROM node:18-slim as web
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=web /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
