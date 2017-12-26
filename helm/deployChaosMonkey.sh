NAME=chaos-monkey

./switch_namespace.sh default
helm delete --purge $NAME
helm install -n $NAME chaos-monkey