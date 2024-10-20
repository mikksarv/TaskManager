import org.example.TaskManager;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;


public class TestTask {
    TaskManager manager = new TaskManager(new ArrayList<>());


    @Test
    public void testAddTask() {
        manager.addTask("Buy groceries");
        assertEquals("Buy groceries", manager.getTasks().get(0));
    }

    @Test
    public void testGetTask() {
        manager.addTask("Buy groceries");
        manager.addTask("Buy eggs");
        assertEquals("Buy groceries", manager.getTasks().get(0));
        assertEquals("Buy eggs", manager.getTasks().get(1));
        assertEquals(2, manager.getTasks().size());

    }

    @Test
    public void testDeleteTask() {
        manager.addTask("Buy groceries");
        manager.addTask("Buy eggs");
        manager.addTask("Buy Candy");

        manager.deleteTask("Buy eggs");

        assertEquals(2, manager.getTasks().size());
        assertFalse(manager.getTasks().contains("Buy eggs"));
        assertTrue(manager.getTasks().size() == 2);

    }
    @Test
    public void testEmptyTask() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            manager.addTask("");
        });
        assertEquals("Task can not be empty",thrown.getMessage());

    }
    @Test
    public void testDublicatedTask() {
        manager.addTask("Buy eggs");
        manager.addTask("Buy eggs");
        assertEquals(1, manager.getTasks().size());

    }



}


