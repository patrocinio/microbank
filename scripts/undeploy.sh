
./switchNamespace.sh 
echo Deleting microbank
helm delete --purge microbank

./switchNamespace.sh microbank-manager
echo Deleting microbank-manager
helm delete --purge microbank-manager

./switchNamespace.sh microbank-simulator
echo Deleting microbank-simulator
helm delete --purge microbank-simulator

