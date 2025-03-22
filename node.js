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
    document.body.innerHTML = `
    <div id="studentReview">
        <h2>📊 Student Performance</h2>
        <div class="content-container">
            <p id="output">Loading...</p>
        </div>
    </div>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            color: #2c3e50;
            padding: 20px;
        }
        #studentReview {
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 450px;
            padding: 30px;
            text-align: center;
            max-height: 85vh;
            overflow-y: auto;
            animation: slideIn 0.6s ease-out;
            border: 1px solid rgba(0, 0, 0, 0.05);
        }
        h2 {
            margin-bottom: 20px;
            color: #3a7bd5;
            font-size: 1.8rem;
            font-weight: 600;
        }
        .content-container {
            padding: 20px;
            border-radius: 12px;
            background: #f0f7ff;
            box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
            max-height: 60vh;
            overflow-y: auto;
            border: 1px solid #e1effe;
            transition: all 0.3s ease;
        }
        .content-container:hover {
            box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        #output {
            line-height: 1.6;
            color: #34495e;
            font-size: 1.05rem;
        }
        #output.loading {
            color: #7f8c8d;
            animation: pulse 1.5s infinite;
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }
        @media (max-width: 600px) {
            #studentReview {
                padding: 20px;
                max-width: 95%;
            }
            h2 {
                font-size: 1.5rem;
            }
        }
    </style>`;
    // Fetch message and update #output after page loads
    fetch("http://localhost:5000/") 
        .then(response => response.json()) 
        .then(data => {
            const output = document.getElementById("output");
            output.innerText = data.message;
            output.classList.remove("loading");
        })
        .catch(error => {
            document.getElementById("output").innerText = "Failed to load data. Please try again.";
            console.error("Error fetching message:", error);
        });
        
    // Add loading class initially
    document.getElementById("output").classList.add("loading");
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
