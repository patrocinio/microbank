for c in ../src/* 
do
	latest=$(ls $c | grep 1 | sort -n | tail -1)
	comp=$(basename $c)
	echo Component $comp version $latest
	./buildComponent.sh $comp $latest
	./pushComponent.sh $comp $latest
done

