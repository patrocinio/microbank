COMPONENT=$1
VERSION=$2
PREFIX=localhost:5000/

IMAGE=patrocinio/microbank-$COMPONENT:$VERSION

echo Pushing component $COMPONENT as latest version
LATEST=patrocinio/microbank-$COMPONENT:latest
docker tag $IMAGE $PREFIX$LATEST
docker push $PREFIX$LATEST

echo Pushing component $COMPONENT as version $VERSION
docker tag $IMAGE $PREFIX$IMAGE
docker push $PREFIX$IMAGE
