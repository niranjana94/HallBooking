var express = require('express');
var router = express.Router();

var {rooms} = require("../common/data")
var {users} = require("../common/data")

router.get('/',function(req,res){
    res.json(rooms);
})

router.post('/',function(req,res){

    var roomdetails = {
        id:rooms.length+1,
        name:req.body.name,
        seatcount:req.body.seatcount,
        amenties:req.body.amenties,
        price:req.body.price,
        bookingstatus:req.body.status
    };
    rooms.push(roomdetails);

    res.json({
        message:'room created',
        roomId : roomdetails.id
    })

})

/*router.get('/:id',function(req,res){
    if(rooms[req.params.id - 1]){
        res.json(rooms[req.params.id - 1]);
    }
    else
    {
        res.json({
            message:'No Data'
        })
    }

})*/


/*router.put('/:id', function (req, res) {
    if(rooms[req.params.id-1]) 
    {      
       if(req.body.name)
        rooms[req.params.id-1].name= req.body.name;  
       if(req.body.amenties)
        rooms[req.params.id-1].amenties= req.body.amenties; 
       if(req.body.price)
        rooms[req.params.id-1].price= req.body.price; 
        if(req.body.status)
         rooms[req.params.id-1].bookingstatus= req.body.status; 
        res.json({
            message:'updated',
            roomId:rooms[req.params.id-1].id
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
    let roomsdet = rooms.find((room)=>room.id == req.params.id);
    let roomindex = rooms.indexOf(roomsdet);
    rooms.splice(roomindex,1);
    res.json({
        message:'deleted'
    })
})*/

router.get('/booked',function(req,res){
    let roomdet = rooms.find((room)=>room.bookingstatus == 'booked');
    console.log(roomdet);
    console.log(req);
    var result = [];
    rooms.forEach((item)=>{
        var obj ={}
    let bookedusers = users.find((user)=>user.roomId == item.id);

    let userindex = users.indexOf(bookedusers);
    obj['CustomerName'] = users[userindex].name;
    obj['RoomName'] = item.name;
    obj['Date'] = users[userindex].date;
    obj['starttime'] = users[userindex].starttime;
    obj['endtime'] = users[userindex].endtime;
    result.push(obj);
    })
   
    res.json(result);   

})

module.exports = router;
