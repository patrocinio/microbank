#HELM_OPTIONS=--tls
HELM_OPTIONS=


./switchNamespace.sh microbank
echo Deleting microbank
helm delete microbank $HELM_OPTIONS

./switchNamespace.sh microbank-manager
echo Deleting microbank-manager
helm delete microbank-manager $HELM_OPTIONS

./switchNamespace.sh microbank-simulator
echo Deleting microbank-simulator
helm delete microbank-simulator $HELM_OPTIONS

