./switchNamespace.sh microbank-manager

echo Deleting job
kubectl delete job validate-balance

echo Creating job
kubectl create -f ../jobs/validateBalanceJob.yaml

./logValidateBalance.sh

echo Deleting job
kubectl delete job validate-balance


