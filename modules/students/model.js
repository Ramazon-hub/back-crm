const { fetch,fetchAll } = require('../../lib/postgres')
const NEW_STUDENT = `
    insert into 
        students(
            student_name,
            student_pay,
            student_ref_course,
            student_ref_group
        )
    values($1,$2,$3,$4) returning * 
`
const PAYMENT = `
        insert into 
            payments(
                payment_value,
                payment_student,
                payment_course,
                payment_group
            )
        values($1,$2,$3,$4)
`
const newStudent = (studentName,studentPay,studentRefCourse,studentRefGroup) => fetch(NEW_STUDENT,studentName,studentPay?studentPay:null,studentRefCourse,studentRefGroup);
const payment = (paymentValue,paymentStudent,paymentCourse,paymentGroup) => fetch(PAYMENT,paymentValue?paymentValue:null,paymentStudent,paymentCourse,paymentGroup)
module.exports={
    newStudent,
    payment
}
// payment_value,
//                 payment_student,
//                 payment_course,
//                 payment_group