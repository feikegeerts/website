<script>
    import { Router, Route, Link } from 'svelte-routing';

    // Components
    import Profile from '../components/Profile.svelte';
    import GoogleLoginButton from '../components/GoogleLoginButton.svelte';
    import NewTodoInput from '../components/NewTodoInput.svelte';
    import Todos from '../components/Todos.svelte';
    import TodoLists from '../components/TodoLists.svelte';

    // Store
    import { user } from '../stores/mainStore.js';
    import TodoListTitle from '../components/TodoListTitle.svelte';

    let userValue;
    const unsubscribe = user.subscribe((value) => {
        userValue = value;
    });

    //TODO: Colors should have non color names
    //TODO: Make lists a dropdown
    //TODO: Styling
</script>

<div>
    {#if userValue}
        <Router url="/todo-lists/">
            <Profile />
            <Route path="/" let:params>
                <TodoLists />
            </Route>
            <Route path="/:listId" let:params>
                <Link to="/todo-lists/">Back to all lists</Link>
                <TodoListTitle listId="{params.listId}" />
                <NewTodoInput listId="{params.listId}" />
                <Todos listId="{params.listId}" />
            </Route>
        </Router>
    {:else}
        <GoogleLoginButton />
    {/if}
</div>
