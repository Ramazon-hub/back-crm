const { fetch,fetchAll } = require('../../lib/postgres')
const NEW_GROUP =`
    insert into 
        groups(
            group_name,
            group_ref_course,
            group_ref_teacher
        )
    values($1,$2,$3) returning *
`
const newGroup = (groupName,groupCourse,groupTeacher) => fetch(NEW_GROUP,groupName,groupCourse,groupTeacher)
module.exports ={
    newGroup
}