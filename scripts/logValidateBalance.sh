POD=`kubectl get po | grep validate-balance | awk '{print $1}'`
echo Pod: $POD

kubectl logs -f $POD
