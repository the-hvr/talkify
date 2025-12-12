
const express = require("express");
const { url } = require("inspector");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;

const {v4 : uuidv4} = require(`uuid`);
const methodOverride = require('method-override');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// ---- set ejs as the templete engine ---- 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ---- serving static files from public folder ---- 
app.use(express.static(path.join(__dirname, "public")));


// ---- middleware to handle form data ---- 
app.use(express.urlencoded({extended : true}));
app.use(express.json());


// ---- import database ---- 
const talkifys = require("./database/index.js");


// ---- Multer config ----
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    // keep original name or use Date.now() to avoid collisions
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// ----  serve uploaded images at /uploads ---- 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.redirect("/talkify");
});

//home route
app.get("/talkify", (req, res) => {
    res.render("index.ejs", {talkifys});
});

//form route
app.get("/talkify/new", (req, res) => {
    res.render("form.ejs");
});

//post route
app.post("/talkify", upload.array('images'), (req, res) => {
    let images = req.files.map(file => file.filename);
    let { username, heading, talk } = req.body;

    let id = uuidv4();

    const newTalkify = {
        id, 
        username,
        heading,
        likes : 0,
        talk,
        images,
        comments: []
    }

    talkifys.unshift(newTalkify);
    res.redirect("/talkify");
});

// GET view single post
app.get("/talkify/:id", (req, res) => {
  let {id} = req.params;
  let post = talkifys.find((p) => id === p.id );
  res.render("view.ejs", {post}, );
});

// POST add comment to post
app.post("/talkify/:id/comments", (req, res) => {
  let {id} = req.params;
  let {username, comment} = req.body;

  let post = talkifys.find((p) => id === p.id);
  if(!post){
    return res.status(404).send("page not found");
  }

  let newComment = {
    id : uuidv4(),
    username,
    comment
  }

  console.log(newComment);
  post.comments.unshift(newComment);
  res.redirect(`/talkify/${id}`);
});

// DELETE remove comment from post
app.delete("/talkify/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  
  // find the post
  let post = talkifys.find( (p) => p.id === postId );
  if (!post) {
    return res.status(404).send("POST NOT FOUND! ERROR 404");
  }

  //remove comment
  post.comments = post.comments.filter( (c) => c.id !== commentId );

  //redirect back to comment post
  res.redirect(`/talkify/${postId}`);
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}/talkify`);
});
