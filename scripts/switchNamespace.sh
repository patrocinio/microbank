CONTEXT=mycluster.icp-context
USER=admin
NAMESPACE=$1

echo Switching to namespace $NAMESPACE
kubectl config set-context $CONTEXT --user=$USER --namespace=$NAMESPACE
kubectl config use-context $CONTEXT
kubectl config get-contexts

