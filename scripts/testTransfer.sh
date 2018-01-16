PORT=31595

curl -d "from=john-account&to=mary-account&amount=10" -X POST http://50.22.210.194:$PORT/transfer