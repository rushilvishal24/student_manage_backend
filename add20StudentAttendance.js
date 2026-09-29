import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student.js';
import Subject from './models/Subject.js';
import Faculty from './models/Faculty.js';
import Attendance from './models/Attendance.js';

dotenv.config();

const subjectList = [
  { name: 'Power Transmission and Distribution', code: 'PTD' },
  { name: 'Microcontrollers Programming and Interfacing', code: 'MPI' },
  { name: 'Power Electronics', code: 'PE' },
  { name: 'Electric Mobility Technology', code: 'EMT' },
  { name: 'Electrical Machines', code: 'EM' }
];

const dates = [
  '2026-09-01',
  '2026-09-05',
  '2026-09-10'
];

const seedAttendance = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_student_record_db');
    console.log('Connected to MongoDB');

    let faculty = await Faculty.findOne({ department: 'EEE' });
    if (!faculty) {
      faculty = await Faculty.create({
        name: 'EEE Faculty',
        email: 'eee.faculty@studentmanage.com',
        employeeId: 'EEE-101',
        department: 'EEE',
        phone: '9876543210',
        subjects: subjectList.map((sub) => sub.name)
      });
    }

    const createdSubjects = [];
    for (const item of subjectList) {
      let subject = await Subject.findOne({ name: item.name });
      if (!subject) {
        subject = await Subject.create({
          name: item.name,
          code: item.code,
          department: 'EEE',
          semester: 6,
          credits: 4,
          faculty: faculty._id
        });
      }
      createdSubjects.push(subject);
    }

    const students = await Student.find().limit(20);
    const attendanceRecords = [];

    for (let s = 0; s < students.length; s++) {
      const student = students[s];

      for (let subIndex = 0; subIndex < createdSubjects.length; subIndex++) {
        const subject = createdSubjects[subIndex];

        for (let dateIndex = 0; dateIndex < dates.length; dateIndex++) {
          const status = ((s + subIndex + dateIndex) % 4 === 0) ? 'Absent' : 'Present';

          attendanceRecords.push({
            student: student._id,
            subject: subject._id,
            faculty: faculty._id,
            date: new Date(dates[dateIndex]),
            status,
            createdAt: new Date()
          });
        }
      }
    }

    await Attendance.deleteMany({});
    await Attendance.insertMany(attendanceRecords);

    console.log(`Inserted attendance for ${students.length} students across ${createdSubjects.length} subjects.`);
    console.log(`Total attendance records: ${attendanceRecords.length}`);
    process.exit(0);
  } catch (error) {
    console.error('Error inserting attendance:', error.message);
    process.exit(1);
  }
};

seedAttendance();
