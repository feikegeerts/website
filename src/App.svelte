<script>
	import { auth, googleProvider } from './firebase';
	import { authState } from 'rxfire/auth';

	import Profile from './Profile.svelte';
	import Todos from './Todos.svelte';
	import NewTodo from './NewTodoInput.svelte';

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
		padding: .5em;
	}

	button {
		cursor: pointer;
	}

	@media only screen and (min-width: 768px) {
		.constraint {
			max-width: 52em;
		}
	}
</style>

<div class="main">
	<div class="constraint">
		{#if user}
			<Profile uid={user.uid} displayName={user.displayName} photoURL={user.photoURL} signOut={() => auth.signOut()} />
			<NewTodo uid={user.uid} />
			<Todos uid={user.uid} />
		{:else}
			<button on:click={login}>
				Signin with Google
			</button>
		{/if}
	</div>
</div>
