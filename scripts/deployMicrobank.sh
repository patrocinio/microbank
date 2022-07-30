
latest=$(ls ../helm/microbank | sort -n | tail -1)

NAME=microbank
VERSION=$latest
#HELM_OPTIONS=--tls
HELM_OPTIONS=

clear
echo Deploying version $VERSION

./createNamespace.sh microbank
helm delete $NAME $HELM_OPTIONS
helm install $NAME ../helm/microbank/$VERSION $HELM_OPTIONS -v 5
