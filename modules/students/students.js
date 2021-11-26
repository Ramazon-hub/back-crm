const model= require('./model')
module.exports={
    NEW_STUDENT:async(req,res)=>{
        try{
            const { studentName,studentPay,studentRefCourse,studentRefGroup } = req.body
            const newStudent = await model.newStudent(studentName,studentPay,studentRefCourse,studentRefGroup);
            if(newStudent){
                res.status(200).json(newStudent)
            }else{
                res.status(401).send('Falied ...')
            }
            const payment = await model.payment(studentPay,newStudent.student_id,studentRefCourse,studentRefGroup)
        }catch(err){
            console.log(err);
        }
    }
}