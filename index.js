const express = require('express');
const server = express();

server.use(express.json());

server.use(reqCount)

//Contador de requisições
function reqCount( req,res,next){
   console.count(`Contagem de requisições`);
   next()
}

//Verifica se o projeto existe
function checkProjectExistInArray(req, res, next){
   const { id } = req.params;

   if(!findProject(id)){
      return res.status(400).json({ error: "Project does not exists "})
   }

   return next();
}

//Encontra o projeto pelo o id
function findProject(id){
   const project = projects.find(p => p.id == id);

   return project;
}

const projects = [
   {
      id: "1",
      title: "AirCnC",
      tasks: ["Fazer DashBoard"]
   },
];

//Lista todos os projetos
server.get('/projects', (req, res) => {
   res.json(projects)
});

//Cadastra projeto
server.post('/projects', (req, res) => {
   const { id, title } = req.body;

   projects.push({id, title, tasks:[]});

   return res.json(projects)
});

//Cadastra tarefa ao um projeto
server.post('/projects/:id/tasks',checkProjectExistInArray ,(req, res) => {
   const { id } = req.params;
   const { title } = req.body;

   project = findProject(id);

   project.tasks.push(title);

   return res.json(project);
})

//Atualiza o titulo de um projeto
server.put('/projects/:id', checkProjectExistInArray, (req, res) => { 
   const { id } = req.params;
   const { title } = req.body;

   project = findProject(id);

   project.title = title

   return res.json(project);
});

//Delete um projeto pelo o id
server.delete('/projects/:id', checkProjectExistInArray, (req, res) => {
   const { id } = req.params;

   const projectIndex = projects.findIndex( p => p.id == id )

   projects.splice(projectIndex, 1)

   return res.send();
})

//Deleta tarefa pelo o id
server.delete('/projects/:id/tasks/:idTask',checkProjectExistInArray, (req, res) => {
   const { id, idTask } = req.params;

   project = findProject(id);

   project.tasks.splice(idTask,1)

   return res.send();
})

//Atualiza tarefa pelo o id
server.put('/projects/:id/tasks/:idTask',checkProjectExistInArray, (req, res) => {
   const { id, idTask } = req.params;
   const { title } = req.body;

   project = findProject(id);

   project.tasks[idTask] = title;

   return res.json(project);
})

const PORT = 3000;
console.log( `Rodando em localhost:${PORT}`)
server.listen(PORT)