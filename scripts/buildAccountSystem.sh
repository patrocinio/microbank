cd ../src/accountSystem
cp -rf ../common/* src/


IMAGE=patrocinio/microbank-account-system:1
docker build -t $IMAGE .

