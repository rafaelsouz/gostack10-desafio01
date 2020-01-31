const express = require('express');
const server = express();

server.use(express.json());

server.use( (req,res,next) => {

   console.count(`Contagem de requisições`);
   next()
})

function checkProjectExistInArray(req, res, next){
   const { id } = req.params;

   if(!findProject(id)){
      return res.status(400).json({ error: "Project does not exists "})
   }

   return next();
}

function findProject(id){
   const project = projects.find(p => p.id == id);

   return project;
}

const projects = [
   {
      id: "1",
      title: "Projeto 0",
      tasks: ["tarefa 0"]
   },
];

server.get('/projects', (req, res) => {
   res.json(projects)
});

server.post('/projects', (req, res) => {
   const { id, title } = req.body;

   projects.push({id, title, tasks:[]});

   return res.json(projects)
});

server.post('/projects/:id/tasks',checkProjectExistInArray ,(req, res) => {
   const { id } = req.params;
   const { title } = req.body;

   project = findProject(id);

   project.tasks.push(title);

   return res.json(project);
})

server.put('/projects/:id', checkProjectExistInArray, (req, res) => { 
   const { id } = req.params;
   const { title } = req.body;

   project = findProject(id);

   project.title = title

   return res.json(project);
});

server.delete('/projects/:id', checkProjectExistInArray, (req, res) => {
   const { id } = req.params;

   const projectIndex = projects.findIndex( p => p.id == id )

   projects.splice(projectIndex, 1)

   return res.send();
})

server.delete('/projects/:id/tasks/:idTask',checkProjectExistInArray, (req, res) => {
   const { id, idTask } = req.params;

   project = findProject(id);

   project.tasks.splice(idTask,1)

   return res.send();
})

server.put('/projects/:id/tasks/:idTask',checkProjectExistInArray, (req, res) => {
   const { id, idTask } = req.params;
   const { title } = req.body;

   project = findProject(id);

   project.tasks[idTask] = title;

   return res.json(project);
})


const PORT = 3000;
server.listen(PORT)