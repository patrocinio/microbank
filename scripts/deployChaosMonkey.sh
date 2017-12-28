NAME=chaos-monkey

./switchNamespace.sh default
helm delete --purge $NAME
helm install -n $NAME ../helm/chaos-monkey