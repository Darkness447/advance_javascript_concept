function get(objectParam, pathParam) {
    const path = Array.isArray(pathParam) ? pathParam : pathParam.split('.');
    let index = 0;
    let length = path.length;
    let objectVal = objectParam;

    while (objectVal != null && index < length) {
        objectVal = objectVal[path[index]];
        index++;
    }
    const value = index === length ? objectVal : undefined;
    return value !== undefined ? value : defaultValue;
}

// why this is made  to prevent the error if you reach unknown properties
// const hyundai = {
//     car: {
//       model: { name: 'Creta', price: 100000 },
//       color: 'red',
//     },
//   };
  
//   const tata = {
//     car: {
//       color: 'Green',
//     },
//   };
  
//   function getCarName(company) {
//     return company.car.model.name;
//   } 

