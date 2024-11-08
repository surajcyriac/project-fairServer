const express =require ('express')
const userController=require('../controllers/userController')
const  ProjectController  = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multermiddleware')
const router= new express.Router()

// register post
router.post('/register',userController.registerController)  
// login  post
router.post('/login',userController.loginController)  
// add project + applying middleware
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectimg'),ProjectController.addProjectController)
// homeproject : /home-project
router.get('/home-project',ProjectController.homePageProjectController) 
// allproject : /all-project
router.get('/all-project',jwtMiddleware,ProjectController.allProjectController) 
// allUserproject : /all-project
router.get('/user-project',jwtMiddleware,ProjectController.userProjectController) 
// edit project + applying middleware  path= localhost-3000/project/id/edit
router.put(`/projects/:id/edit`,jwtMiddleware,multerMiddleware.single('projectimg'),ProjectController.editProjectController)
// removeproject : /projects/id/remove
router.delete('/projects/:id/remove',jwtMiddleware,ProjectController.removeprojectController) 
// edit user + applying middleware  path= localhost-3000/edit-user
router.put(`/edit-user`,jwtMiddleware,multerMiddleware.single('profilepic'),userController.edituserController)

module.exports=router