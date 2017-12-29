POD=`kubectl get po | grep validate-balance | grep -v job | awk '{print $1}'`
echo Pod: $POD

kubectl logs -f $POD
