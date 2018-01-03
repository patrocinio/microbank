echo Building component $1
cd ../src/$1
cp -rf ../common/* src/

IMAGE=patrocinio/microbank-$1:latest
docker build --build-arg version=1.0 -t $IMAGE .

