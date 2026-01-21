const API_URL = "http://localhost:3000/tasks";

document.getElementById("addBtn").onclick = addTask;
loadTasks();

function loadTasks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(tasks => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";

            tasks.forEach(task => {
                const li = document.createElement("li");
                if (task.completed) li.classList.add("completed");

                li.innerHTML = `
                    <span>${task.title}</span>
                    <div class="actions">
                        <button class="complete">✔ Completed</button>
                        <button class="pending">⏳ Pending</button>
                        <button class="delete">❌ Delete</button>
                    </div>
                `;

                li.querySelector(".complete").onclick = () => {
                    emojiCelebrate();
                    setTimeout(() => updateTask(task.id, 1), 400);
                };

                li.querySelector(".pending").onclick = () =>
                    updateTask(task.id, 0);

                li.querySelector(".delete").onclick = () =>
                    deleteTask(task.id);

                list.appendChild(li);
            });
        });
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim() === "") return;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input.value })
    }).then(() => {
        input.value = "";
        loadTasks();
    });
}

function updateTask(id, completed) {
    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed })
    }).then(loadTasks);
}

function deleteTask(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(loadTasks);
}

/* 🎉 EMOJI APPRECIATION (FULL SCREEN) */
function emojiCelebrate() {
    const emojis = ["🎉", "🎓", "⭐", "👏", "🚀", "🏆"];

    for (let i = 0; i < 70; i++) {
        const span = document.createElement("span");
        span.className = "emoji";
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.right = Math.random() * 100 + "vw";
        span.style.animationDuration = 1.8 + Math.random() * 1.5 + "s";

        document.body.appendChild(span);

        setTimeout(() => span.remove(), 3000);
    }
}
