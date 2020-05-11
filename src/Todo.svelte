<script>
    export let uid;
    export let id;
    export let complete;
    export let created;
    export let text;
    export let updateStatus;
    export let removeItem;
</script>

<style>
    label {
        top: 0;
        left: 0;
        font-size: 1em;
        line-height: 1;
        padding: .75em;
        margin-bottom: .5em;
        border-radius: 2px;
        background-color: #eee;
        user-select: none;
        display: flex;
        align-items: center;
        max-width: 100%;
    }

    .complete {
        background-color: rgb(180, 240, 100);
    }

    input {
        margin: 0;
        cursor: pointer;
    }

    .text {
        flex-grow: 1;
        margin: 0 .5em;
    }

    .deleteButton {
        float: right;
        height: 1em;
        margin: 0;
        box-sizing: border-box;
        padding: 0 0.5em;
        line-height: 1;
        background-color: transparent;
        border: none;
        color: rgb(170, 30, 30);
        cursor: pointer;
    }
</style>

<label class={complete ? "complete" : undefined }>
    <input
        type=checkbox
        bind:checked={complete}
        on:change={() => updateStatus(id, complete)}
    >
    <div class="text">{text}</div>
    <button class="deleteButton" on:click="{() => removeItem(id)}">x</button>
</label>
