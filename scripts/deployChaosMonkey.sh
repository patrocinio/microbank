NAME=chaos-monkey

./stopChaosMonkey.sh
helm install $NAME ../helm/chaos-monkey