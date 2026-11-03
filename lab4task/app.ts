interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

type Filter = "all" | "active" | "completed";

class TodoApp {
    private todos: Todo[] = [];
    private filter: Filter = "all";
    private nextId: number = 1;
    private editingId: number | null = null;

    private input = document.getElementById("new-todo") as HTMLInputElement;
    private list = document.getElementById("list") as HTMLUListElement;
    private count = document.getElementById("count") as HTMLSpanElement;

    constructor() {
        this.addTodo("See Lecture");
        this.addTodo("Solve assignment");

        document.getElementById("add-btn")!.addEventListener("click", () => this.addTodo(this.input.value));
        this.input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.addTodo(this.input.value);
            }
        });

        document.getElementById("filters")!.addEventListener("click", (e) => {
            const button = e.target as HTMLElement;
            if (button.dataset.filter) {
                this.filter = button.dataset.filter as Filter;
                this.render();
            }
        });

        document.getElementById("clear-completed")!.addEventListener("click", () => {
            this.todos = this.todos.filter((todo) => !todo.completed);
            this.render();
        });

        document.getElementById("clear-all")!.addEventListener("click", () => {
            this.todos = [];
            this.render();
        });
    }

    addTodo(text: string): void {
        const trimmed = text.trim();
        if (trimmed === "") {
            return;
        }
        this.todos = [...this.todos, { id: this.nextId++, text: trimmed, completed: false }];
        this.input.value = "";
        this.render();
    }

    toggleTodo(id: number): void {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.render();
    }

    deleteTodo(id: number): void {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.render();
    }

    saveEdit(id: number, text: string): void {
        if (this.editingId !== id) {
            return;
        }
        const trimmed = text.trim();
        this.editingId = null;
        if (trimmed === "") {
            this.deleteTodo(id);
            return;
        }
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, text: trimmed } : todo
        );
        this.render();
    }

    visibleTodos(): Todo[] {
        if (this.filter === "active") {
            return this.todos.filter((todo) => !todo.completed);
        }
        if (this.filter === "completed") {
            return this.todos.filter((todo) => todo.completed);
        }
        return this.todos;
    }

    render(): void {
        this.list.innerHTML = "";

        this.visibleTodos().forEach((todo) => {
            const li = document.createElement("li");
            if (todo.completed) {
                li.className = "done";
            }

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener("change", () => this.toggleTodo(todo.id));
            li.appendChild(checkbox);

            const del = document.createElement("button");
            del.className = "delete";
            del.textContent = "\u{1F5D1}";
            del.addEventListener("click", () => this.deleteTodo(todo.id));

            if (todo.id === this.editingId) {
                const editBox = document.createElement("input");
                editBox.className = "edit-input";
                editBox.value = todo.text;
                editBox.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        this.saveEdit(todo.id, editBox.value);
                    } else if (e.key === "Escape") {
                        this.editingId = null;
                        this.render();
                    }
                });
                editBox.addEventListener("blur", () => this.saveEdit(todo.id, editBox.value));
                li.appendChild(editBox);
                li.appendChild(del);
                this.list.appendChild(li);
                editBox.focus();
            } else {
                const label = document.createElement("span");
                label.textContent = todo.text;
                label.addEventListener("dblclick", () => {
                    this.editingId = todo.id;
                    this.render();
                });
                li.appendChild(label);
                li.appendChild(del);
                this.list.appendChild(li);
            }
        });

        const left = this.todos.filter((todo) => !todo.completed).length;
        this.count.textContent = `${left} ${left === 1 ? "item" : "items"} left`;

        document.querySelectorAll<HTMLElement>(".filter").forEach((button) => {
            button.classList.toggle("active", button.dataset.filter === this.filter);
        });
    }
}

new TodoApp().render();
