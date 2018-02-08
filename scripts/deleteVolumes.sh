FILE_PATH=/data

TEMP_FILE=/tmp/volume.yaml

# args: 
# 1: file
# 2: begin
# 3: end
function delete_pv () {
	for i in $(eval echo "{$1..$2}")
	do
   		echo Deleting PV $i
   		kubectl delete pv d-${i}
	done
}

delete_pv 61 120
