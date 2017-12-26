NAMESPACE=$1

kubectl create namespace $NAMESPACE
./switch_namespace.sh $NAMESPACE

