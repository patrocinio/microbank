NAME=account-system

./create_namespace.sh microbank
helm delete --purge $NAME
helm install -n $NAME ./account-system