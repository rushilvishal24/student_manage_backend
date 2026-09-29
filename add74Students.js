import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student.js';

dotenv.config();

const names = [
  'Arun Kumar', 'Karthik Raja', 'Priya Nandhini', 'Muthu Selvan', 'Sanjana Devi', 'Vignesh Kumar', 'Anitha Lakshmi', 'Rohith Ganesh', 'Divya Bharathi', 'Sathish Kumar',
  'Nandhini Priya', 'Vikram Selvam', 'Meena Kumari', 'Dinesh Raj', 'Sowmya Natarajan', 'Raghul Prakash', 'Kavya Shree', 'Manikandan M', 'Pavithra Devi', 'Tharun Kumar'
];

const departments = ['CSE', 'EEE', 'ECE', 'MECH', 'IT'];
const sections = ['A', 'B', 'C'];

const buildStudents = () => {
  return names.map((name, index) => {
    const dept = departments[index % departments.length];
    const year = 1 + (index % 4);
    const section = sections[index % sections.length];
    const studentNumber = String(index + 1).padStart(3, '0');

    return {
      name,
      registerNumber: `${dept}-${year}0${studentNumber}`,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      phone: `9${String(100000000 + index).slice(-9)}`,
      department: dept,
      year,
      section,
      batch: '2025',
      dateOfBirth: new Date(2004 + (index % 3), (index % 12), (index % 28) + 1),
      gender: index % 2 === 0 ? 'Male' : 'Female',
      address: `${index % 10 + 1} Main Street, City ${index % 7 + 1}`,
      parentName: `Parent ${index + 1}`,
      parentPhone: `8${String(100000000 + index).slice(-9)}`,
      status: 'Active'
    };
  });
};

const seedStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_student_record_db');
    console.log('Connected to MongoDB');

    await Student.deleteMany({});
    const students = buildStudents();
    const inserted = await Student.insertMany(students);

    console.log(`Inserted ${inserted.length} students successfully.`);
    process.exit(0);
  } catch (error) {
    console.error('Error inserting students:', error.message);
    process.exit(1);
  }
};

seedStudents();
