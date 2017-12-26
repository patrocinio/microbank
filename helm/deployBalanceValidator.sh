NAME=balance-validator

./create_namespace.sh microbank-manager
helm delete --purge $NAME
helm install -n $NAME ./microbank-manager/charts/balance-validator
