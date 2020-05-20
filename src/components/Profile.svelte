<script>
    import { auth } from '../firebase';
    import { user } from '../stores/mainStore.js';

    let userValue;
    const unsubscribe = user.subscribe(value => {
        userValue = value;
    });

    function signOut() {
        auth.signOut();
    }
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
    <img src={ userValue.photoURL } width="50" alt="user avatar">
    <h3 class="title">Hi { userValue.displayName }!</h3>
    <button on:click="{ signOut }">Logout</button>
</div>

