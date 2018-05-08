rm -r ./docker/image-auditor/auditor/
cp -r ./auditor/ ./docker/image-auditor/auditor/

docker build -t res/auditor ./docker/image-auditor/

rm -r ./docker/image-musician/musicien/
cp -r ./musicien/ ./docker/image-musician/musicien/

docker build -t res/musicien ./docker/image-musician/
