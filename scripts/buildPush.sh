latest=$(ls ../src/$1 | grep 1 | sort -n | tail -1)
echo Version $latest
./buildComponent.sh $1 $latest
./pushComponent.sh $1 $latest
