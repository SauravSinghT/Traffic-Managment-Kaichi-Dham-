const Event = require("../models/Events");  
const setEvent = async (req, res) => {
  try {
    const dateString = req.body.date; 
    console.log("Received date:", req.body);

    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    
    const dayStart = new Date(dateObj);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dateObj);
    dayEnd.setHours(23, 59, 59, 999);

    
    const existingEvents = await Event.find({
      dateofevent: { $gte: dayStart, $lte: dayEnd },
    });

    if (existingEvents.length > 0) {
      return res.status(409).json({ message: "Event already exists for this date" });
    }

    
    const event = new Event({ dateofevent: dateObj });
    await event.save();

    return res.status(201).json({ message: "Event added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};




const getAllEvents = async (req, res) => {
    try {
        
        const now = new Date();
        
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);
    
        
        const events = await Event.find({
          dateofevent: { $gte: startOfToday }
        }).sort({ dateofevent: 1 });
    
        res.status(200).json(events);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
      }
  };


  const deleteEventsByDate = async (req, res) => {
    try {
      
      const {date} = req.body;
      
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
  
      
      const result = await Event.deleteMany({
        dateofevent: { $gte: startOfDay, $lte: endOfDay },
      });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "No events found for the given date" });
      }
  
      res.json({
        message: `${result.deletedCount} event(s) deleted successfully`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  


module.exports = { setEvent,getAllEvents,deleteEventsByDate };
