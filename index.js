const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
    await contacts.listContacts();
      // console.table(list);
      break;

    case "get":
      const getContact = await contacts.getContactById(id);
      console.log(getContact);
      break;

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      console.log(addContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);

const express = require('express')
const app = express()
const  cors = require('cors')
const HttpError = require("./HttpError");
const port = 3000
app.use(cors())

app.get('/', (req, res) => {
  res.send('jjk')
})
app.get('/contact',async (req,res)=>{
    const result  = await contacts.listContacts()
    res.json(result)
})
app.get('/contact/:id',async (req,res)=>{
  const {id} = req.params;
 try{
  const result  = await contacts.getContactById(id)
  if(result === null){
    HttpError(404,'Not found')
  }
  res.json(result)
 }
 catch(error){
const {status = 500 , message = 'Server Error'} = error;
res.status(status).json({
  message,
})
 }
})
app.post('/contact',async (req,res)=>{
  const { email, password } = req.body;
  res.send(req.body)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})