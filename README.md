# microbank
A simple banking application, based on microservices

How to run

```
cd scripts
deployMicrobank.sh 2.6
deployMicrobankManager.sh 1.6
createAccounts.sh
validateBalance.sh
deployMicrobankSimulator.sh 1.0
switchNamespace.sh microbank-simulator
logComponent.sh transfer
deployChaosMonkey.sh
```