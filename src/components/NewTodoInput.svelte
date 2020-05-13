<script>
    import { db } from '../firebase';

    export let uid;

    let newTodo = '';

    function addToDb(todo) {
        db.collection('todos').add({ uid, text: todo, complete: false, created: Date.now() });
        newTodo = '';
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            addToDb(event.target.value);
        }
    }

    function handleInputChange(input) {
        newTodo = input.target.value;
    }
</script>

<style>
    .new {
        display: flex;
    }

    input {
        margin: 0;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        flex-grow: 1;
    }

    .newTodo {
        font-size: 1.2em;
        padding: .5em;
    }

    button {
        display: block;
        height: 100%;
        margin-left: -1px;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }
</style>

<div class="new">
    <input
        class="newTodo"
        placeholder="What needs to be done?"
        bind:value={newTodo}
        on:keydown="{handleKeyDown}"
        on:change="{handleInputChange}"
    >
    <div><button on:click="{() => addToDb(newTodo)}">Add</button></div>
</div>
