## Todo React
A basic todo list built using the MERN stack.

See it live here: [hari-todolist on Heroku](https://hari-todolist.herokuapp.com/)

## API Guide

/api/tasks endpoint

### GET
Returns all tasks
Performing get on /api/tasks/:id returns the task corresponding to the ID if available with a 200 OK status.
If not available, returns a 404 status.

### POST
Adds task to database.
Request body should contain task object with 'done' and 'text' properties.
If add succeeds, returns 201 status. Else returns 404 with error.

### DELETE
Deletes specified task
Send DELETE requests to /api/tasks/:id
If the id is present, the corresponding task is deleted and a 200 message is sent. Else, a 404 message is sent.

### PATCH
Updates specified task
Send PATCH requests to /api/tasks/:id
Request body should contain task object with 'done' and 'text' properties.
If update succeeds, returns 200 status. Else returns 404 with error.