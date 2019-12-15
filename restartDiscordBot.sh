#! /bin/bash
cp ../.env .

echo "Pulling the update"
git pull
echo "Stopping existing container"
docker stop discord-bot-backend
echo "Removing existing container so only 1 always restarts"
docker rm discord-bot-backend
echo "Building the new image"
docker build -t root/discord-backend-image .
echo "Running the new container with the new image"
docker run --name discord-bot-backend --restart always -p 49163:8000 -d root/discord-backend-image
echo ""
echo "JOB DONE"
echo ""