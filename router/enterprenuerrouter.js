const router = require("express").Router();

const {
  sendInterest,
  getCurrentUser,
  editProfile,
  getAllInvestors,
  deleteentrepreneur,
  getInvestorById,
  sendMessageToInvestor,
  getMessagesWithInvestor,
  getMessagesByRoomId,
  getConsults,
} = require("../controller/enterprenuercontroller");
const { middleware } = require("../middleware/jwtmiddleware");

router.get("/currentuser", getCurrentUser);
router.patch("/editprofile", editProfile);
router.delete("/deleteuser", deleteentrepreneur);
router.get("/investors", getAllInvestors);
router.get("/investor/:id", getInvestorById);
router.post("/send-message/:investorId", middleware, sendMessageToInvestor);
// router.get('/messages/:roomId', getMessagesWithInvestor);
router.get("/express-interest/:investorId", middleware, sendInterest); //send email notification

router.get("/:roomId", getMessagesByRoomId);

router.get("/consults/all", getConsults);

module.exports = router;
