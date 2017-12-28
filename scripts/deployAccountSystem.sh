NAME=account-system

./createNamespace.sh microbank
helm delete --purge $NAME
helm install -n $NAME ../helm/microbank/charts/account-system