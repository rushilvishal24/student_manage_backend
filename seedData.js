import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Student from './models/Student.js';
import Subject from './models/Subject.js';
import Attendance from './models/Attendance.js';
import Marks from './models/Marks.js';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_student_record_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany({});
    await Student.deleteMany({});
    await Subject.deleteMany({});
    await Attendance.deleteMany({});
    await Marks.deleteMany({});

    const adminPassword = await bcrypt.hash('admin123', 10);

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@studentmanage.com',
      password: adminPassword,
      role: 'admin'
    });

    const normalUser = await User.create({
      name: 'Student User',
      email: 'student@studentmanage.com',
      password: await bcrypt.hash('student123', 10),
      role: 'user'
    });

    const students = await Student.insertMany([
      {
        name: 'Aarav Kumar',
        registerNumber: 'CS-2024-001',
        email: 'aarav@gmail.com',
        phone: '9876543210',
        department: 'CSE',
        year: '2nd Year',
        section: 'A',
        batch: '2024',
        dateOfBirth: '2005-04-10',
        gender: 'Male',
        address: 'Chennai',
        parentName: 'Kumar',
        parentPhone: '9876543211',
        status: 'Active'
      },
      {
        name: 'Priya Nair',
        registerNumber: 'CS-2024-002',
        email: 'priya@gmail.com',
        phone: '9876543212',
        department: 'CSE',
        year: '2nd Year',
        section: 'A',
        batch: '2024',
        dateOfBirth: '2005-06-15',
        gender: 'Female',
        address: 'Coimbatore',
        parentName: 'Nair',
        parentPhone: '9876543213',
        status: 'Active'
      },
      {
        name: 'Rohan Das',
        registerNumber: 'EEE-2024-011',
        email: 'rohan@gmail.com',
        phone: '9876543214',
        department: 'EEE',
        year: '3rd Year',
        section: 'B',
        batch: '2024',
        dateOfBirth: '2004-11-20',
        gender: 'Male',
        address: 'Bengaluru',
        parentName: 'Das',
        parentPhone: '9876543215',
        status: 'Active'
      }
    ]);

    const subjects = await Subject.insertMany([
      {
        name: 'Power Transmission and Distribution',
        code: 'EE301',
        department: 'EEE',
        semester: 5,
        credits: 4,
        faculty: 'Faculty-001'
      },
      {
        name: 'Microcontrollers Programming and Interfacing',
        code: 'EE302',
        department: 'EEE',
        semester: 5,
        credits: 4,
        faculty: 'Faculty-002'
      },
      {
        name: 'Power Electronics',
        code: 'EE303',
        department: 'EEE',
        semester: 5,
        credits: 4,
        faculty: 'Faculty-003'
      },
      {
        name: 'Electric Mobility Technology',
        code: 'EE304',
        department: 'EEE',
        semester: 6,
        credits: 3,
        faculty: 'Faculty-004'
      },
      {
        name: 'Electrical Machines',
        code: 'EE305',
        department: 'EEE',
        semester: 6,
        credits: 4,
        faculty: 'Faculty-005'
      }
    ]);

    await Attendance.insertMany([
      {
        student: students[0]._id,
        subject: subjects[0]._id,
        faculty: 'Faculty-001',
        date: new Date(),
        status: 'Present'
      },
      {
        student: students[1]._id,
        subject: subjects[1]._id,
        faculty: 'Faculty-002',
        date: new Date(),
        status: 'Absent'
      },
      {
        student: students[2]._id,
        subject: subjects[2]._id,
        faculty: 'Faculty-003',
        date: new Date(),
        status: 'Present'
      }
    ]);

    await Marks.insertMany([
      {
        student: students[0]._id,
        subject: subjects[0]._id,
        examType: 'Midterm',
        marks: 88
      },
      {
        student: students[0]._id,
        subject: subjects[1]._id,
        examType: 'Midterm',
        marks: 91
      },
      {
        student: students[0]._id,
        subject: subjects[2]._id,
        examType: 'Midterm',
        marks: 85
      },
      {
        student: students[0]._id,
        subject: subjects[3]._id,
        examType: 'Midterm',
        marks: 78
      },
      {
        student: students[0]._id,
        subject: subjects[4]._id,
        examType: 'Midterm',
        marks: 89
      },
      {
        student: students[1]._id,
        subject: subjects[0]._id,
        examType: 'Midterm',
        marks: 72
      },
      {
        student: students[1]._id,
        subject: subjects[1]._id,
        examType: 'Midterm',
        marks: 74
      },
      {
        student: students[1]._id,
        subject: subjects[2]._id,
        examType: 'Midterm',
        marks: 80
      },
      {
        student: students[1]._id,
        subject: subjects[3]._id,
        examType: 'Midterm',
        marks: 69
      },
      {
        student: students[1]._id,
        subject: subjects[4]._id,
        examType: 'Midterm',
        marks: 83
      },
      {
        student: students[2]._id,
        subject: subjects[0]._id,
        examType: 'Midterm',
        marks: 90
      },
      {
        student: students[2]._id,
        subject: subjects[1]._id,
        examType: 'Midterm',
        marks: 86
      },
      {
        student: students[2]._id,
        subject: subjects[2]._id,
        examType: 'Midterm',
        marks: 94
      },
      {
        student: students[2]._id,
        subject: subjects[3]._id,
        examType: 'Midterm',
        marks: 88
      },
      {
        student: students[2]._id,
        subject: subjects[4]._id,
        examType: 'Midterm',
        marks: 92
      }
    ]);

    console.log('Seed data inserted successfully.');
    console.log('Admin login: admin@studentmanage.com / admin123');
    console.log('Student login: student@studentmanage.com / student123');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed data failed:', error.message);
    process.exit(1);
  }
};

seedData();
