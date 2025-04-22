const Event = require("../models/Events");  // Capitalized model name by convention

const setEvent = async (req, res) => {
  try {
    const dateString = req.body.dateofevents; // e.g., "2025-04-23T03:24:00.000Z"
    const dateObj = new Date(dateString);

    if (isNaN(dateObj)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Set to start of the day

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // Set to end of the day

    const events = await Event.find({
      dateofevent: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    });

    if(events){
        return  res.send({ message: "Event already exists" });
    }

    const event = new Event({ dateofevent: dateObj }); // Use capitalized Event here
    await event.save();

    res.send({ message: "Event added successfully" }); res.send({ message: "Event added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};




const getAllEvents = async (req, res) => {
    try {
        // Get current date in IST
        const now = new Date();
        // Set to start of today (00:00:00.000)
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);
    
        // Query for events today and after
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
      const { date } = req.body; // Expecting a date string like "2025-04-23"
  
      // Convert the date string to Date objects representing the start and end of the day
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
  
      // Delete all events where dateofevent is between start and end of that day
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
