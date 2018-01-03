VERSION=1.0

for c in account account-system balance balance-validator validate-balance-job
do
	./pushComponent.sh $c $VERSION
done