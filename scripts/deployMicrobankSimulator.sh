latest=$(ls ../helm/microbank-simulator | sort -n | tail -1)

VERSION=$latest
NAME=microbank-simulator

echo Deploying version $VERSION

./createNamespace.sh microbank-simulator
helm delete $NAME
helm install $NAME ../helm/microbank-simulator/$VERSION