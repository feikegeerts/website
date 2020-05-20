<script>
    import { db } from '../firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith, reduce } from 'rxjs/operators';
    import { navigate } from 'svelte-routing';

    import ListIcon from '../resources/ListIcon.svg';
    import PlusIcon from '../resources/PlusIcon.svg';

    // Stores
    import { user } from '../stores/mainStore.js';

    let userValue;
    let todoLists;
    let newListTitle = 'New List';

    const unsubscribe = user.subscribe(value => {
        userValue = value;
    });

    if(userValue) {
        const query = db.collection('todoLists').where('uid', '==', userValue.uid).orderBy('created', 'asc');
        todoLists = collectionData(query, 'id').pipe(startWith([]));
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            addToDoList();
        }
    }

    function handleListInputChange(input) {
        newListTitle = input.target.value;
    }

    function addToDoList(e) {
        let data = {
            uid: userValue.uid,
            title: newListTitle,
            created: Date.now(),
            numberOfTodos: 0,
        };

        db.collection('todoLists').add(data);
        newListTitle = 'New List';
    }

    function navigateTo(url) {
        navigate(url);
    }

    function handleInputFocus() {
        this.setSelectionRange(0, this.value.length)
    }
</script>

<style>
    .listItem {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        border-bottom: 1px solid var(--dark-green-color);
    }

    .listItem:hover,
    .listItem:active,
    .listItem:focus {
        fill: var(--dark-green-color);
        cursor: pointer;
        color: var(--dark-green-color);
    }


    .description {
        display: flex;
        align-items: center;
        text-transform: capitalize;
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 16px;
        height: 16px;
        margin-right: 18px;
    }

    .newTodoList {
        flex-grow: 1;
        border: 0;
        padding: 12px 48px 12px 48px;
        margin: 0;
        border-bottom: 1px solid var(--dark-green-color);
        z-index: 1;
    }

    .newTodoList:focus {
        border: 0;
        outline: 0;
        -moz-appearance: none;
        border-bottom: 1px solid var(--orange-color);
    }

    .newWrapper {
        position: relative;
        display: flex;
        justify-content: space-between;
    }

    .newWrapper .icon {
        position: absolute;
        left: 0;
        margin: 12px;
        z-index: 2;
    }

    .addButton {
        display: none;
        position: absolute;
        right: 0;
        text-transform: uppercase;
        margin: 12px;
        z-index: 2;
        cursor: pointer;
    }

    .addButton.visible {
        display: block;
    }
</style>

<div>
    {#each $todoLists as todoList}
        <div class="listItem" on:click={navigateTo(`/todo-lists/${todoList.id}`)}>
            <div class="description">
                <span class="icon">{@html ListIcon}</span>
                <span class="navigate">{todoList.title}</span>
            </div>
            <div>{todoList.numberOfTodos}</div>
        </div>
    {/each}
    <div class="newWrapper">
        <input
            class="newTodoList"
            placeholder="Add new todo list"
            bind:value={newListTitle}
            on:keydown="{handleKeyDown}"
            on:change="{handleListInputChange}"
            on:click={handleInputFocus}
        >
        <div class="icon">{@html PlusIcon}</div>
        <div class="{`addButton ${newListTitle !== 'New List' ? 'visible' : ''}`}" on:click={addToDoList}>add</div>
    </div>
</div>
