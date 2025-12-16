package com.example.taskmgmt.controller;

import com.example.taskmgmt.dto.TaskCreateRequest;
import com.example.taskmgmt.domain.Task;
import com.example.taskmgmt.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@Validated
public class TasksController {
    private final TaskService taskService;

    public TasksController(TaskService taskService) { this.taskService = taskService; }

    @GetMapping
    public ResponseEntity<List<Task>> listTasks() {
        return ResponseEntity.ok(taskService.listTasks());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskCreateRequest req) {
        Task created = taskService.createTask(req);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTask(@PathVariable String taskId) {
        return ResponseEntity.ok(taskService.getTask(taskId));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> replaceTask(@PathVariable String taskId, @Valid @RequestBody TaskCreateRequest req) {
        return ResponseEntity.ok(taskService.replaceTask(taskId, req));
    }

    @PatchMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable String taskId, @RequestBody Object partial) {
        // partial updates would be handled in service; simplified here
        return ResponseEntity.ok(taskService.patchTask(taskId, partial));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable String taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
}
