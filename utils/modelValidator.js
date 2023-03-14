const mongoose = require('mongoose')

exports.limitArray = function(limit){
    return function(value){
        return value.length <= limit;
    }
}

exports.setToMax = function(max){
    return function(value){
        console.log(this.nickname);
        if( value > max) return this.value = max;
        else return this.value = value;
    }
}

exports.populate = function(Schema, path, select, next){
    if(Schema[path] == null) next();
    Schema.populate({
        path,
        select
    })

    next();
}