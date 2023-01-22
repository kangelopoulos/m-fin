const fs = require('fs');
const helper = {};

helper.createCSV1 = async (data, file) => {
  const openFile = fs.openSync(file, 'w');
  fs.writeFileSync(openFile, 'DunkinId,Amount\n', (err) => {});
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
    console.log(source);
    sum += Math.round(100*Number(sources[source]))/100;
    fs.appendFile(openFile, `${source},${Math.round(100*Number(sources[source]))/100}\n`, (err) => {
      {};
    })
  }
};

helper.createCSV2 = async (data, file) => {
  const openFile = fs.openSync(file, 'w');
  fs.writeFileSync(openFile, 'DunkinBranch,Amount\n', (err) =>{});
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
    fs.appendFile(openFile, `${branch},${Math.round(100*Number(branches[branch]))/100}\n`, (err) => {
      {};
    })
  }
  console.log('sum', sum);
};

helper.createCSV3 = async (data, file) => {
  const openFile = fs.openSync(file, 'w');
  fs.writeFileSync(openFile, 'DunkinId,DunkinBranch,FirstName,LastName,DOB,PhoneNumber,DunkinId,ABARoutingNumber,AccountNumber,Name,DBA,EIN,AddressLine1,City,State,Zip,PlaidId,LoanAccountNumber,Amount,Status\n', (err) => {});
  for(let i = 0; i < data.length; i++) {
    fs.appendFile(openFile, `${data[i].Employee.DunkinId},${data[i].Employee.DunkinBranch},${data[i].Employee.FirstName},${data[i].Employee.LastName},${data[i].Employee.DOB},${data[i].Employee.PhoneNumber},${data[i].Payor.DunkinId},${data[i].Payor.ABARouting},${data[i].Payor.AccountNumber},${data[i].Payor.Name},${data[i].Payor.DBA},${data[i].Payor.EIN},${data[i].Payor.Address.Line1},${data[i].Payor.Address.City},${data[i].Payor.Address.State},${data[i].Payor.Address.Zip},${data[i].Payee.PlaidId},${data[i].Payee.LoanAccountNumber},${data[i].Amount},${'Incomplete'}\n`, (err) => {
      {};
    })
  }
};

module.exports = helper;