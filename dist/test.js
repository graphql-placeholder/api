"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FetchData_class_1 = require("./src/FetchData.class");
var res = new FetchData_class_1.FetchData(FetchData_class_1.RESOURCE_TYPE.POSTS, 2, 4);
console.log(res.getResponse());
