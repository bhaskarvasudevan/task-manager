package com.taskmanager.service;

import com.taskmanager.model.Task;
import com.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    
    private final TaskRepository taskRepository;
    
    @Cacheable(value = "tasks")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    @Cacheable(value = "task", key = "#id")
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }
    
    @Transactional
    @CacheEvict(value = {"tasks", "task"}, allEntries = true)
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }
    
    @Transactional
    @CacheEvict(value = {"tasks", "task"}, allEntries = true)
    public Task updateTask(Long id, Task taskDetails) {
        Task task = getTaskById(id);
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        return taskRepository.save(task);
    }
    
    @Transactional
    @CacheEvict(value = {"tasks", "task"}, allEntries = true)
    public void deleteTask(Long id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }
    
    @Cacheable(value = "tasksByStatus", key = "#status")
    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }
}
