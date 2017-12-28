helm delete --purge validate-balance-job
helm delete --purge validata-balance
helm install ../helm/microbank-manager/charts/validate-balance-job
