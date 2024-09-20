const Appointment = require("../model/appointment");
const Razorpay = require("razorpay");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_n5oTuMseyDclhS",
  key_secret: "eR0Agm0HEGChnUp5Oi1mqUWc",
});

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const {
      customerName,
      date,
      timeslot,
      platform,
      amount,
      currency,
      consult_id,
      consultName,
    } = req.body;

    const userId = req.user._id;
    const email = req.user.email;
    const myemail = "indiaglobal@gmail.com";

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Amount in paisa
      currency,
      receipt: `receipt_order_${new Date().getTime()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create new appointment with Razorpay order ID
    const newAppointment = new Appointment({
      user: userId,
      customerName,
      date,
      timeslot,
      platform,
      razorpayOrderId: razorpayOrder.id,
      consult_id,
      consultName,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json({ appointment: savedAppointment, razorpayOrder });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single appointment by ID
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { customerName, date, timeslot, platform } = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { customerName, date, timeslot, platform },
      { new: true, runValidators: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
