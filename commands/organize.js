let fs = require("fs");
let path = require("path");

let utility = {
    media: ['mp4','mkv','mp3'],
    archives: ['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents: ['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
    app: ['exe','dmg','pkg','deb'],
    images : ['png' , 'jpg', 'jpeg'],
}



function organizeFn(src,){
    // console.log("organizing your folder")
    //src is optional, default
if(src==undefined){
    src = process.cwd(); // path of working directory
}
 let dest = createFolder(src , "organizedFolder");
 organizeHelper (src,dest); 
}

function createFolder(src , parameter){
    let folderPath = path.join(src , parameter);
    if(fs.existsSync(folderPath)==false){
    fs.mkdirSync(folderPath);  
}
return folderPath;
}

function getCategory (src){
    //logic to categorize
 
    let extension = src.split(".")[1];
    for( let key in utility){
        let valueArr = utility[key];
        for(let i =0; i<valueArr.length; i++){
            if (extension == valueArr[i])
             return key;
        }
    }

    return "others"; // if path doesnt fall under any category
}

function copyFileAndOrganize(src , dest){
    dest = path.join(dest,path.basename(src));
  fs.copyFileSync(src , dest); // copyFileSync will only copy conntent from srcFile to DestFile but doesn't create a file.
}

    
function organizeHelper(src , dest){
let isFile = checkFileOrFolder(src);
if(isFile==true){
    //utility
    //logic
    let category = getCategory(src); // media -> mp3,mp4
    let categoryPath = createFolder(dest , category); // to create category folder in destination path
    copyFileAndOrganize(src , categoryPath)


        // console.log(path.basename(src), "=>", category);
}
else{
    let children = fs.readdirSync(src);

    for (let i =0; i<children.length; i++){
        let child = children[i];
        let childPath = path.join(src, child);
        organizeHelper(childPath , dest)
    }
}
}
function checkFileOrFolder(path) {
    let isFile = fs.lstatSync(path).isFile();
    return isFile;
}
module.exports ={
    organize:organizeFn
}