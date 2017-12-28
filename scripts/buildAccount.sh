cd ../src/account
cp -rf ../common/* src/

IMAGE=patrocinio/microbank-account:1
docker build -t $IMAGE .

