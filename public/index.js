//var socket = io("http://192.168.1.6:2000");
var socket = io("http://14.225.254.121:100");


$(document).ready(function(){ 
    socket.emit("client-sent-user");
    
    socket.on("server-sent-registation",function(data){
        var list = document.getElementById("registation");

        var lablel =  document.createElement("div"); 
        lablel.setAttribute('style',"text-align: center; color:teal; width:100%; margin-bottom: 10px; color #326ba8;");
        lablel.appendChild(document.createTextNode("Acount information"));
        
        var tb = document.createElement("table"); 
        tb.setAttribute('style',"background-color: whitesmoke; margin: auto;width: 90%; border: 1px solid #326ba8;");
        
        var tr = document.createElement("tr");
        tr.setAttribute('style',"border-bottom:1px solid #326ba8;");
        var userlb = document.createElement("td");
        userlb.setAttribute('style',"width: 80px; text-align: center; color:#8a288a; border-right: 1px solid #326ba8;");
        userlb.appendChild(document.createTextNode("Username"));
        var maillb = document.createElement("td");
        maillb.setAttribute('style',"text-align: center; color:#8a288a; border-right: 1px solid #326ba8;");
        maillb.appendChild(document.createTextNode("Mail"));

        tr.appendChild(userlb)
        tr.appendChild(maillb)
        tb.appendChild(tr)
        list.appendChild(lablel);
        list.appendChild(tb);

        data.forEach(function(data){ 
            
            var regtr = document.createElement("tr");
            regtr.setAttribute('style',"border-bottom:1px solid #326ba8;");
            var user = document.createElement("td");
            user.setAttribute('style',"width: 80px; text-align: center; border-right: 1px solid #326ba8;");
            user.appendChild(document.createTextNode(data.name));
            var mail = document.createElement("td");
            mail.setAttribute('style',"text-align: center;-ms-word-break: break-all; word-break: break-all; border-right: 1px solid #326ba8;");
            mail.appendChild(document.createTextNode(data.mail));
            
            regtr.appendChild(user)
            regtr.appendChild(mail)
            tb.appendChild(regtr)
            list.appendChild(tb);

        });

    });
    socket.on("server-sent-controller_list",function(data){

        var list = document.getElementById("controllerlist");

        var lablel =  document.createElement("div"); 
        lablel.setAttribute('style',"text-align: center; color:teal; width:100%; margin-bottom: 10px; color #326ba8;");
        lablel.appendChild(document.createTextNode("Device list"));
        
        var tb = document.createElement("table"); 
        tb.setAttribute('style',"background-color: whitesmoke; margin: auto;width: 90%; border: 1px solid #326ba8;");
        
        var tr = document.createElement("tr");
        tr.setAttribute('style',"border-bottom:1px solid #326ba8;");
        var seriallb = document.createElement("td");
        seriallb.setAttribute('style',"width: 80px; text-align: center; color:#8a288a; border-right: 1px solid #326ba8;");
        seriallb.appendChild(document.createTextNode("Serial"));
        var btnlb = document.createElement("td");
        btnlb.setAttribute('style',"text-align: center; color:#8a288a; border-right: 1px solid #326ba8;");
        btnlb.appendChild(document.createTextNode("Button type"));

        tr.appendChild(seriallb)
        tr.appendChild(btnlb)
        tb.appendChild(tr)
        list.appendChild(lablel);
        list.appendChild(tb);

        data.forEach(function(data){ 
            var devtr = document.createElement("tr");
            devtr.setAttribute('style',"border-bottom:1px solid #326ba8;");
            var serial = document.createElement("td");
            serial.setAttribute('style',"width: 80px; text-align: center; border-right: 1px solid #326ba8;");
            serial.appendChild(document.createTextNode(data.controlid));
            var btn = document.createElement("td");
            btn.setAttribute('style',"text-align: center; border-right: 1px solid #326ba8;");
            btn.appendChild(document.createTextNode(data.btn));
            
            devtr.appendChild(serial)
            devtr.appendChild(btn)
            tb.appendChild(devtr)
            list.appendChild(tb);

        });

    });
    socket.on("server-sent-update",function(data){

        var list = document.getElementById("update");

        var lablel =  document.createElement("div"); 
        lablel.setAttribute('style',"text-align: center; color:teal; width:100%; margin-bottom: 10px; color #326ba8;");
        lablel.appendChild(document.createTextNode("OTA"));
        
        var tb = document.createElement("table"); 
        tb.setAttribute('style',"background-color: whitesmoke; margin: auto;width: 90%; border: 1px solid #326ba8;");
        
        var tr = document.createElement("tr");
        tr.setAttribute('style',"border-bottom:1px solid #326ba8;");
        var otalb = document.createElement("td");
        otalb.setAttribute('style',"width: 40px; text-align: center; color:#8a288a; border-right: 1px solid #326ba8;");
        otalb.appendChild(document.createTextNode("Name"));
        var verlb = document.createElement("td");
        verlb.setAttribute('style',"width: 40px; text-align: center; color:#8a288a; border-right: 1px solid #326ba8;");
        verlb.appendChild(document.createTextNode("Version"));
        var filelb = document.createElement("td");
        filelb.setAttribute('style',"text-align: center; color:#8a288a; border-right: 1px solid #326ba8;");
        filelb.appendChild(document.createTextNode("File"));

        tr.appendChild(otalb)
        tr.appendChild(verlb)
        tr.appendChild(filelb)
        tb.appendChild(tr)
        list.appendChild(lablel);
        list.appendChild(tb);

        data.forEach(function(data){ 

            var OTAtr = document.createElement("tr");
            OTAtr.setAttribute('style',"border-bottom:1px solid #326ba8;");
            var nameota = document.createElement("td");
            nameota.setAttribute('style',"width: 30px; text-align: center; border-right: 1px solid #326ba8;");
            nameota.appendChild(document.createTextNode(data.name));
            var version = document.createElement("td");
            version.setAttribute('style',"width: 30px; text-align: center; border-right: 1px solid #326ba8;");
            version.appendChild(document.createTextNode(data.version));
            var file = document.createElement("td");
            file.setAttribute('style',"-ms-word-break: break-all; word-break: break-all; border-right: 1px solid #326ba8;");
            file.appendChild(document.createTextNode(data.file));
            
            OTAtr.appendChild(nameota)
            OTAtr.appendChild(version)
            OTAtr.appendChild(file)
            tb.appendChild(OTAtr)
            list.appendChild(tb);


        });

    });
});

