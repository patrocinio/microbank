cd ../src/accountSystem
cp -rf ../common/* src/


IMAGE=patrocinio/microbank-account-system:latest
docker build -t $IMAGE .

