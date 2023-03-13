const mongoose = require('mongoose')

exports.limitArray = function(limit){
    return function(value){
        return value.length <= limit;
    }
}