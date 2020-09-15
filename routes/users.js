var express = require('express');
var router = express.Router();

var {users} = require("../common/data")
var {rooms} = require("../common/data")

router.get('/',function(req,res){
    res.json(users);
})

router.post('/',function(req,res){
    var userdetails = {
        id:users.length+1,
        name:req.body.name,
        date:req.body.date,
        starttime :req.body.starttime,
        endtime : req.body.endtime,
        roomId:req.body.roomId
    };
    users.push(userdetails);

    var bookedroom = rooms.find((room)=>room.id == req.body.roomId);

    var roomindex = rooms.indexOf(bookedroom);
    rooms[roomindex.bookingstatus]='Booked';


    res.json({
        message:'user created',
        userId : userdetails.id
    })

})

router.get('/customers',function(req,res){
  var result =[];
  users.forEach((user)=>{
    var obj={}
    let bookedusers = rooms.find((room)=>room.id == user.roomId);

    let roomindex = rooms.indexOf(bookedusers);
    obj['RoomName'] = rooms[roomindex].name;
    obj['Status'] = rooms[roomindex].bookingstatus;
    obj['customerName'] = user.name;
    obj['date'] = user.date;
    obj['starttime'] = user.starttime;
    obj['endtime'] = user.endtime;

    result.push(obj);

  })
  res.json(result);
})

/*router.get('/:id',function(req,res){
    if(users[req.params.id - 1]){
        res.json(users[req.params.id - 1]);
    }
    else
    {
        res.json({
            message:'No Data'
        })
    }

})


router.put('/:id', function (req, res) {
    if(users[req.params.id-1]) 
    {      
       if(req.body.name)
       users[req.params.id-1].name= req.body.name;  
       if(req.body.date)
       users[req.params.id-1].date= req.body.date; 
       if(req.body.starttime)
       users[req.params.id-1].starttime= req.body.starttime; 
        if(req.body.endtime)
        users[req.params.id-1].endtime= req.body.endtime;
        if(req.body.roomId)
        users[req.params.id-1].roomId= req.body.roomId; 
        res.json({
            message:'updated',
            userId:users[req.params.id-1].id
    })
    }
    else
    {
        res.json({
            message:'No data available'
        })
    }

  })

router.delete('/:id',function(req,res){
    let userdet = users.find((user)=>user.id == req.params.id);
    let userindex = users.indexOf(userdet);
    users.splice(userindex,1);
    res.json({
        message:'deleted'
    })
})*/


module.exports = router;
