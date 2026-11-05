// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const counter = document.getElementById('counter');
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    function updateCounter() {
        const items = todoList.querySelectorAll('li:not(.completed)');
        counter.textContent = `${items.length} items left`;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const text = input.value.trim();
        
        if (text === '') {
            errorMsg.classList.remove('hidden');
            return;
        }
        
        errorMsg.classList.add('hidden');
        
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="todo-text">${text}</span>
            <button class="delete-btn">X</button>
        `;
        
        todoList.appendChild(li);
        input.value = '';
        updateCounter();
    });

    todoList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
            updateCounter();
            return;
        }
        
        if (e.target.classList.contains('todo-text')) {
            e.target.parentElement.classList.toggle('completed');
            updateCounter();
        }
    });

    filterAll.addEventListener('click', function() {
        todoList.querySelectorAll('li').forEach(li => li.style.display = 'flex');
    });

    filterActive.addEventListener('click', function() {
        todoList.querySelectorAll('li').forEach(li => {
            li.style.display = li.classList.contains('completed') ? 'none' : 'flex';
        });
    });

    filterDone.addEventListener('click', function() {
        todoList.querySelectorAll('li').forEach(li => {
            li.style.display = li.classList.contains('completed') ? 'flex' : 'none';
        });
    });
});