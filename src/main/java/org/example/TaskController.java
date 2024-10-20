package org.example;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskManager taskManager = new TaskManager(new ArrayList<>());

    @GetMapping
    public List<String> getTasks() {
        return taskManager.getTasks();
    }

    @PostMapping
    public void addTask(@RequestBody TaskRequest request) {
        taskManager.addTask(request.getTask());

    }

    static class TaskRequest {
        private String task;

        public String getTask() {
            return task;
        }

        public void setTask(String task) {
            this.task = task;
        }
    }


}
