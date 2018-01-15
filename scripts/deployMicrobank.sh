NAME=microbank
VERSION=$1

clear
echo Deploying version $1

./createNamespace.sh microbank
helm delete --purge $NAME
helm install -n $NAME ../helm/microbank/$VERSION