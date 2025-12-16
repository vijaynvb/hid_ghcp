package com.example.taskmgmt.dto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

public class TaskCreateRequest {
    @NotBlank
    private String title;
    private String description;
    private String priority;
    private LocalDate dueDate;
    private String assigneeId;
    private List<String> tags;

    // getters/setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public String getAssigneeId() { return assigneeId; }
    public void setAssigneeId(String assigneeId) { this.assigneeId = assigneeId; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
}
