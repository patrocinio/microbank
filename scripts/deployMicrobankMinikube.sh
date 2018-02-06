NAME=microbank
VERSION=$1

clear
echo Deploying version $1

./createNamespaceMinikube.sh microbank

echo Deleting release
helm delete --purge --debug $NAME 

echo Deploying microbank
helm install -n $NAME ../helm/microbank/$VERSION