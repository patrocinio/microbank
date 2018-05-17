NAME=chaos-monkey

./stopChaosMonkey.sh
helm install -n $NAME ../helm/chaos-monkey --tls