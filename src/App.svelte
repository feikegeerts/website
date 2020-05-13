<script>
	import { auth, googleProvider } from './firebase';
	import { authState } from 'rxfire/auth';

	import Profile from './components/Profile.svelte';
	import Todos from './components/Todos.svelte';
	import NewTodo from './components/NewTodoInput.svelte';
	import GoogleLoginButton from './components/GoogleLoginButton.svelte';

	let user;

	const unsubscribe = authState(auth).subscribe(u => user = u);

	function login() {
		auth.signInWithPopup(googleProvider);
	}
</script>

<style>
	.main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.constraint {
		width: 100%;
		padding: .5rem;
	}

	@media only screen and (min-width: 768px) {
		.constraint {
			max-width: 52rem;
		}
	}
</style>

<svelte:head>
	<title>Todo list</title>
</svelte:head>
<div class="main">
	<div class="constraint">
		{#if user}
			<Profile uid={user.uid} displayName={user.displayName} photoURL={user.photoURL} signOut={() => auth.signOut()} />
			<NewTodo uid={user.uid} />
			<Todos uid={user.uid} />
		{:else}
			<GoogleLoginButton login={login} />
		{/if}
	</div>

</div>
