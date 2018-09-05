NAMESPACE=$1

kubectl config set-context $(kubectl config current-context) --namespace=$NAMESPACE

echo Namespace set to $NAMESPACE
