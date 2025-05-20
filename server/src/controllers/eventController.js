const eventModel = require("../models/eventModel");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.findAll();
    res.status(200).json({ events });
  } catch (error) {
    console.error("Błąd pobierania eventów:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

const createEvent = async (req, res) => {
  try {
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const event = {
      ...req.body,
      photo,
      organizer_id: req.user.id,
    };

    const eventData = req.body;

    if (!eventData.title || !eventData.date || !eventData.organizer_id) {
      return res.status(400).json({ message: "Brak wymaganych pól" });
    }

    const newEvent = await eventModel.create(eventData);
    res.status(201).json({ event: newEvent });
  } catch (error) {
    console.error("Błąd tworzenia eventu:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
};
