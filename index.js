const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // which folder are use for storing a file , file = which are try a user for uploding a server
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // which name are use for storing a file in uplodes folder.
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${Date.now()}-${file.originalname}`);
    // cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/uplode", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`server start at port : ${PORT}`);
});

