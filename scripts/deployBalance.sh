NAME=balance

./createNamespace.sh microbank
helm delete --purge $NAME
helm install -n $NAME ../helm/microbank/charts/balance
