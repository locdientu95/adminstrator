const {Client} =require('pg');

// const database = new Client({
//   host:"ec2-107-22-83-3.compute-1.amazonaws.com",
//   port:5432,
//   user:"tuhmiohirbifmu",
//   password:"973cb76ae633ec960c5341cca1de2c415332afb3102ab62eaf6cf4366af59749",
//   database:"dfhn1aqtgld249",
//   ssl: { rejectUnauthorized: false }
//  });
// database.connect();

// const database = new Client({
//   host:"192.168.1.200",
//   port:5432,
//   user:"locdb",
//   password:"ngu0it0iy3u",
//   database:"locdb",
//   ssl: { rejectUnauthorized: false }
//  });
// database.connect();

const database = new Client({
  host:"14.225.254.121",
  port:5432,
  user:"postgres",
  password:"ngu0it0iy3u",
  database:"loctp",
  ssl: { rejectUnauthorized: false }
 });
database.connect();


function select_db(table,Callback){
  database.query("select * from "+table,function(err,result){
      Callback(result);
  });  
     
}

function read_db(table,value_db,Callback){
  database.query("select * from "+table+" where "+value_db,function(err, result){
      Callback(result);
  });  
     
}

//update controller set setting ='{"mode":1,"setting":{"on":1}}' where name='relay_1'{\"mode\":1,\"setting\":{\"on\":0}}
function update_db(table,value_db,address_db, Callback){
  database.query("update "+table+" set "+value_db+" where "+address_db,function(err){
    Callback(err);
  });      
}


//insert into devicemanagement (name,controlid,btn) values ('admin', '001', 3); 

function insert_db(table,name,value,Callback){
  database.query("insert into "+table+" "+name+" values("+value+")",function(err){
    Callback(err);
  });     
}



//delete from devicemanagement whrere controlid = '001';
function delete_db(table,address,Callback){
  database.query("delete from "+table+" where "+address,function(err){
    Callback(err);
  });      
}

module.exports.select_db = select_db
module.exports.read_db = read_db
module.exports.update_db = update_db
module.exports.insert_db = insert_db
module.exports.delete_db = delete_db
