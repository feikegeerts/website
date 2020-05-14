<script>
    import { db } from '../firebase';
    import { availableColors } from '../constants.js';
    export let uid;

    let newTodo = '';
    let selectedColor = 'darkGreen';

    function addToDb() {
        let data = {
            uid,
            text: newTodo,
            complete: false,
            color: selectedColor,
            index: availableColors.indexOf(selectedColor),
            created: Date.now()
        };

        db.collection('todos').add(data);
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

    function handleColorChange(color) {
        selectedColor = color;
    }
</script>

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
        padding: .5em;
    }
    button {
        display: block;
        height: 100%;
        margin-left: -1px;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }
    .colors {
        display: flex;
        align-items: center;
        flex-basis: 100%;
        margin-bottom: 1em;
    }
    h3 {
        margin: 0;
    }
    .color {
        width: 2em;
        height: 2em;
        border-radius: 50%;
        border: 1px solid transparent;
        margin: .25rem;
        cursor: pointer;
        user-select: none;
    }
    .color.selected {
        border: 1px solid rgba(66,133,244, 1);
        box-shadow: 0 0 2px 2px rgba(66,133,244,.3);
    }
    .darkGreen {
        background-color: var(--dark-green-color);
    }
    .green {
        background-color: var(--green-color);
    }
    .yellow {
        background-color: var(--yellow-color);
    }
    .orange {
        background-color: var(--orange-color);
    }
    .red {
        background-color: var(--red-color);
    }
</style>

<div class="new">
    <h3>Color</h3>
    <div class="colors">
        {#each availableColors as color}
            <div
                class={`color ${color} ${color === selectedColor ? 'selected' : undefined}`}
                on:click="{() => handleColorChange(color)}"
            ></div>
        {/each}
    </div>
    <input
        class="newTodo"
        placeholder="What needs to be done?"
        bind:value={newTodo}
        on:keydown="{handleKeyDown}"
        on:change="{handleTodoInputChange}"
    >
    <div><button on:click="{() => addToDb()}">Add</button></div>
</div>
