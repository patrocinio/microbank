cp -rf ../common/* src/

IMAGE=patrocinio/microbank-balance:1
docker build -t $IMAGE .

