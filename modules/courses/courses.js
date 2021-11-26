const model = require('./model')
module.exports ={
    NEW_COURSE:async(req,res)=>{
        try{
            const { courseName,coursePrice,courseRef } = req.body
       
           
            if(!courseRef){
                const newCourse = await model.newCourse(courseName,coursePrice)
                if(newCourse){
                    res.status(200).json(newCourse)
                }else{
                    res.status(401).send('Failed ...')
                }
            }else{
                const subCourse = await model.subCourse(courseName,coursePrice,courseRef)
                if(subCourse){
                    res.status(200).json(subCourse)
                }else{
                    res.status(401).send('Failed ...')
                }
            }
           
           

        }catch(err){
            console.log(err);
        }
    },
    ALL_COURSES:async(req,res)=>{
        try{
            const allCourse = await model.allCourse();
            if(allCourse){
                res.status(200).json(allCourse)
            }else{
                res.status(401).send('Failed ...')
            }
        }catch(err){
            console.log(err);
        }
    }

}