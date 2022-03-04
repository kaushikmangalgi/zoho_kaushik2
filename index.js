
const express = require('express');
var bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

var User = require("./models/userModel");
var Contacts = require("./models/contactModel");
const app = express();
app.use(express.json())
app.use(cors({ credentials: true, origin: true }));

app.get("/", function (req, res) {
    res.send("hello")
});

app.post("/signup", async(req, res) => {
    const { email, password, secret } = req.body;
    
    if (!email || !password || !secret) {
        return res.status(422).json({ Error: "Input fields Can not be empty" });
    }

    try {
        const userExists = await User.findOne({ email: email });
        if(userExists) {
            return res.status(422).json({error:"Email already Exist"});
        }
        else {
            const pass = await password.concat(secret);
            const user = new User({ email, password, secret });
            user.password = await bcrypt.hash(pass, 10);
            console.log(pass);
            await user.save();
            return res.status(201).json({ message: "User registered Successfully" });
        }
    }
    catch (err) {
        console.log(err);
    }
    
    res.send("hello")
});


app.post("/signin", async (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ Error: "Please enter email & password !" });
    }
    try {
        
    
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(422).json({ error: "Email Does Not Exist" });
        }
        else {
            const secret = user.secret;
            const pass = password.concat(secret);
            const token = user._id.toString();
            const isMatch = bcrypt.compareSync(pass, user.password);
            
            if (!isMatch) {
                console.log(pass);
                console.log(user.password);
                return res.status(422).json({ error: "Invalid password! please try again." });
            }
            else {
                return res.status(200).json({
                    email: user.email,
                    accessToken: token,
                    id:user._id,
                    message: "Login Successfully!"
                });
                
            }
            // res.cookie("accessToken", token, {
            //     expires: new Date(Date.now() + 25892000000),
            //     httpOnly: true
            // });
            
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.post("/getContacts", async (req, res) => {

    const { user_id } = req.body;

    try {
    
        const contacts = await Contacts.find({ user_id: user_id });
        if (!contacts) {
            res.send("No contacts found")
        }
        else {
            console.log({ contacts });
            console.log(user_id);
            res.json({ contacts });
        }
        
    }
    catch(err) {
        console.log(err);
        res.send(err);
    }
    
});


app.post("/addContact", async (req, res) => {
    //621b586086ea792ef2fd24c4
    
    const { user_id, name, email, phone } = req.body;

    try {
       
        if (!email || !phone || !name) {
            return res.status(422).json({ Error: "Input fields Can not be empty" });
        }
        else if (!user_id) {
            return res.status(422).json({ Error: "Login to save contact" });
        }
        else {
            const user = await User.findById({ _id: user_id });
            const contact = new Contacts({ user_id , name, email, phone,});
            contact.user_id = user_id;
            await contact.save();
            return res.status(201).json({ message: "Contact added sucessfully" });
            
        }
    }
    catch (err) {
        console.log(err);
    }
   
});




app.listen(8080,() => console.log('Server is running on  port 8080'))