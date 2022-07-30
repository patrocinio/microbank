# microbank
A simple banking application, based on microservices

Pre-requisites

- Helm

How to run

```
cd scripts
./deployMicrobank.sh
deployMicrobankManager.sh
createAccounts.sh
validateBalance.sh
deployMicrobankSimulator.sh 1.0
switchNamespace.sh microbank-simulator
logComponent.sh transfer
deployChaosMonkey.sh
```