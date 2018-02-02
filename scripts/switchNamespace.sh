# ICP
CONTEXT=mycluster.icp-context
USER=admin

# minikube
#CONTEXT=minikube
#USER=minikube

NAMESPACE=$1

kubectl config set-context $CONTEXT --user=$USER --namespace=$NAMESPACE

echo Namespace set to $NAMESPACE

