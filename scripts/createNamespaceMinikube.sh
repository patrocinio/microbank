NAMESPACE=$1

kubectl create namespace $NAMESPACE
./switchNamespaceMinikube.sh $NAMESPACE

