const { fetch,fetchAll } = require('../../lib/postgres')
const NEW_TEACHER = `
    insert into 
        teachers(teacher_name,teacher_phone,teacher_ref_course)
    values($1,$2,$3) returning * 
`
const ALL_TEACHERS = `
    select * from teachers;
`
const COURSE_TEACHERS = `
    insert into
        course_teachers(course_teacher_ref_course,course_teacher_ref_teacher)
    values($1,$2) returning *
`
const newTeacher = (teacherName,teacherPhone,teacherRef) => fetch(NEW_TEACHER,teacherName,teacherPhone,teacherRef)
const allTeacher = ()=> fetchAll(ALL_TEACHERS)
const courseTeachers = (courseRef,teacherRef)=> fetch(COURSE_TEACHERS,courseRef,teacherRef)
module.exports={
    newTeacher,
    allTeacher,
    courseTeachers
}