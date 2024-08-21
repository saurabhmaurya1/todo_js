let todos = [];

        function addTodo() {
            const todoTitle = document.querySelector("#todoInput").value;
            if (todoTitle.trim() !== "") {
                todos.push({
                    title: todoTitle,
                    completed: false,
                    editing: false
                });
                document.querySelector("#todoInput").value = ""; // Clear the input field
                render();
            }
        }

        function createTodoComponent(todo, i) {
            const newTodo = document.createElement("div");
            const p = document.createElement("span");
            const editInput = document.createElement("input");
            const button1 = document.createElement("button");
            const button2 = document.createElement("button");
            // const button3 = document.createElement("button");
            const checkBox = document.createElement("input");
            checkBox.type="checkBox";
            checkBox.checked = todo.completed;
            checkBox.setAttribute("onclick", "toggleCompleteTodoComponent(" + i + ")");


            if (todo.editing) {
                editInput.value = todo.title;
                newTodo.appendChild(editInput);
            } else {
                p.innerText = (i + 1) + ". " + todo.title;
                if (todo.completed) {
                    p.classList.add("completed");
                }
                newTodo.appendChild(p);
            }

            button1.innerText = todo.editing ? "Save" : "Edit";
            button2.innerText = "Delete";
            // button3.innerText = todo.completed ? "Unmark" : "Complete";

            button1.setAttribute("onclick", "editTodoComponent(" + i + ")");
            button2.setAttribute("onclick", "deleteTodoComponent(" + i + ")");
            // button3.setAttribute("onclick", "toggleCompleteTodoComponent(" + i + ")");

            newTodo.appendChild(button1);
            newTodo.appendChild(button2);
            newTodo.appendChild(checkBox);

            return newTodo;
        }

        function editTodoComponent(i) {
            if (todos[i].editing) {
                const newTitle = document.querySelectorAll("input")[i + 1].value;
                if (newTitle.trim() !== "") {
                    todos[i].title = newTitle;
                    todos[i].editing = false;
                }
            } else {
                todos[i].editing = true;
            }
            render();
        }

        function deleteTodoComponent(i) {
            todos.splice(i, 1);
            render();
        }

        function toggleCompleteTodoComponent(i) {
            todos[i].completed = !todos[i].completed;
            render();
        }

        function render() {
            document.querySelector("#todos").innerHTML = "";
            for (let i = 0; i < todos.length; i++) {
                const element = createTodoComponent(todos[i], i);
                document.querySelector("#todos").appendChild(element);
            }
            updateProgressBar();
        }

        function updateProgressBar() {
            const totalTasks = todos.length;
            const completedTasks = todos.filter(todo => todo.completed).length;
            const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
            const progressBar = document.querySelector("#progressBar");

            progressBar.style.width = progress + "%";
            progressBar.innerText = progress.toFixed(2) + "%";
        }