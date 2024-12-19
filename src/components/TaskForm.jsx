import React, { useState } from "react";

function TaskForm({ onSubmit, categories }) {
  const [newTask, setNewTask] = useState({
    name: "",
    workHours: 0,
    workMinutes: 0,
    workSeconds: 0,
    category: "",
  });
  const [newCategory, setNewCategory] = useState(""); // For dynamically adding categories

  const handleSubmit = () => {
    onSubmit(newTask);
    setNewTask({
      name: "",
      workHours: 0,
      workMinutes: 0,
      workSeconds: 0,
      category: "",
    });
    setNewCategory(""); // Clear category input after submission
  };

  const addCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      categories.push(newCategory); // Dynamically add the new category
    }
    setNewTask({ ...newTask, category: newCategory });
    setNewCategory("");
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Task Name"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Hours"
        value={newTask.workHours}
        onChange={(e) =>
          setNewTask({ ...newTask, workHours: Number(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Minutes"
        value={newTask.workMinutes}
        onChange={(e) =>
          setNewTask({ ...newTask, workMinutes: Number(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Seconds"
        value={newTask.workSeconds}
        onChange={(e) =>
          setNewTask({ ...newTask, workSeconds: Number(e.target.value) })
        }
      />
      <select
        value={newTask.category}
        onChange={(e) =>
          setNewTask({ ...newTask, category: e.target.value })
        }
      >
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Input for adding new category */}
      <input
        type="text"
        placeholder="Add New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={addCategory}>Add Category</button>

      <button onClick={handleSubmit}>
        Add Task
      </button>
    </div>
  );
}

export default TaskForm;
