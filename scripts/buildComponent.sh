COMPONENT=$1
VERSION=$2

echo Building component $COMPONENT at version $VERSION
cd ../src/$COMPONENT
cp -rf ../common/* src/

IMAGE=patrocinio/microbank-$COMPONENT:$VERSION
docker build --build-arg version=$VERSION -t $IMAGE .

