<style>
    .wrapper {
        margin-top: 2em;
    }

    .board {
        display: flex;
        flex-wrap: wrap;
        border-radius: 1em;
        margin: 1em 0;
    }

    .headings {
        display: none;
    }

    .left,
    .right {
        flex-basis: 100%;
        flex-grow: 1;
    }

    .center {
        display: flex;
        justify-content: center;
    }

    @media only screen and (min-width: 768px) {
        .headings {
            display: flex;
        }

        .left :global(label) {
            margin-right: 0.25em;
        }

        .right :global(label) {
            margin-left: 0.25em;
        }

        .left,
        .right {
            flex-basis: 50%;
        }
    }
</style>

<script>
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { db, decrement } from '../firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    import Todo from './Todo.svelte';

    export let listId;
    let todos;
    let listTitle;

    if (listId) {
        const todoQuery = db
            .collection('todoLists')
            .doc(listId)
            .collection('todos');
        todos = collectionData(todoQuery, 'id').pipe(startWith([]));
    }

    function updateStatus(id, status) {
        db.collection('todoLists')
            .doc(listId)
            .collection('todos')
            .doc(id)
            .update({ complete: status });
    }

    function removeItem(id) {
        db.collection('todoLists')
            .doc(listId)
            .collection('todos')
            .doc(id)
            .delete();
        db.collection('todoLists')
            .doc(listId)
            .update({ numberOfTodos: decrement });
    }

    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
            };
        },
    });
</script>

<div class="wrapper">
    <div class="headings">
        <div class="left center">
            <h2>Todo</h2>
        </div>
        <div class="right center">
            <h2>Done</h2>
        </div>
    </div>
    <div class="board">
        <div class="left">
            {#each $todos.filter((t) => !t.complete) as todo (todo.id)}
                <div
                    in:receive|local="{{ key: todo.id }}"
                    out:send|local="{{ key: todo.id }}"
                    animate:flip
                >
                    <Todo
                        {...todo}
                        updateStatus="{updateStatus}"
                        removeItem="{removeItem}"
                    />
                </div>
            {/each}
        </div>
        <div class="right">
            {#each $todos.filter((t) => t.complete) as todo (todo.id)}
                <div
                    in:receive|local="{{ key: todo.id }}"
                    out:send|local="{{ key: todo.id }}"
                    animate:flip
                >
                    <Todo
                        {...todo}
                        updateStatus="{updateStatus}"
                        removeItem="{removeItem}"
                    />
                </div>
            {/each}
        </div>
    </div>
</div>
