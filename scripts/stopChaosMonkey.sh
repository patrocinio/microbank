NAME=chaos-monkey

./switchNamespace.sh default
helm delete --purge $NAME --tls
