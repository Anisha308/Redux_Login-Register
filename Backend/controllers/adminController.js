import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateTokenAdmin from "../utils/generateTokenAdmin.js";
import destroyAdminToken from "../utils/destroyAdminToken.js";
import {
  fetchAllUsers,
  
} from "../helpers/adminHelpers.js";

const authAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        generateTokenAdmin(res, admin._id)
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email:admin.email
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid email or password')
    }
})

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, key } = req.body

const adminExist=await Admin.findOne({email})

    if (adminExist) {
        res.status(400);
        throw new Error('admin already exists')
    }

    console.log(key, 'keyy');
    if (key !== process.env.ADMIN_KEY) {
        res.status(401);
        throw new Error('Invalid key')
    }
    const admin = await Admin.create({
        name,
        email,
        password
    })
    
    if (admin) {
        generateTokenAdmin(res, admin._id)
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email:admin.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid admin data')
    }

})



const logoutAdmin = asyncHandler(async (req, res) => {
 destroyAdminToken(res)
    res.status(200).json({ message: "Logged out successfully" });


})

const getAllUsers = asyncHandler(async (req, res) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      console.log(error);
    });
});

 const updateUserData = asyncHandler(async (req, res) => {
   console.log("new");
   const userId = req.body.userId;
   const name = req.body.name;
   const email = req.body.email;

   if (!userId) {
     res.status(404);

     throw new Error("UserId not received in request. User update failed.");
   }

   const userData = { userId: userId, name: name, email: email };

   const usersUpdateStatus = await updateUser(userData);

   if (usersUpdateStatus.success) {
     const response = usersUpdateStatus.message;

     res.status(200).json({ message: response });
   } else {
     res.status(404);

     throw new Error("User update failed.");
   }
 });


const deleteUserData = asyncHandler(async (req, res) => {
  const userId = req.body.userId;

  const usersDeleteStatus = await deleteUser(userId);

  if (usersDeleteStatus.success) {
    const response = usersDeleteStatus.message;

    res.status(200).json({ message: response });
  } else {
    res.status(404);

    const response = usersDeleteStatus.message;

    throw new Error(response);
  }
});

export {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAllUsers,
  deleteUserData,
  updateUserData,
};