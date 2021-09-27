const CASNumberList = () => {
    const data = require('./data.json');
    var compoundArray = [];
    for (const compound of data)    {
        compoundArray.push(compound["Compound Name"]);
    }

    return compoundArray;
}

export default CASNumberList;