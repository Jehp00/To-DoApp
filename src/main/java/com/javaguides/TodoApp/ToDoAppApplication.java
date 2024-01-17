package com.javaguides.TodoApp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import java.util.List;

@SpringBootApplication
public class ToDoAppApplication {
    public static void main(String[] args) {
		// Start Spring Boot application
		SpringApplication.run(ToDoAppApplication.class, args);
	}


	// Add the first task NO REPEATED for testing the CRUD to MongoDB
	@Bean
	CommandLineRunner runner(TaskRepository taskRepository, MongoTemplate mongoTemplate) {
		return args -> {
			Task task = new Task(
				"Cook The Dinner",
					"I have to cook the roast chicken and the french fries for my son before getting back from school",
					false
			);
			String TaskName = "Cook The Dinner";
			Query query = new Query();
			query.addCriteria(Criteria.where("TaskName").is(TaskName));
			List<Task> tasks = mongoTemplate.find(query, Task.class);
			if (tasks.size() > 1) {
				throw new IllegalStateException("Found task equals to other ones like" + TaskName);
			}
			if (tasks.isEmpty()) {
				taskRepository.insert(task);
			} else {
				System.out.println("User already exists");
			}
		};
	}
}
