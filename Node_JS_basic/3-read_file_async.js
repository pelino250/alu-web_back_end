const fs = require('fs');
const path = require('path');

function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(filePath), 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n');
        const students = lines.slice(1).map(line => line.split(',')).filter(student => student.length > 1);
        const numberOfStudents = students.length;
        console.log(`Number of students: ${numberOfStudents}`);

        const fields = [...new Set(students.map(student => student[3]))];
        fields.forEach((field) => {
          const studentsInField = students.filter(student => student[3] === field);
          const listOfFirstNames = studentsInField.map(student => student[0]).join(', ');
          console.log(`Number of students in ${field}: ${studentsInField.length}. List: ${listOfFirstNames}`);
        });

        resolve();
      }
    });
  });
}

module.exports = countStudents;