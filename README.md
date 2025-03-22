# Quizziz-VAL
Student Feedback System by Vatsal Nagpal, Lakshit Bansal, Ansh Katyayan 
HOW TO RUN THE CODE
1. Cd to the file
2. On the terminal run python main.py
3. Follow the link http://localhost:5000/main.html
4. Click on Student
5. Add your name and click view performance
6. Gemini analysis the data and gives an output
7. a11.txt has a dataset containing the marks of a few students
8. Right now it only analysis data of student 1 but can be edited to do more
9. Code uses Google Gemini API Key

AI Based Student Learning Mangement System

We aim to create an AI based student learning management system that utilizes key parameters that directly influence and impact a students performance in a subject over the course of a semester.

These parameters are defined as below:
1. Class Attendance 
2. Mid Semester Marks
3. Quizzes Attempted 
4. Quiz Scores 
5. Online lectures Attented
6. Lecture minutes Watched 
7. Practise questions attempted 
8. Time taken to complete each question of quiz*
9. Topic Wise Attendance (Following the Course Plan)*
10. Pre - Requisite course grades*
(All parameters under an asterisks could not be included in the partial prototype but are part of the vision for this problem statement) 

In a very competitive educational environment, such as in India, students often fail to realise what they should focus on to improve their academic performance. In a world with too many expectations and even more advisors we provide a one stop personalized solution for each student wherein they themselves can visualise what parameters directly correlate to their performance using artificial intelligence.

This also provides educators and teachers an easier platform to manage students to make sure more students can perform at their potential best.
The model utilizes Google Gemeni (as of the partial prototype) in the python file (main.py), linked by an API key and displayed the information through the HTML source code.

The student receives information regarding his or her performance in each parameter in comparision to the rest of his clas and how each parameter correlates to overall performance.

The model provides the strengths and tips for improvement based on current performance and performances of previous batches of the same course based on data procured(Not available in the partial prototype)
