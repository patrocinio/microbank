echo Deleting job
kubectl delete job validate-balance

echo Creating job
kubectl create -f ../jobs/validateBalanceJob.yaml

POD=`kubectl get po | grep validate-balance | awk '{print $1}'`
echo Pod: $POD
kubectl logs -f $POD