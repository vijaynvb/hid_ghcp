package com.example.taskmgmt.service.impl;

import com.example.taskmgmt.domain.Task;
import com.example.taskmgmt.dto.TaskCreateRequest;
import com.example.taskmgmt.repository.TaskRepository;
import com.example.taskmgmt.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) { this.taskRepository = taskRepository; }

    @Override
    public List<Task> listTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task createTask(TaskCreateRequest req) {
        Task t = new Task();
        t.setTitle(req.getTitle());
        t.setDescription(req.getDescription());
        t.setPriority(req.getPriority());
        t.setDueDate(req.getDueDate());
        t.setAssigneeId(req.getAssigneeId());
        t.setTags(req.getTags());
        return taskRepository.save(t);
    }

    @Override
    public Task getTask(String id) {
        return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Override
    public Task replaceTask(String id, TaskCreateRequest req) {
        Task t = getTask(id);
        t.setTitle(req.getTitle());
        t.setDescription(req.getDescription());
        t.setPriority(req.getPriority());
        t.setDueDate(req.getDueDate());
        t.setAssigneeId(req.getAssigneeId());
        t.setTags(req.getTags());
        return taskRepository.save(t);
    }

    @Override
    public Task patchTask(String id, Object partial) {
        // For scaffold: simply return entity. Implement merging later.
        return getTask(id);
    }

    @Override
    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }
}
