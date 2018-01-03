cd ../src/account/
cp -rf ../common/latest/* latest/

IMAGE=patrocinio/microbank-account:latest
docker build -t $IMAGE .

