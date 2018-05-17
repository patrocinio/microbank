NAME=microbank
VERSION=$1

clear
echo Deploying version $1

./createNamespace.sh microbank
helm delete --purge $NAME --tls
helm install -n $NAME ../helm/microbank/$VERSION --tls
