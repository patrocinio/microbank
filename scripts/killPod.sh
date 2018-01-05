function obtainPod() {
	POD=$(kubectl get po | grep $1 | awk '{print $1}')
	echo Found $POD
}

obtainPod $1
echo Killing Pod $POD
kubectl delete pod $POD

echo Waiting for Pod to die
obtainPod $POD
while [ "$POD" != "" ]
do
	obtainPod $POD
done
