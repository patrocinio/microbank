COMPONENT=$1
VERSION=$2

echo Pushing component $COMPONENT at version $VERSION

IMAGE=patrocinio/microbank-$COMPONENT:$VERSION
docker push $IMAGE

