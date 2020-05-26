<style>
    .new {
        display: flex;
        flex-wrap: wrap;
    }
    input {
        margin: 0;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        flex-grow: 1;
        font-weight: 300;
    }
    .newTodo {
        font-size: 1.2em;
        padding: 0.5em;
    }
    button {
        display: block;
        height: 100%;
        margin-left: -1px;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }
    h3 {
        margin: 0;
    }
</style>

<script>
    import { db, increment } from '../firebase';

    import { user } from '../stores/mainStore.js';

    // Props
    export let listId;

    let userValue;
    const unsubscribe = user.subscribe((value) => {
        userValue = value;
    });

    // Definitions
    let newTodo = '';

    function addToDb() {
        let data = {
            uid: userValue.uid,
            text: newTodo,
            complete: false,
            created: Date.now(),
        };

        db.collection('todoLists').doc(listId).collection('todos').add(data);
        db.collection('todoLists')
            .doc(listId)
            .update({ numberOfTodos: increment });
        newTodo = '';
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            addToDb();
        }
    }

    function handleTodoInputChange(input) {
        newTodo = input.target.value;
    }
</script>

<div class="new">
    <input
        class="newTodo"
        placeholder="What needs to be done?"
        bind:value="{newTodo}"
        on:keydown="{handleKeyDown}"
        on:change="{handleTodoInputChange}"
    />
    <div>
        <button on:click="{() => addToDb()}">Add</button>
    </div>
</div>
