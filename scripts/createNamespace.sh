NAMESPACE=$1

kubectl create namespace $NAMESPACE
./switchNamespace.sh $NAMESPACE

