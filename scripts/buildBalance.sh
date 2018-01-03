cd ../src/balance
cp -rf ../common/* src/

IMAGE=patrocinio/microbank-balance:latest
docker build -t $IMAGE .

