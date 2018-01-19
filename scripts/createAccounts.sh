./switchNamespace.sh microbank

JOB=create-accounts


echo Deleting job
kubectl delete job $JOB

echo Creating job
kubectl create -f ../jobs/createAccounts.yaml

./logComponent.sh create-accounts



