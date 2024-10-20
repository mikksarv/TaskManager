package org.example;

import java.util.ArrayList;
import java.util.List;

public class TaskManager {

    public List<String> Tasks = new ArrayList<>();

    public TaskManager(List<String> tasks) {
        Tasks = tasks;
    }

    public List<String> getTasks() {
        return Tasks;
    }

    public void setTasks(List<String> tasks) {
        Tasks = tasks;
    }

    public void addTask(String task) {
        if (task == null || task.trim().isEmpty()) {
            throw new IllegalArgumentException("Task can not be empty");
        }
        if (!Tasks.contains(task)){
            Tasks.add(task);
        }
        else {System.out.println("Task allready exists");
        }
    }

    public void deleteTask(String task) {
        Tasks.remove(task);
    }


}
