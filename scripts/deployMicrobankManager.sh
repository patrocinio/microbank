latest=$(ls ../helm/microbank-manager | sort -n | tail -1)

VERSION=$latest
NAME=microbank-manager

#HELM_OPTIONS=--tls
HELM_OPTIONS=

echo Deploying version $VERSION

./createNamespace.sh microbank-manager
helm delete $NAME $HELM_OPTIONS
helm install $NAME ../helm/microbank-manager/$VERSION $HELM_OPTIONS