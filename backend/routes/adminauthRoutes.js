const express = require("express");
const Venue = require("../models/Venue");
const Photo = require("../models/Photo");
const cors = require("cors");
const { registerAdmin, loginAdmin, getLogout_admin, getProfile_admin, getbookvenuelistadmin } = require("../controllers/adminauthcontrollers");
const { registerVenue, getVenue, updatePrice } = require("../controllers/addvenuecontrollers");


const router = express.Router();
router.use(
    cors({
        credentials: true,
        origin: ["http://localhost:5174", "http://localhost:5173","http://localhost:8888"]
    })
)

router.post("/register_admin", registerAdmin)
router.post("/register_venue", registerVenue)
router.post("/update_price", updatePrice)
router.post("/login_admin", loginAdmin)
router.get("/profile_admin", getProfile_admin)
router.get("/logout_admin", getLogout_admin)
router.get("/get_venue", getVenue)
router.get('/bookvenuelistadmin', getbookvenuelistadmin)

const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images")
    },
    filename: (req, file, cb) =>{
        cb(null,file.fieldname + "_"+Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})
router.post("/upload", upload.single("file"), async (req,res) =>{
    const id = req.query.param;
    const venue = await Venue.findOne({admin_id:id});
    const venue_id = venue.venue_id;
    const image = await Photo.findOne({venue_id:venue_id});
    try {
        if(!image){
            await Photo.create({
                img: req.file.filename,
                venue_id: venue_id
            })
            return res.json(venue);
        } else{
            await Photo.updateOne({venue_id:venue_id},{
                img: req.file.filename,
                venue_id: venue_id
            })
            return res.json(image);
        }
        
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
})
router.post("/remove", async (req,res) =>{
    const id = req.query.param;
    const venue = await Venue.findOne({admin_id:id});
    const venueid = venue.venue_id;
    const image = await Photo.findOne({venue_id:venueid});
    const filenot = "Photo_not_found.jpg";
    const alreadyimg = image.img;
    try {
       if(!(alreadyimg == filenot)){
        await Photo.updateOne({venue_id:venueid},{
            img: filenot,
            venue_id: venueid
        })
        return res.json(image);
       } else{
        return res.status(500).json({ error: "Image has not added yet." });
       }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
})



module.exports = router