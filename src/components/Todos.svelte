<script>
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    import { db } from '../firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';
    import Todo from './Todo.svelte';

    // User ID passed from parent
    export let uid;

    const query = db.collection('todos').where('uid', '==', uid).orderBy('created', 'desc');
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
    .board {
        display: flex;
        flex-wrap: wrap;
    }

    .left, .right {
        flex-basis: 100%;
        flex-grow: 1;
    }

    @media only screen and (min-width: 768px) {

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

<div class='board'>
    <div class='left'>
        <h2>Todo</h2>
        {#each $todos.filter(t => !t.complete) as todo (todo.id)}
            <div in:receive="{{key: todo.id}}" out:send="{{key: todo.id}}" animate:flip >
                <Todo {...todo} updateStatus={updateStatus} removeItem={removeItem} />
            </div>
        {/each}
    </div>

    <div class='right'>
        <h2>Done</h2>
        {#each $todos.filter(t => t.complete)  as todo (todo.id)}
            <div in:receive="{{key: todo.id}}" out:send="{{key: todo.id}}" animate:flip >
                <Todo {...todo} updateStatus={updateStatus} removeItem={removeItem} />
            </div>
        {/each}
    </div>
</div>
