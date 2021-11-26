const { fetch,fetchAll } = require('../../lib/postgres')

const ALL_PAYMENTS =`
    select 
        student_name,
        course_name,
        group_name,
        payment_value
    from 
        payments 
    inner join 
        students 
    on 
        payment_student=student_id 
    inner join courses 
    on 
        payment_course=course_id 
    inner join groups 
    on 
        payment_group=group_id;
`
const PAID_STUDENTS = `
    select 
         student_name,
         course_name,
         group_name,
         payment_value 
    from 
        payments 
    inner join 
    students 
    on 
        payment_student=student_id 
    inner join 
        courses 
    on 
        payment_course=course_id 
    inner join 
        groups 
    on 
        payment_group=group_id 
    where 
        payment_value is not null
`   
const UNPAID_STUDENTS = `
    select 
        student_name,
        course_name,
        group_name,
        payment_value 
    from 
        payments 
    inner join 
        students 
    on 
        payment_student=student_id 
    inner join 
        courses 
    on 
        payment_course=course_id 
    inner join 
        groups 
    on 
        payment_group=group_id 
    where 
        payment_value is null
`
const TEACHER_SALARY = `
 select 
    teacher_name,
    course_price,
    course_name,
    count(student_ref_group) as student 
    from 
        groups 
    inner join 
        students 
    on 
        student_ref_group=group_id 
    inner join 
        teachers 
    on 
       teacher_id=group_ref_teacher 
    inner join 
        courses 
    on 
        course_id=teacher_ref_course 
    where teacher_id=$1
    group by 
       teacher_name,
       course_price,
       course_name,
       student_ref_group;

`
const ALL_TEACHER_SALARY = `
    select 
        teacher_name,
        course_price,
        course_name,
        count(student_ref_group) as student 
    from 
        groups 
    inner join 
        students 
    on 
        student_ref_group=group_id 
    inner join 
        teachers 
    on 
       teacher_id=group_ref_teacher 
    inner join 
        courses 
    on 
        course_id=teacher_ref_course 
   
    group by 
       teacher_name,
       course_price,
       course_name,
       student_ref_group;

`
const allPayments = () => fetchAll(ALL_PAYMENTS);
const paidStudents = () => fetchAll(PAID_STUDENTS);
const unpaidStudents = () => fetchAll(UNPAID_STUDENTS);
const teacherSalary =(teacherId) =>fetch(TEACHER_SALARY,teacherId)
const allTeacherSalary = ()=> fetchAll(ALL_TEACHER_SALARY)
module.exports = {
    allPayments,
    paidStudents,
    unpaidStudents,
    teacherSalary,
    allTeacherSalary
}