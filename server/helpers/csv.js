const fs = require('fs');
const helper = {};

helper.checkData = async (data) => {

}

helper.createCSV1 = async (data, file) => {
  const sources = {};
  data.forEach(row => {
    if(sources[row.Payor.DunkinId]){
      sources[row.Payor.DunkinId] += Number(row.Amount.slice(1));
    } else {
      sources[row.Payor.DunkinId] = Number(row.Amount.slice(1));
    }
  });
  let sum = 0;
  for(const source in sources) {
    sum += Math.round(100*Number(sources[source]))/100;
    fs.appendFile(file, `${source},${Math.round(100*Number(sources[source]))/100}\n`, (err) => {
      console.error(err);
    })
  }
  console.log('sum', sum);
};

helper.createCSV2 = async (data, file) => {
  const branches = {};
  data.forEach(row => {
    if(branches[row.Employee.DunkinBranch]){
      branches[row.Employee.DunkinBranch] += Number(row.Amount.slice(1));
    } else {
      branches[row.Employee.DunkinBranch] = Number(row.Amount.slice(1));
    }
  });
  let sum = 0;
  for(const branch in branches) {
    sum += Math.round(100*Number(branches[branch]))/100;
    fs.appendFile(file, `${branch},${Math.round(100*Number(branches[branch]))/100}\n`, (err) => {
      console.error(err);
    })
  }
  console.log('sum', sum);
};

helper.createCSV3 = async (data, file) => {

};

module.exports = helper;