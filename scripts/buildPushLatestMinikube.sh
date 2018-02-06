
for c in ../src/* 
do
	latest=$(ls $c | sort -n | tail -1)
	comp=$(basename $c)
	echo Component $comp version $latest
	./buildComponentMinikube.sh $comp $latest
	./pushComponentMinikube.sh $comp $latest
done

