COMPONENT=$1
VERSION=$2

IMAGE=patrocinio/microbank-$COMPONENT:$VERSION

echo Pushing component $COMPONENT as latest version
LATEST=patrocinio/microbank-$COMPONENT:latest
docker tag $IMAGE $LATEST
docker push $LATEST

echo Pushing component $COMPONENT as version $VERSION
docker push $IMAGE
