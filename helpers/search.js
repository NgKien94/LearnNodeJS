module.exports = ( query) => {
   
    let resultObject = {
        keyword: query.keyword || ""
    };


    if(resultObject.keyword){
        resultObject.regex = new RegExp(resultObject.keyword,'i');
    }
    return resultObject;
}