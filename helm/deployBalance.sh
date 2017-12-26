NAME=balance

./create_namespace.sh microbank
helm delete --purge $NAME
helm install -n $NAME ./balancels
