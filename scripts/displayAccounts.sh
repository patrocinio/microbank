./switchNamespace.sh microbank

echo Deleting job
kubectl delete job display-accounts

echo Creating job
kubectl create -f ../jobs/displayAccountsJob.yaml

./logComponent.sh display-accounts

echo Deleting job
kubectl delete job display-accounts

