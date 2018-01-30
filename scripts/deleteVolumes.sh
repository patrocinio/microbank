FILE_PATH=/data

TEMP_FILE=/tmp/volume.yaml

# args: 
# 1: file
# 2: begin
# 3: end
function create_pv () {
	for i in $(eval echo "{$2..$3}")
	do
   		echo Deleting PV $i
   		kubectl delete pv d-${i}
	done
}

create_pv 'rwo' 1 20
create_pv 'rwx' 21 40
create_pv 'rwx-large' 41 50
create_pv 'rwo-large' 51 60
