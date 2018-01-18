account=$1

echo Deleting $account
helm delete --purge $account

echo Deploying $account
sed s/ACCOUNT/$account/g < ../helm/account/latest/values.yaml > /tmp/account/$account.yaml

helm install -n $account -f /tmp/account/$account.yaml ../helm/account/latest

