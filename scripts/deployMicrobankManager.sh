NAME=microbank-manager

./createNamespace.sh microbank-manager
helm delete --purge $NAME
helm install -n $NAME ../helm/microbank-manager