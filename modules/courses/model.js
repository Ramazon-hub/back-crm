const { fetch,fetchAll } = require('../../lib/postgres')
const NEW_COURSE = `
    insert into 
        courses(course_name,course_price)
    values($1,$2) returning *

`
const SUB_COURSE = `
    insert into 
        courses(course_name,course_price,course_ref_courseid)
    values($1,$2,$3) returning *
`
const ALL_COURSES = `
    select * from courses;
`
const newCourse = (courseName,coursePrice) => fetch(NEW_COURSE,courseName,coursePrice);
const subCourse = (courseName,coursePrice,courseRef) => fetch(SUB_COURSE,courseName,coursePrice,courseRef)
const allCourse = ()=>fetchAll (ALL_COURSES)
module.exports={
    newCourse,
    subCourse,
    allCourse
}