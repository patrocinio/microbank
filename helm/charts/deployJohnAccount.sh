NAME=john-account

./create_namespace.sh microbank
helm delete --purge $NAME
helm install -n $NAME ./john-account