latest=$(ls ../src/$1 | sort -n | tail -1)
echo Version $latest
./buildComponentMinikube.sh $1 $latest
./pushComponentMinikube.sh $1 $latest
