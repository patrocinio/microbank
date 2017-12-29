
POD=$(kubectl get po | grep $1 | awk '{print $1}')
echo Found $POD
kubectl delete pod $POD

