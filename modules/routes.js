const express = require('express')
const router = express.Router()
const CourseModule = require('./courses/courses')
const TeacherModule = require('./teachers/teachers')
const GroupModule = require('./groups/groups')
const StudentModule = require('./students/students')
const PaymentsModule = require('./payments/payment')
router
    .get('/allcourses',CourseModule.ALL_COURSES)
    .get('/allteachers',TeacherModule.ALL_TEACHERS)
    .get('/payments',PaymentsModule.ALL_PAYMENTS)
    .get('/payments/teachersSalary/:teacher_id?',PaymentsModule.TEACHERS_SALARY)
    .get('/payments/total',PaymentsModule.TOTAL)
    .post('/newcourse',CourseModule.NEW_COURSE)
    .post('/newgroup',GroupModule.NEW_GROUP)
    .post('/newteacher',TeacherModule.NEW_TEACHER)
    .post('/newstudents',StudentModule.NEW_STUDENT)

    
    module.exports= router