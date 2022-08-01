NAME=chaos-monkey

./switchNamespace.sh default
helm delete $NAME 
