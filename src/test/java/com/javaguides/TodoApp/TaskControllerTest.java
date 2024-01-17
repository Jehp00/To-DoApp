package com.javaguides.TodoApp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.javaguides.TodoApp.Task;
import com.javaguides.TodoApp.TaskController;
import com.javaguides.TodoApp.TaskRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Mock
    private TaskRepository taskRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @InjectMocks
    private TaskController taskController;

    @Test
    void testGetAllTasks() throws Exception {
        when(taskRepository.findAll()).thenReturn(Collections.singletonList(
                new Task("Test Task", "Test Description", false)
        ));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].taskName").value("Test Task"))
                .andExpect(jsonPath("$[0].description").value("Test Description"))
                .andExpect(jsonPath("$[0].completed").value(false));

        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testGetTaskById() throws Exception {
        String taskId = "123";
        Task task = new Task("Test Task", "Test Description", false);
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/tasks/{id}", taskId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.taskName").value("Test Task"))
                .andExpect(jsonPath("$.description").value("Test Description"))
                .andExpect(jsonPath("$.completed").value(false));

        verify(taskRepository, times(1)).findById(taskId);
    }

    @Test
    void testCreateTask() throws Exception {
        Task taskToCreate = new Task("Test Task", "Test Description", false);
        when(taskRepository.save(any(Task.class))).thenReturn(taskToCreate);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(taskToCreate)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.taskName").value("Test Task"))
                .andExpect(jsonPath("$.description").value("Test Description"))
                .andExpect(jsonPath("$.completed").value(false));

        verify(taskRepository, times(1)).save(any(Task.class));
    }

    // Similar tests for updateTask and deleteTask methods
}
