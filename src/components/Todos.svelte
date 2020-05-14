<script>
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    import { db } from '../firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith, reduce } from 'rxjs/operators';
    import Todo from './Todo.svelte';

    // User ID passed from parent
    export let uid;

    const query = db.collection('todos').where('uid', '==', uid).orderBy('index', 'asc').orderBy('created', 'desc');
    const todos = collectionData(query, 'id').pipe(startWith([]));

    function updateStatus(id, status) {
        db.collection('todos').doc(id).update({complete: status});
    }

    function removeItem(id) {
        db.collection('todos').doc(id).delete();
    }

    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
            };
        }
    });
</script>

<style>
    .wrapper {
        margin-top: 2em;
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

    .colorLine {
        height: 6px;
        border-radius: 6px;
        flex-basis: 100%;
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

    .left, .right {
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
            margin-right: .25em;
        }

        .right :global(label) {
            margin-left: .25em;
        }

        .left, .right {
            flex-basis: 50%;
        }
    }
</style>

<div class="wrapper">
    <div class="headings">
        <div class='left center'><h2>Todo</h2></div>
        <div class='right center'><h2>Done</h2></div>
    </div>
    {#each $todos.reduce((acc, todo) => {
        if(!acc.includes(todo.color)) {
            acc.push(todo.color);
        }
        return acc;
    }, []) as color (color) }
        <div class="board" in:receive="{{key: color}}" out:send="{{key: color}}" animate:flip>
            <div class='left'>
                {#each $todos.filter(t => !t.complete && t.color === color) as todo (todo.id)}
                    <div in:receive="{{key: todo.id}}" out:send="{{key: todo.id}}" animate:flip >
                        <Todo {...todo} updateStatus={updateStatus} removeItem={removeItem} />
                    </div>
                {/each}
            </div>
            <div class='right'>
                {#each $todos.filter(t => t.complete && t.color === color) as todo (todo.id)}
                    <div in:receive="{{key: todo.id}}" out:send="{{key: todo.id}}" animate:flip >
                        <Todo {...todo} updateStatus={updateStatus} removeItem={removeItem} />
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>

