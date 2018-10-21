export function capitalizeFirstLetter(item){
	if(!item) return;

	for(var property in item){
		if (item.hasOwnProperty(property)){
			var cp = property.toString().charAt(0).toUpperCase() + property.toString().slice(1);
			item[cp] = item[property];
			delete item[property];
		}
	}
}

export function deserializePath(source){
	let arr = source.split("),(");

	arr[0] = arr[0].substring(1);
	arr[arr.length-1] = arr[arr.length-1].substring(0,arr[arr.length-1].length-1);

	arr.forEach(function(value,index,array){
		let temp = value.split(',');
		let latLang = {
			lat: temp[0],
			lng: temp[1]
		}
		array[index] = latLang;
	});

	return arr;
}

export function createProperties(item){
    if (Object.keys(item.properties).length){//
        item.properties = JSON.stringify(item.properties);
    }
    else item.properties = "";
}

export function deserializeProperties(item){
	if (item.properties){
		return Object.assign(item,JSON.parse(item.properties))
	} else return item;
}