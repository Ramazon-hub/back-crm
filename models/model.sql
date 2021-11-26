create table courses(
    course_id uuid default uuid_generate_v4() primary key,
    course_name text not null,
    course_price bigint not null,
    course_ref_courseid uuid,
    constraint course_ref_course
    foreign key(course_ref_courseid)
    references courses(course_id)
    on delete cascade
);

select * from courses;

create table teachers(
    teacher_id uuid default uuid_generate_v4() primary key,
    teacher_name text not null,
    teacher_phone text [],
    teacher_ref_course uuid,
    constraint teacher_ref_course
    foreign key (teacher_ref_course)
    references courses(course_id)
    on delete cascade
);

select * from teachers;

create table course_teachers(
 course_teacher_id uuid default uuid_generate_v4() primary key,
 course_teacher_ref_teacher uuid,
 course_teacher_ref_course uuid,
 constraint course_ref_course_teacher
 foreign key (course_teacher_ref_course)
 references courses(course_id)
 on delete cascade,
 constraint teacher_ref_course_teacher
 foreign key(course_teacher_ref_teacher)
 references teachers(teacher_id)
 on delete cascade
);

select * from course_teachers;

create table groups(
    group_id uuid default uuid_generate_v4() primary key,
    group_name text not null,
    group_ref_course uuid,
    group_ref_teacher uuid,
    constraint group_ref_course
    foreign key(group_ref_course)
    references courses(course_id)
    on delete cascade
);

select * from groups;

create table students(
    student_id uuid default uuid_generate_v4() primary key,
    student_name text not null,
    student_pay bigint default null,
    student_ref_course uuid,
    student_ref_group uuid,
    constraint student_reference_course
    foreign key (student_ref_course)
    references courses(course_id)
    on delete cascade,
    constraint student_reference_group
    foreign key(student_ref_group)
    references groups(group_id)
    on delete cascade
);
create table payments(
    payment_id uuid default uuid_generate_v4() primary key,
    payment_value bigint default null,
    payment_student uuid,
    payment_course uuid,
    payment_group uuid,
    constraint payment_ref_student
    foreign key(payment_student)
    references students(student_id)
    on delete cascade,
    constraint payment_ref_course
    foreign key(payment_course)
    references courses(course_id)
    on delete cascade,
    constraint payment_ref_group
    foreign key(payment_group)
    references groups(group_id)
    on delete cascade
);

--/////////////////////////////////////////////////////////////////////////////////
--                      kursga to'lov qilganlar
--/////////////////////////////////////////////////////////////////////////////////

    select 
        student_name,
        course_name,
        group_name 
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
where payment_value is not null;

--//////////////////////////////////////////////////////////////////////////
--                  kursga to'lov qilmaganlar
--//////////////////////////////////////////////////////////////////////////

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
    groups on payment_group=group_id 
    where payment_value is not null;

--//////////////////////////////////////////////////////////////////////
--                bitta o'qituvchining   o'quvchilari soni
--//////////////////////////////////////////////////////////////////////

    select 
        distinct(teacher_name),course_price,
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
        courses on course_id=teacher_ref_course 
    where teacher_id='0fb8f740-1292-4618-8b7e-55425b9c8aad'
    group by 
       teacher_name,
       course_price,
       student_ref_group;

--//////////////////////////////////////////////////////////////////////
--                  o'qituvchi va uning o'quvchilari soni
--//////////////////////////////////////////////////////////////////////

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
        student_ref_group
     ;
--//////////////////////////////////////////////////////////////////////////////
--                  har bir guruhda nechta talaba borligini ko'rish
--//////////////////////////////////////////////////////////////////////////////
    select 
        group_name,
        count(student_ref_group) 
    from 
        groups 
    inner join 
        students 
    on 
        student_ref_group=group_id 
    group by 
        group_name ;
--//////////////////////////////////////////////////////////////////////
--              course bo'yicha o'qituvchilar sonini sanash
--/////////////////////////////////////////////////////////////////////////////
    select 
        course_name,
        count(teacher_ref_course) as teachers_count 
    from 
        courses 
    inner join 
        teachers 
    on 
        course_id=teacher_ref_course 
    group by 
        course_name ;
--///////////////////////////////////////////////////////////////////////////////
--              o'qituvchining guruhlari soni                    
--////////////////////////////////////////////////////////////////////////////////
    select 
        teacher_name,
        count(group_ref_teacher)
    from 
        teachers
    inner join 
        groups
    on 
        group_ref_teacher=teacher_id
    group by
        teacher_name;

--/////////////////////////////////////////////////////////////////////////////////////
--                DELETE STUDENTS ARCHIVE
--/////////////////////////////////////////////////////////////////////////////////////

create table archiv_del_students(
    ar_id serial primary key,
    student_id text,
    student_name text,
    student_ref_course text,
    student_ref_group text,
    deleted_at timestamp with time zone default current_timestamp
);
create or replace function archiv_del_students()
returns trigger
language plpgsql
as
$$
begin

    insert into archiv_del_students(student_id,student_name,student_ref_course,student_ref_group)values(old.student_id,old.student_name,old.student_ref_course,old.student_ref_group);
    return old;

end
$$;

create trigger arch_deleted_students
before delete
on students
for each row
execute procedure  archiv_del_students();

--/////////////////////////////////////////////////////////////////////////////////////
--                DELETE GROUPS ARCHIVE
--/////////////////////////////////////////////////////////////////////////////////////

create table deleted_groups (
    id serial primary key,
    group_id uuid,
    group_name text not null,
    group_ref_course uuid,
    group_ref_teacher uuid
);

create or replace function arch_del_groups()
returns trigger
language plpgsql
as 
$$
begin
        insert into deleted_groups(group_id,group_name,group_ref_course,group_ref_teacher)values(old.group_id,old.group_name,old.group_ref_course,old.group_ref_teacher);
        return old;

end
$$;

create trigger archiv_del_groups
before delete
on groups
for each row
execute procedure arch_del_groups();

--/////////////////////////////////////////////////////////////////////////////////////
--                DELETE   TEACHERS  ARCHIVE
--/////////////////////////////////////////////////////////////////////////////////////
create table deleted_teachers (
    id serial primary key,
    teacher_name text ,
    teacher_phone text [],
    teacher_ref_course text
);

create or replace function arch_del_teachers()
returns trigger
language plpgsql
as
$$
begin
        insert into deleted_teachers(teacher_name,teacher_phone,teacher_ref_course) values(old.teacher_name,old.teacher_phone,old.teacher_ref_course);
        return old;
end
$$;

create trigger arch_del_teacher 
before delete 
on teachers
for each row
execute procedure arch_del_teachers();

--/////////////////////////////////////////////////////////////////////////////////////
--                DELETE   COURSE  ARCHIVE
--/////////////////////////////////////////////////////////////////////////////////////

create table deleted_courses(
    id serial primary key,
    course_id uuid,
    course_name text,
    course_price bigint
);
create or replace function arch_del_courses()
returns trigger
language plpgsql
as 
$$
begin
        insert into deleted_courses(course_id,course_name,course_price)values(old.course_id,old.course_name,old.course_price);
        return old;
end
$$;
create trigger arch_del_course
before delete 
on courses 
for each row
execute procedure arch_del_courses();