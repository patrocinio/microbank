NAME=mary-account

./createNamespace.sh microbank
helm delete --purge $NAME
helm install -n $NAME ../helm/microbank/charts/mary-account