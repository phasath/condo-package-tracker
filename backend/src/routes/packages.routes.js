const router = require("express").Router();
const multer = require("multer");
const auth = require("../middlewares/auth");
const controller = require("../controllers/packages.controller");

const upload = multer({ dest: "src/uploads" });

router.post("/", auth, upload.single("photo"), controller.create);
router.get("/", auth, controller.list);
router.post("/:id/deliver", auth, controller.deliver);

module.exports = router;
