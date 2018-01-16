./switchNamespace.sh microbank

echo Deleting job
kubectl delete job reset

echo Creating job
kubectl create -f ../jobs/reset.yaml

./logComponent.sh reset

echo Deleting job
kubectl delete job reset



