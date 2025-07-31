const express = require('express');
const cors = require('cors')
const app = express();
const port = 8080;

const corsOptions = {
  origin: 'http://localhost:5173', // or your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // optional: restrict methods
  //credentials: true // if you're using cookies/auth
}

app.use(express.json());
app.use(cors(corsOptions))

// Respond to GET request on the root route
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('api/tasks/:task_data', (req, res) => {
  const newProject = {
    start: req.params.start,
    end: req.params.end,
    name: req.params.name,
    id: req.params.id,
    progress: 0
  }
  
  console.log(newProject)

  //tasks.push(newProject)
  res.status(201).json(tasks)
})

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 


const rawToday = new Date();
const today =
    Date.UTC(
        rawToday.getFullYear(),
        rawToday.getMonth(),
        rawToday.getDate(),
    ) +
    new Date().getTimezoneOffset() * 60000;
const daysSince = (dx) => new Date(today + dx * 86400000);
let tasks = [
          {
              start: daysSince(1),
              end: daysSince(30),
              name: '250196 Planning Tool',
              id: 'prj_250196',
              progress: 0,
          },
          {
              start: daysSince(1),
              end: daysSince(10),
              name: 'Develop Frontend',
              id: 'prj_250196_task_1',
              progress: 0,
              dependencies: 'prj_250196',
              resources: [
                { name: 'Developer David', workload: '100%' },
              ]
          },
          {
              start: daysSince(10),
              end: daysSince(20),
              name: 'Develop API',
              id: 'prj_250196_task_2',
              progress: 0,
              dependencies: 'prj_250196_task_1',
              resources: [
                { name: 'Developer Daniel', workload: '100%' },
              ]
          },
          {
              start: daysSince(20),
              end: daysSince(25),
              name: 'Testing',
              id: 'prj_250196_task_3',
              progress: 0,
              dependencies: 'prj_250196_task_2',
              resources: [
                { name: 'Tester Tim', workload: '100%' },
              ]
          },
          {
              start: daysSince(25),
              end: daysSince(30),
              name: 'Demo Evaluation',
              id: 'prj_250196_task_4',
              progress: 0,
              dependencies: 'prj_250196_task_3',
              resources: [
                { name: 'Developer David', workload: '100%' },
                { name: 'Developer Daniel', workload: '100%' },
                { name: 'Tester Tim', workload: '100%' },
              ]
          }
        ]