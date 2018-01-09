

POD=$(kubectl get po | grep $1 | awk '{print $1}')
echo Found $POD

while [ "$(kubectl get po $POD | grep -v NAME | awk '{print $3}')" == "ContainerCreating" ]
do
	sleep 1
done

kubectl logs -f $POD

