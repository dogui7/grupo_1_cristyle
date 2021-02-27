const express = require ("express");
const router = express.Router();

const testsController = require ("../controllers/testsController");

router.get('/1', testsController.t1); 
router.get('/2', testsController.t2); 
router.get('/3', testsController.t3); 
router.get('/4', testsController.t4); 
router.get('/5', testsController.t5); 
router.get('/6', testsController.t6); 
router.get('/7', testsController.t7); 
router.get('/8', testsController.t8); 
router.get('/9', testsController.t9);

module.exports = router;