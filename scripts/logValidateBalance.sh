POD=`kubectl get po | grep validate-balance | grep -v job | awk '{print $1}'`
echo Pod: $POD

while [ "$(kubectl get po $POD | grep -v NAME | awk '{print $3}')" == "ContainerCreating" ]
do
	sleep 1
done

kubectl logs -f $POD
