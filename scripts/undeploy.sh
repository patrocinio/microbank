
./switchNamespace.sh 
echo Deleting microbank
helm delete --purge microbank --tls

./switchNamespace.sh microbank-manager
echo Deleting microbank-manager
helm delete --purge microbank-manager --tls

./switchNamespace.sh microbank-simulator
echo Deleting microbank-simulator
helm delete --purge microbank-simulator --tls

