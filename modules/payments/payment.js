const model = require('./model')
class ALL_TEACHERS_SALARY {
constructor(teacherName,teacherCourse,salary){
    this.teacher_name = teacherName
    this.teacher_course = teacherCourse
    this.teacher_salary = salary
}
}
module.exports={
    ALL_PAYMENTS:async(req,res)=>{
       try{
           const  { type } = req.body
          if(type === 'all'){
              const allPayments = await model.allPayments();
              if(allPayments){
                  res.status(200).json(allPayments)
      
              }else{
                  res.status(401).send('Failed ...')
              }

          }
          if(type === 'not null'){
            const paidStudents = await model.paidStudents();
            if(paidStudents){
                res.status(200).json(paidStudents)
    
            }else{
                res.status(401).send('Failed ...')
            }

        }
        if(type === 'null'){
            const unpaidStudents = await model.unpaidStudents();
            if(unpaidStudents){
                res.status(200).json(unpaidStudents)
    
            }else{
                res.status(401).send('Failed ...')
            }

        }

       }catch(err){
           console.log(err);
       }
    },
    TEACHERS_SALARY:async(req,res)=>{
        try{
            const {teacher_id} = req.params
            if(teacher_id){
                const teacherSalary = await model.teacherSalary(teacher_id);
              console.log(teacherSalary);
                 res.status(200).json({
                     teacher_name:teacherSalary.teacher_name,
                     teacher_course:teacherSalary.course_name,
                     salary:(teacherSalary.course_price * teacherSalary.student)*0.65

                 })

            } else{
              const allTeachersSalary = await model.allTeacherSalary()
            const teachers = new Array;
                allTeachersSalary.forEach(t=>{
                    let teacher = new ALL_TEACHERS_SALARY(t.teacher_name,t.course_name,Number(t.student)*Number(t.course_price))
                    teachers.push(teacher)
                })
              res.status(200).json(teachers)
            }

        }catch(err){
            console.log(err);
        }

    },
    TOTAL:async(req,res)=>{
        try{
            const paidStudents = await model.paidStudents();
            let total_money = 0;
            paidStudents.forEach(p=>{
                total_money+=Number(p.payment_value)
            })
           
            res.json({
                total_money
            })
            res.end()

        }catch(err){
            console.log(err);
        }
    }
}