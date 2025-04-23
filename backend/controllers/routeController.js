const {trafficGraph} = require("../algo3")
const Event = require("../models/Events")

const getroute = async(req,res)=>{
    try{
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); 

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); 

        const events = await Event.find({
        dateofevent: {
            $gte: todayStart,
            $lte: todayEnd,
        },
        });

        let isTodayEvent = 0;
        if(events.length>0){
            isTodayEvent = 1;
        }

        const isWeekday = (date = new Date()) => date.getDay() % 6 === 0;
        const weekday = isWeekday();
        const data = 0;
        if(weekday===true){
            data = 1;
        }
        const {To,From} = req.body;
        const route = trafficGraph.processVehicle(To,From,12,data,isTodayEvent)
        console.log(route);
        res.send({route});
    }catch(err){
        res.status(500).json({ 
            message: 'Server error',
            error: err.message 
          });
    }
}

module.exports = {getroute};