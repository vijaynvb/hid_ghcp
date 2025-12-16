package com.example.taskmgmt.service;

import com.example.taskmgmt.domain.Task;
import com.example.taskmgmt.dto.TaskCreateRequest;

import java.util.List;

public interface TaskService {
    List<Task> listTasks();
    Task createTask(TaskCreateRequest req);
    Task getTask(String id);
    Task replaceTask(String id, TaskCreateRequest req);
    Task patchTask(String id, Object partial);
    void deleteTask(String id);
}
