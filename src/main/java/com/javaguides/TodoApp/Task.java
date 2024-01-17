package com.javaguides.TodoApp;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Task {
    @Id
    private String id;
    private String TaskName;
    private String Description;
    private boolean completed;

    public Task(String TaskName, String Description, boolean completed) {
        this.TaskName = TaskName;
        this.Description = Description;
        this.completed = completed;

    }
}
