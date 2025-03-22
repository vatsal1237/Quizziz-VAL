const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

let students = [];
let classData = [];

// Endpoint for teachers to upload class data
app.post('/uploadClassData', (req, res) => {
    classData = req.body.classData;
    res.send({ message: 'Class data uploaded successfully!' });
});

// Endpoint for students to submit answers and receive an ID
app.post('/submit', (req, res) => {
    const { name, answers, classesAttended, minutesWatched, pastPerformance } = req.body;
    const id = uuidv4();
    students.push({ id, name, answers, classesAttended, minutesWatched, pastPerformance });
    res.send({ message: 'Data submitted successfully!', id });
});
app.get('/', (req, res) => {
    res.send("Server is running! Use API endpoints.");
});

// Endpoint to get feedback based on student ID
app.get('/feedback/:id', (req, res) => {
    const student = students.find(s => s.id === req.params.id);
    if (!student) return res.status(404).send({ message: 'Student not found' });
    
    let feedback = `You attended ${student.classesAttended} classes and watched ${student.minutesWatched} minutes of lectures.`;
    feedback += ` Your answers are being analyzed...`;
    res.send({ feedback });
});

app.listen(5000, () => console.log('Server running on port 5000'));

function showStudentInterface() {
    document.getElementById('studentInterface').style.display = 'block';
    document.getElementById('teacherInterface').style.display = 'none';
}
function showStudentReview() {
    fetchMessage(); 
    document.body.innerHTML = `
    <div id="studentReview">
        <h2>📊 Student Performance</h2>
        <p id="output">Loading...</p>
    </div>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #f4f7fc;
            font-family: 'Arial', sans-serif;
        }
        #studentReview {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 60%;
            max-width: 500px;
            animation: fadeIn 0.6s ease-in-out;
        }
        h2 {
            color: #4CAF50;
            font-size: 24px;
            margin-bottom: 15px;
        }
        #output {
            font-size: 18px;
            color: #333;
            padding: 15px;
            border-radius: 8px;
            background: #e8f5e9;
            box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>

`;


}

function showTeacherInterface() {
    document.getElementById('teacherInterface').style.display = 'block';
    document.getElementById('studentInterface').style.display = 'none';
}

document.getElementById('studentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('studentId').value;
    const feedbackResponse = await fetch(`http://localhost:5000/feedback/${id}`);
    const feedbackData = await feedbackResponse.json();
    document.getElementById('feedback').innerText = feedbackData.feedback;
});

document.getElementById('teacherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const classData = document.getElementById('classData').value;
    
    const response = await fetch('http://localhost:5000/uploadClassData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classData: JSON.parse(classData) })
    });
    const data = await response.json();
    alert(data.message);
});
