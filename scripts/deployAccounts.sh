
./switchNamespace.sh microbank

for i in {1..10}
do
	account=account-$i
	./deployAccount.sh $account &
done

