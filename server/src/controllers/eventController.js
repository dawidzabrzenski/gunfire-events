const eventModel = require("../models/eventModel");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error("Błąd pobierania eventów:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

const getEventsByParams = async (req, res) => {
  try {
    const params = req.query;
    const result = await eventModel.findByParams(params);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Brak parametru id" });
    }

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Niepoprawny format id" });
    }

    const event = await eventModel.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event nie znaleziony" });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error("Błąd pobierania eventów:", error);
    return res.status(500).json({ message: "Błąd serwera" });
  }
};

const createEvent = async (req, res) => {
  try {
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const eventData = {
      ...req.body,
      image_url: req.file ? `/uploads/${req.file.filename}` : null,
      organizer_id: req.user.id,
    };

    if (!eventData.title || !eventData.date) {
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
  getEventsByParams,
  getAllEvents,
  getEventById,
};
