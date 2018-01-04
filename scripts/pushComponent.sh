COMPONENT=$1
VERSION=$2

echo Pushing component $COMPONENT as version $VERSION

IMAGE=patrocinio/microbank-$COMPONENT:$VERSION
docker push $IMAGE

echo Pushing component $COMPONENT as latest version
LATEST=patrocinio/microbank-$COMPONENT:latest
docker tag $IMAGE $LATEST
docker push $LATEST
