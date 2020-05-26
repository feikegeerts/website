<style>
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .constraint {
        width: 100%;
        padding: 0.5rem;
    }

    @media only screen and (min-width: 768px) {
        .constraint {
            max-width: 52rem;
        }
    }
</style>

<script>
    import { Router, Route, Link } from 'svelte-routing';
    import NavLink from './components/NavLink.svelte';
    import About from './pages/About.svelte';
    import TodoLists from './pages/TodoLists.svelte';
    import Home from './pages/Home.svelte';

    // Used for SSR. A falsy value is ignored by the Router.
    export let url = '';
</script>

<svelte:head>
    <title>Todo list</title>
</svelte:head>
<div class="main">
    <div class="constraint">
        <Router url="{url}">
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="about">About</NavLink>
                <NavLink to="todo-lists">Todo Lists</NavLink>
            </nav>
            <div>
                <Route path="/" component="{Home}" />
                <Route path="about" component="{About}" />
                <Route path="todo-lists/*" component="{TodoLists}" />
            </div>
        </Router>
    </div>
</div>
