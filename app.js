var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose   = require("mongoose"),
    methodOverride = require("method-override");

//APP CONFIG
//mongoose.connect("mongodb://localhost/student_app");
mongoose.connect("mongodb://jerry:jeremiah@ds241025.mlab.com:41025/studentresource");

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
var studentSchema = new mongoose.Schema({
   name: String,
   age: Number,
   passport: String,
   sex: String,
   created: {type: Date, default: Date.now}
});

var Student = mongoose.model("Blog", studentSchema);

// Student.create({
//     name: "Jerry",
//     age: 24,
//     sex: "Male",
//     passport: "data:image/jpeg;base64,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"
// });

//RESTFUL ROUTES
app.get("/", function(req, res) {
   res.redirect("/students");
});

//INDEX ROUTE
app.get("/students", function(req, res){
    Student.find({}, function(err, students){
       if(err){
           console.log("ERROR!");
       } else {
           res.render("index", {students: students});    
       }
    });
});

//NEW ROUTE
app.get("/students/new", function(req, res) {
   res.render("new"); 
});

//CREATE ROUTE
app.post("/students", function(req, res){
   //create new student
   req.body.student.name = req.sanitize(req.body.student.name);
   Student.create(req.body.student, function(err, newStudent){
      if(err){
          res.render("new");
      } else {
          //then redirect to the index
          res.redirect("/students");
      }
   });
});

//SHOW ROUTE
app.get("/students/:id", function(req, res) {
    Student.findById(req.params.id, function(err, foundStudent){
       if(err){
           res.redirect("/students");
       } else {
           res.render("show", {student: foundStudent});
       }
    });
});

//EDIT ROUTE
app.get("/students/:id/edit", function(req, res) {
    Student.findById(req.params.id, function(err, foundStudent){
       if(err){
           res.redirect("/students");
       } else {
           res.render("edit", {student: foundStudent});    
       }
    });
});

//UPDATE ROUTE
app.put("/students/:id", function(req, res){
    req.body.student.name = req.sanitize(req.body.student.name);
   Student.findByIdAndUpdate(req.params.id, req.body.student, function(err, updatedStudent){
      if(err){
          res.redirect("/students")
      } else {
          res.redirect("/students/" + req.params.id);
      }
   });
});

//DELETE ROUTE
app.delete("/students/:id", function(req, res){
   Student.findByIdAndRemove(req.params.id, function(err){
       //destroy student resource
       if(err){
           res.redirect("/students");
       } else {
           res.redirect("/students");
       }
   }); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("StudentsApp Server has started!");
});