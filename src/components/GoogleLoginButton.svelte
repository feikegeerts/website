<style>
    button {
        display: flex;
        align-items: center;
        cursor: pointer;
        border: 0;
        border-radius: 1px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
        box-sizing: border-box;
        transition: background-color 0.218s, border-color 0.218s,
            box-shadow 0.218s;
        -webkit-user-select: none;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        outline: none;
        overflow: hidden;
        position: relative;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        width: auto;
        padding: 0.25rem;
    }

    button:hover {
        box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        padding: 8px;
    }

    .buttonText {
        display: inline-block;
        vertical-align: middle;
        font-family: 'Roboto', sans-serif;
        letter-spacing: 0.21px;
        margin-left: 6px;
        margin-right: 6px;
        color: #757575;
        font-size: 13px;
        line-height: 34px;
    }
</style>

<script>
    import { authState } from 'rxfire/auth';
    import { auth, googleProvider } from '../firebase';

    import GoogleIcon from '../resources/GoogleIcon.svg';

    import { user } from '../stores/mainStore.js';

    const unsubscribe = authState(auth).subscribe((u) => user.set(u));

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<button on:click="{login}">
    <span class="icon">
        {@html GoogleIcon}
    </span>
    <span class="buttonText">Sign in with Google</span>
</button>
