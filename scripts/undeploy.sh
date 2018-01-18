
./switchNamespace.sh 
echo Deleting microbank
helm delete --purge microbank

for i in {1..100}
do
	account=account-$i
	echo Deleting $account
	helm delete --purge $account
done

./switchNamespace.sh microbank-manager
echo Deleting microbank-manager
helm delete --purge microbank-manager

