const model = require('./model')

module.exports= {
    NEW_GROUP: async(req,res)=>{
        try{
            const { groupName,groupCourse,groupTeacher } = req.body
            const newGroup = await model.newGroup(groupName,groupCourse,groupTeacher)
            if(newGroup){
                res.status(200).json(newGroup)
            }else{
                res.status(401).send('Failed ...')
            }
        }catch(err){
            console.log('error -->',err);
        }
    }
}