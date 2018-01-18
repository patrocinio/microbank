PORT=30021
FROM=$1
TO=$2

curl -d "from=$1-account&to=$2-account&amount=10" -X POST http://50.22.210.194:$PORT/transfer