const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('67ce6b82875473a2c1828203')
    .then(user => {
      if (!user) {
        console.log("User not found");
        return next(); 
      }
      req.user = user;
      next();
    })
    .catch(err => {
      console.error("Error fetching user:", err);
      next(err); 
    });
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect("mongodb+srv://jithinraja4:Jithin%4099@cluster0.fpop2.mongodb.net/shops?retryWrites=true&w=majority&appName=Cluster0"
).then(result=>
{
   User.findOne().then(
    user=>{
      if(!user){
        const user = new User({
          name:"Jithin",
          email:"test@123.com",
          cart:{
            items:[]
          }
        });
        user.save();
      }
    }
  );
  
  console.log("connected");
  app.listen(3000);
}
).catch(err=>{
  console.log(err);
})