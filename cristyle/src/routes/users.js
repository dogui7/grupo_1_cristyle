const express = require ("express");
const router = express.Router();
const multer = require ('multer');

const usersController = require ("../controllers/usersController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/usuarios'));    //Aquí deben indicar donde van a guardar la imagen
    },
    filename: function (req, file, cb) {
      cb(null, 'foto' + '-' + Date.now()+ path.extname(file.originalname));      
    }
  })
   
const upload= multer({ storage });

router.get("/login", usersController.login);
router.get("/register", usersController.register);

module.exports = router;