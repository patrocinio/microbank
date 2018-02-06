COMPONENT=$1
VERSION=$2

echo Building component $COMPONENT at version $VERSION
cd ../src/$COMPONENT
cp -rf ../common/latest/* $VERSION/ 

IMAGE=localhost:5000/microbank-$COMPONENT:$VERSION
docker build --build-arg version=$VERSION -t $IMAGE .

