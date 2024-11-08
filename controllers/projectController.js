const projects = require('../models/projectmodel')

// add project
exports.addProjectController = async (req,res)=>{
    console.log("inside addProjectController");
    const userId = req.userId
    console.log(userId);
    const {title,languages,overview,github,website} = req.body
    const projectimg = req.file.filename
    console.log(title,languages,overview,github,website,projectimg);
    try{
        const existingProject =await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exist in our collection... Please upload another!! ")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectimg,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    }

    
}

// get projects in home
exports.homePageProjectController=async(req,res)=>{
    console.log('inside home page controller');
    try{
      const allHomeProjects =await projects.find().limit(3)
      res.status(200).json(allHomeProjects)
    }catch(err){
        res.status(401).json(err)        
    }
    
}

// get all projects. needs authorisation
exports.allProjectController=async(req,res)=>{
    console.log('inside allproject controller');
    const searchKey=req.query.search 
    const query={
        languages:{
            $regex:searchKey,$options:'i'
        }
    }
    try{
      const allProjects =await projects.find(query)
      res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)        
    }
    
}


// get user projects. needs authorisation
exports.userProjectController=async(req,res)=>{
    console.log('inside allproject controller');
    const userId=req.userId
    try{
      const allUserProjects =await projects.find({userId})
      res.status(200).json(allUserProjects)
    }catch(err){
        res.status(401).json(err)        
    }
    
}

// edit project needs authorisation
exports.editProjectController = async (req,res)=>{
    console.log("inside editProjectController");
    const id = req.params.id
    const userId = req.userId
    const {title,languages,overview,github,website,projectimg} = req.body
    const reUploadprojectimg = req.file?req.file.filename:projectimg
    try{
        const updateProject =await projects.findByIdAndUpdate({_id:id},{
            title,languages,overview,github,website,projectimg:reUploadprojectimg,userId
        },{new:true})
      
            await updateProject.save()
            res.status(200).json(updateProject)
        
    }catch(err){
        res.status(401).json(err)
 }

}


// delete porject controller
exports.removeprojectController=async(req,res)=>{
    console.log('inside removeproject controller')
    const {id}=req.params
    try{
   const deleteproject=await projects.findByIdAndDelete({_id:id})
   res.status(200).json(deleteproject)
    }catch(err){
        res.status(401).json(err)
    }

}