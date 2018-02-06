COMPONENT=$1
VERSION=$2

IMAGE=localhost:5000/microbank-$COMPONENT:$VERSION

echo Pushing component $COMPONENT as latest version
LATEST=localhost:5000/microbank-$COMPONENT:latest
docker tag $IMAGE $LATEST
docker push $LATEST

echo Pushing component $COMPONENT as version $VERSION
docker tag $IMAGE $IMAGE
docker push $IMAGE
