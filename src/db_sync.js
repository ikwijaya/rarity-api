const { DB_ALTER, DB_FORCE } = process.env
const db = require('./db')
const xlsx = require('xlsx')

const excelToJSON = async (filename=null, sheet=null) => {
  return new Promise((o,x) => {
    let data = []  
    const file = xlsx.readFile('./_excel/'+filename)
      
    if(sheet && file.Sheets[sheet]) {
      data = xlsx.utils.sheet_to_json(file.Sheets[sheet])
      data.shift()
      o(data)
    } else x(data) 
  })
}

const authenticate = async () => {
  try {
    await db.authenticate();
    console.log('🚀 yey! your database is connected to me.');
  } catch (err) {
    console.error('sorry, something wrong with your connection: ', err);
  }
}

const run = async () => {
  try {
    await db.sync({
      alter: DB_ALTER == 1 ? true : false,
      force: DB_FORCE == 1 ? true : false,
      logging: (msg) => {
        console.log(`sync.js => `, msg)
      }
    });
  } catch (error) { console.log(`error sync`, error) }
}

authenticate();
run();