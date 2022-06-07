var express = require("express");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy
var app = express();
app.use(express.static("public"));
var server = require("http").createServer(app);
var socket_io = require("socket.io")(server);
server.listen(process.env.PORT || 100);
app.set('trust proxy', 1);
app.set("view engine", "ejs");
app.set("views", "./public");

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "locdientu95",     
    resave: true,
    saveUninitialized: true,
    cookie:{
        //secure: true,
        maxAge:1000*60*60*24   
    }
}));
app.use(passport.initialize());
app.use(passport.session());

var db = require("./pgsql.js");


socket_io.on('connection', function(socket){

    socket.on("client-sent-user",function(){
        db.select_db('registation', function(registation){
            var user=[];
            for(let i=0; i<registation.rowCount;i++)
            {
                var reg = JSON.parse("{\"name\":\""+registation.rows[i].name+"\",\"mail\":\""+registation.rows[i].mail+"\"}");
                user.push(reg);
                //console.log(registation.rows[i]);
            }
            socket.emit("server-sent-registation",user);
        });

        db.select_db('controller_list', function(controller_list){
            var device=[];
            for(let i=0; i<controller_list.rowCount;i++)
            {
                var dev = JSON.parse("{\"controlid\":\""+controller_list.rows[i].controlid+"\",\"btn\":"+controller_list.rows[i].btn+"}");
                device.push(dev);
                //console.log(controller_list.rows[i]);
            }
            socket.emit("server-sent-controller_list",device);
        });

        db.select_db('ota', function(ota){
            var update=[];
            for(let i=0; i<ota.rowCount;i++)
            {
                update.push(ota.rows[i]);
                //console.log(ota.rows[i]);
            }
            socket.emit("server-sent-update",update);
        });

    });



    socket.on("client-sent-add-user",function(user){
        
        db.read_db('registation',"name='"+user.usr+"'",function(registation){
            if(registation.rowCount==0){
                db.read_db('registation',"mail='"+user.mail+"'",function(mail){
                    if(mail.rowCount==0){
                        db.insert_db('registation','(name,pass,mail)',"'"+user.usr+"','"+user.pwd+"','"+user.mail+"'",function(err){
                            if(err==null)
                            {
                                console.log(JSON.stringify(user)+"add completed");
                                socket.emit("server-sent-success","add_user");
                            }
                            else{console.log(err);}
                        });
                    }
                    else{
                        console.log("Mail already exists");
                        socket.emit("server-sent-fail","mail");
                    }
                });
            }
            else{
                console.log("Account already exists"); 
                socket.emit("server-sent-fail","add_user");
            }

        });
    });

    socket.on("client-sent-remove-user",function(user){
        db.read_db('registation',"name='"+user.usr+"' and mail='"+user.mail+"'",function(registation){
            if(registation.rowCount==1){
                
                db.delete_db('registation',"name='"+user.usr+"' and mail='"+user.mail+"'",function(err){
                    if(err==null)
                    {
                        console.log(JSON.stringify(user)+"remove completed");
                        socket.emit("server-sent-success","remove_user");
                    }
                    else{console.log(err);}
                });
            }
            else{
                console.log("Account does not exist"); 
                socket.emit("server-sent-fail","remove_user");
            }

        });
        db.read_db('devicemanagement',"name='"+user.usr+"'",function(devicemanagement){
            if(devicemanagement.rowCount != 0)
            {

                for(let i=0; i<devicemanagement.rowCount;i++)
                {
                    db.delete_db('devicemanagement',"controlid='"+devicemanagement.rows[i].controlid+"'and name='"+devicemanagement.rows[i].name+"'",function(err){
                        if(err != null)
                        {console.log(err);}
                    });
                   
                }
                console.log("User remove completed in devicemanagement");

            }
            else{
                 console.log("User does not exists in devicemanagement!");   
            }
        });
    });

    socket.on("client-sent-add-device",function(device){
        if(device.device == "controller")
        {
            db.read_db('controller_list',"controlid='"+device.serial+"'",function(controller){
                if(controller.rowCount==0)
                {
                    for(let i=1;i<=device.btn;i++)
                    {
                        db.insert_db('controller','(controlid,name,setting,position,mode)',"'"+device.serial+"','Device "+i+"','{\"setting\":{\"on\":0}}',"+i+",1",function(err){
                            if(err != null)
                            {console.log(err);}
                        });
                    }
                    db.insert_db('controller_list','(controlid,btn)',"'"+device.serial+"',"+device.btn,function(err){
                        if(err != null)
                        {console.log(err);}
                    });
                    console.log(JSON.stringify(device)+"add completed");
                    socket.emit("server-sent-success","add_device");
                }
                else{
                    console.log("Serial already exists!");
                    socket.emit("server-sent-fail","add_device");
                }
            });
        }
        else{
            console.log("Device name is incorrect!");
            socket.emit("server-sent-fail","device");
        }
    });

    socket.on("client-sent-remove-device",function(device){
        if(device.device == "controller")
        {
            db.read_db('controller_list',"controlid='"+device.serial+"' and btn="+device.btn,function(controller){
                if(controller.rowCount == 1)
                {
                    for(let i=1;i<=device.btn;i++)
                    {
                        db.delete_db('controller',"controlid='"+device.serial+"'and position="+i,function(err){
                            if(err != null)
                            {console.log(err);}
                        });
                    }
                    db.delete_db('controller_list',"controlid='"+device.serial+"'",function(err){
                        if(err != null)
                        {console.log(err);}
                    });
                    console.log(JSON.stringify(device)+"remove completed");
                    socket.emit("server-sent-success","remove_device");
                }
                else{
                    console.log("Serial does not exists or does not match with button!");
                    socket.emit("server-sent-fail","remove_device");
                }
            });

            db.read_db('devicemanagement',"controlid='"+device.serial+"'",function(devicemanagement){
                if(devicemanagement.rowCount == 1)
                {

                        db.delete_db('devicemanagement',"controlid='"+device.serial+"'",function(err){
                            if(err != null)
                            {console.log(err);}
                        });
                        console.log("Serial remove completed in devicemanagement");

                }
                else{
                     console.log("Serial does not exists in devicemanagement!");   
                }
            });
        }
        else{
            console.log("Device name is incorrect!");
            socket.emit("server-sent-fail","device");
        }
    });
    
    socket.on("client-sent-edit-ota",function(ota){
        if(ota.ota == "ota")
        {
            db.update_db('ota',ota.type+"='"+ota.data+"'","name='"+ota.ota+"'",function(err){
                if(err == null)
                {
                    console.log(JSON.stringify(ota)+" edit ok");
                    socket.emit("server-sent-success","ota");
                }
                else{console.log(err)}
            });
           
        }
        else{
            console.log("OTA name is incorrect!");
            socket.emit("server-sent-fail","ota");
        }
    });

});


app.get("/",function(req,res){
    if(req.isAuthenticated())
    {
        res.render("index",{user:req.user.name});
    }
    else
    {res.render("login");}   
});

app.get("/setting",function(req,res){
    if(req.isAuthenticated())
    {
        res.render("setting",{user:req.user.name});
    }
    else
    {res.render("login");}   
});


app.get("/login",function(req,res){
    if(req.isAuthenticated()){
        res.render("index",{user: req.user.name});
    }
    else
    {res.render("login");}
   
});

app.get("/logout",function(req,res){
    req.session.destroy();
    res.render("login");
});


app.post("/login",passport.authenticate('local',{
    
    failureRedirect: '/login',
    successRedirect: '/'

}));


 passport.use(new localStrategy(
    function(username,password,done){
        
        db.read_db('administrator'," name='"+username+"' and pass='"+password+"'", function(administrator){
            
            if(administrator.rowCount==0)
            {  
                console.log("username & password fail!"); 
                return done(null, false);                                      
            } 
            if(administrator.rowCount==1)
            {   
                console.log("username & password ok");
                return done(null,{name:username,pass:password});                                            
            }         
        });

    }
));

passport.serializeUser(
    function(user,done){
        done(null,user);
    }
);

passport.deserializeUser(
    function(usr,done){
        db.read_db('administrator'," name='"+usr.name+"' and pass='"+usr.pass+"'", function(administrator){
            
            if(administrator.rowCount==0)
            {return done(null, false);} 
            if(administrator.rowCount==1)
            {return done(null,usr);}
                                                 
        });
    }
);
