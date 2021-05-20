const express = require ("express");
const router = express.Router();

const apiUsersController = require ("../../controllers/api/usersController");

router.get("/", apiUsersController.allUsers);
router.get("/:id", apiUsersController.userId);

module.exports = router;