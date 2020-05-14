<script>
    export let uid;
    export let displayName;
    export let photoURL;
    export let signOut;
</script>

<style>
    .profile {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 1;
        margin-bottom: 1em;
    }

    .title {
        margin: .5em;
        max-width: 240px;
        text-align: center;
    }

    img {
        border-radius: 50%;
    }

    button {
        font-size: 12px;
        margin: 0;
    }
</style>

<div class="profile">
    <img src={ photoURL } width="50" alt="user avatar">
    <h3 class="title">Hi { displayName }!</h3>
    <button on:click={ () => signOut() }>Logout</button>
</div>

