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
        flex-shrink: 1;
        margin-bottom: 1em;
    }

    .info {
        margin: .5em;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    h3 {
        margin-bottom: .5em;
    }

    img {
        border-radius: 50%;
    }

    button {
        font-size: 12px;
    }
</style>

<div class="profile">
    <img src={ photoURL } width="50" alt="user avatar">
    <div class="info">
        <h3>Hi { displayName }!</h3>
        <div><button on:click={ () => signOut() }>Logout</button></div>
    </div>
</div>

