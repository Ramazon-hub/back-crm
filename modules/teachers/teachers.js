const model = require('./model')
module.exports={
    NEW_TEACHER:async(req,res)=>{
        try{
            const { teacherName,teacherPhone,teacherRef } = req.body
            const newTeacher = await model.newTeacher(teacherName,teacherPhone,teacherRef)
            if(newTeacher){
                res.status(200).json(newTeacher)
            }else{
                res.status(401).send('Failed ...')
            }
            await model.courseTeachers(teacherRef,newTeacher.teacher_id)

        }catch(err){
            console.log('error->',err);
        }
    },
    ALL_TEACHERS:async(req,res)=>{
        try{
            const { teacherName } = req.body
            const allTeacher = await model.allTeacher()
            if(allTeacher){
                res.status(200).json(allTeacher)
            }else{
                res.status(401).send('Failed ...')
            }

        }catch(err){
            console.log(err);
        }
    },
    // COURSE_TEACHERS:async(req,res)=>{
    //     try{
    //         const { courseRef,teacherRef } = req.body
    //         const courseTeachers = await model.courseTeachers(courseRef,teacherRef)
    //         if(courseTeachers){
    //             res.status(200).json(courseTeachers)
    //         }else{
    //             res.status(401).send('Failed ...')
    //         }
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
}