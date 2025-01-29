module.exports = (objectPagination, countProducts) => {



    const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
    objectPagination.totalPage = totalPage;

    objectPagination.skip = (objectPagination.currentPage - 1) * 4;
    return objectPagination;
}