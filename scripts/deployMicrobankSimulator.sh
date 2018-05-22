VERSION=$1
NAME=microbank-simulator

echo Deploying version $VERSION

./createNamespace.sh microbank-simulator
helm delete --purge $NAME --tls
helm install -n $NAME ../helm/microbank-simulator/$VERSION --t