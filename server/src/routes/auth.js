const express = require('express');
const router = express.Router();
const {
   isAuthenticatedUser,
   authorizeRole,
} = require('../app/middlewares/auth');

const UserController = require('../app/controllers/UserController');

// If route Matching Call UserController and call Function in UserController.

//Register
router.post('/register', UserController.register);
//Login
router.post('/login', UserController.login);
//Logout
router.get('/logout', UserController.logout);
// Forget Password
router.post('/password/forget', UserController.forgetPassword);
//Reset Password
router.put('/password/reset/:token', UserController.resetPassword);
//Update Password
router.put(
   '/password/update',
   isAuthenticatedUser,
   UserController.updatePassword,
);
//Get User Detail
router.get('/details', isAuthenticatedUser, UserController.getUserDetails);




// Update Profile by PUT
router.put(
   '/details/update',
   isAuthenticatedUser,
   UserController.updateProfile,
);
// Get All User
router.get(
   '/admin/users',
   isAuthenticatedUser,
   authorizeRole('admin'),
   UserController.getAllUser,
);

// Get Detail Once User
router.get(
   '/admin/user/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   UserController.getSingleUser,
);

//Delete User by Admin
router.delete(
   '/admin/delete/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   UserController.deleteUser,
);

// Update User by Admin
router.put(
   '/admin/update/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   UserController.updateUserAdmin,
);
// router.get('/details/:id', UserController.detailsProduct);
// router.get('/', UserController.getAllProduct);

module.exports = router;
