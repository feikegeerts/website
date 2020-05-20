<script>
    import { db } from '../firebase';
    import { docData } from 'rxfire/firestore';
    import { navigate } from 'svelte-routing';

    import DeleteIcon from '../resources/DeleteIcon.svg'

    export let listId;
    let list;

    if(listId) {
        const listQuery = db.collection('todoLists').doc(listId);
        list = docData(listQuery, 'id');
    }

    function removeItem() {
        if(confirm("Pressing ok will delete the todo list.")) {
            db.collection('todoLists').doc(listId).delete();
            navigate('/todo-lists');
        }
    }

</script>

<style>
    .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .deleteButton {
        height: 1em;
        margin: 0;
        box-sizing: border-box;
        padding: 0 0.5em;
        line-height: 1;
        background-color: transparent;
        border: none;
        cursor: pointer;
        fill: #757575;
    }
    .deleteButton :global(svg) {
        width: 24px;
        height: 24px;
    }
</style>

{#if $list}
    <div class="wrapper">
        <h1>{$list.title}</h1>
        <button class="deleteButton" on:click="{() => removeItem()}">
            {@html DeleteIcon}
        </button>
    </div>
{/if}
