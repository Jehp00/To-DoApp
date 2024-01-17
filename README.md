# To-Do List App

## Description

The To-Do List App is a simple task management application that allows users to create, update, and delete tasks. The application consists of a backend built with Java, Spring Boot, and MongoDB, and a frontend developed using React.

## Features

- **Backend:**
    - Java programming language
    - Spring Boot framework
    - MongoDB database for task storage

## Files

| File  | Directory  | Description |
| :------ |:--------------| :---------------------|
| `Task.java` | `src/main/java/com/javaguides/TodoApp` | Represents the Task entity model. Contains fields such as `id`, `taskName`, `description`, and `completed`. |
| `TaskController.java`  | `src/main/java/com/javaguides/TodoApp` | Defines the REST API endpoints for tasks. Implements CRUD operations (`GET`, `POST`, `PUT`, `DELETE`). |
| `TaskControllerTest.java` | `src/test/java/com/javaguides/TodoApp`   | Contains unit tests for the TaskController class to ensure the proper functioning of API endpoints. |
| `ToDoAppApplication.java` | `src/main/java/com/javaguides/TodoApp` | Main application file for the Spring Boot project. Contains the main method to run the Spring Boot application. Initializes the application context. |


- **Frontend:**
    - React library for building user interfaces

## Steps to Run the Project

### Backend (Spring Boot)

1. **Clone the Project:**
   ```bash
   git clone https://github.com/Jehp00/To-DoApp.git
   cd To-DoApp/

## Run MongoDB using Docker Compose:

```docker-compose -f docker-compose.yaml up -d```

## Run the Spring Boot API:

Open the project in IntelliJ IDEA or your preferred IDE.
Locate the ToDoAppApplication.java file in the src/main/java/com/javaguides/TodoApp package.
Run the main method to start the Spring Boot application.

or

```use mvn command:
mvn spring-boot:build
mvn spring-boot:run
   ```


## Frontend (React)
### Navigate to the Web Template:
```
cd web_template/
```
### Install Dependencies:

```
npm install react
npm install babel-loader@8.2.3
npm install react-scripts@latest
```

## Run the React App:

```
npm start
Access the App:
Open your browser and visit http://localhost:3000 to access the To-Do List App.
```

## Routes
GET /api/tasks:

Returns a list of all tasks.
GET /api/tasks/{id}:

Returns details of a specific task identified by the given id.
POST /api/tasks:

Creates a new task.
Expects a JSON payload with taskName, description, and completed fields.
PUT /api/tasks/{id}:

Updates an existing task identified by the given id.
Expects a JSON payload with completed field.
DELETE /api/tasks/{id}:

Deletes a task identified by the given id.
Data Types
## Task:
id (String): Unique identifier for the task.
taskName (String): Name/title of the task.
description (String): Description/details of the task.
completed (Boolean): Indicates whether the task is completed or not.
kotlin
Copy code

Feel free to use this markdown file as your project's README.md.