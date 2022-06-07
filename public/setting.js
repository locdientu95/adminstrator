//var socket = io("ws://192.168.1.6:2000");
var socket = io("http://14.225.254.121:100");


function add_usr(){
    if($("#usr").val() != "" && $("#pwd").val() != "" && $("#mail").val() != "")
    {socket.emit("client-sent-add-user",{usr:$("#usr").val(),pwd:$("#pwd").val(),mail:$("#mail").val()})}
    else{alert("[Add User] please fill in all the information!")}
}

function remove_usr(){
    if($("#usr").val() != ""  && $("#mail").val() != "")
    {socket.emit("client-sent-remove-user",{usr:$("#usr").val(),mail:$("#mail").val()})}
    else{alert("[Remove User]Please fill in username and mail!")}
}

function add_device(){
    if($("#device").val() != "" && $("#serial").val() != "")
    {socket.emit("client-sent-add-device",{device:$("#device").val(),serial:$("#serial").val(),btn:parseInt($("#btn").val())})}
    else{alert("[Add Device] please fill in all the information!")}
}

function remove_device(){
    if($("#device").val() != "" && $("#serial").val() != "")
    {socket.emit("client-sent-remove-device",{device:$("#device").val(),serial:$("#serial").val(),btn:parseInt($("#btn").val())})}
    else{alert("[Remove Device] please fill in all the information!")}
}

function edit(){
    if($("#ota").val() != "" && $("#data").val() != "")
    {socket.emit("client-sent-edit-ota",{ota:$("#ota").val(),type:$("#type").val(),data:$("#data").val()})}
    else{alert("[EDIT] please fill in all the information!")}
}

$(document).ready(function(){ 
    socket.on("server-sent-fail",function(data){
        if(data == "add_user")
        {alert("Account already exists!");}
        if(data == "mail")
        {alert("Mail already exists!");}
        if(data == "remove_user")
        {alert("Account/Email does not match/ exist!");}
        if(data == "device")
        {alert("Device name is incorrect!");}
        if(data == "add_device")
        {alert("Serial already exists!");}
        if(data == "remove_device")
        {alert("Serial does not exists or does not match with button!");}
        if(data == "ota")
        {alert("OTA name is incorrect!");}
    });
    socket.on("server-sent-success",function(data){
        if(data == "add_user")
        {alert("Account successfully created!");}
        if(data == "remove_user")
        {alert("Account successfully deleted!");}
        if(data == "add_device")
        {alert("Device successfully created!");}
        if(data == "remove_device")
        {alert("Device successfully deleted!");}
        if(data == "ota")
        {alert("OTA successfully updated!");}
    });
});

