CONTEXT=mycluster.icp-context
USER=mycluster.icp-user
NAMESPACE=$1

kubectl config set-context $CONTEXT --user=$USER --namespace=$NAMESPACE

echo Namespace set to $NAMESPACE

