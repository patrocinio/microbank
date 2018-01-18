for i in {1..10}
do
	account=account-$i

	echo Deleting $account
	helm delete --purge $account

	echo Deploying $account
	sed s/ACCOUNT/$account/g < ../helm/account/latest/values.yaml > /tmp/account/values.yaml

	helm install -n $account -f /tmp/account/values.yaml ../helm/account/latest
done

