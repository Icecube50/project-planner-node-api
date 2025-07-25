const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

// Respond to GET request on the root route
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

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
              id: 'task_1',
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
              id: 'task_2',
              progress: 0,
              dependencies: 'task_1',
              resources: [
                { name: 'Developer Daniel', workload: '100%' },
              ]
          },
          {
              start: daysSince(20),
              end: daysSince(25),
              name: 'Testing',
              id: 'task_3',
              progress: 0,
              dependencies: 'task_2',
              resources: [
                { name: 'Tester Tim', workload: '100%' },
              ]
          },
          {
              start: daysSince(25),
              end: daysSince(30),
              name: 'Demo Evaluation',
              id: 'task_4',
              progress: 0,
              dependencies: 'task_3',
              resources: [
                { name: 'Developer David', workload: '100%' },
                { name: 'Developer Daniel', workload: '100%' },
                { name: 'Tester Tim', workload: '100%' },
              ]
          }
        ]