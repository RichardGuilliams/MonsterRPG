exports.filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getIdByName = (objects, name) => {
  const id = objects.find(obj => { return obj.name == name }).id
  return id
};