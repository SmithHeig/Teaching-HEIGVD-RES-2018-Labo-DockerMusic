docker kill $(docker ps -q)
docker run -d res/musicien piano
docker run -d res/musicien trumpet
docker run -d res/musicien drum
docker run -d -p 2505:2505 res/auditor

