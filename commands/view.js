let fs = require("fs");
let path = require ("path");

function viewFn(src,mode){
    // console.log("Viewing your folder")
    if(mode=="flat")
    viewHelperFlat(src);
    else
    viewHelperTree(src,"|")
}

function checkFileorFolder(path){
let isFile=fs.lstatSync(path).isFile();
return isFile;
}

function viewHelperFlat(src){
// is it a file or folder
let isFile = checkFileorFolder(src);
if(isFile==true){ // base case
    console.log(src,"*");
}
else{ // this is a folder => folders, files
    console.log(src);
let children = fs.readdirSync(src);
for(let i = 0; i < children.length; i++){
    let child = children[i];
    let childPath = path.join(src,child);
    // console.log(childPath);
    //faith
    viewHelperFlat(childPath);
}
}

}
function viewHelperTree(src,indent){
    let isFile = checkFileorFolder(src);
if(isFile==true){ // base case
    console.log(indent,path.basename(src),"*"); // path.basename()-> F/app/index.js
}
else{ // this is a folder => folders, files
    console.log(indent,path.basename(src));
let children = fs.readdirSync(src);
for(let i = 0; i < children.length; i++){
    let child = children[i];
    let childPath = path.join(src,child);
    // console.log(childPath);
    //faith
    viewHelperTree(childPath,indent+"____");
}
}

}
module.exports = {
    view: viewFn
}