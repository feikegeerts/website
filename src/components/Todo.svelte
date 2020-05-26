<style>
    label {
        top: 0;
        left: 0;
        font-size: 1em;
        line-height: 1;
        padding: 0.75em;
        margin-bottom: 0.5em;
        border-radius: 4px;
        background-color: #eee;
        user-select: none;
        display: flex;
        align-items: center;
        max-width: 100%;
    }
    input {
        margin: 0;
        cursor: pointer;
    }
    .text {
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        flex-grow: 1;
        margin: 0 0.5em;
    }
    .complete .text {
        text-decoration: line-through;
        color: #757575;
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
        cursor: pointer;
        fill: #757575;
    }
    .deleteButton :global(svg) {
        width: 16px;
        height: 16px;
    }
    .complete {
        border: 2px solid #d4d4d4;
        background-color: #eee;
    }
</style>

<script>
    import DeleteIcon from '../resources/DeleteIcon.svg';

    // Props
    export let id;
    export let complete;
    export let color;
    export let text;
    export let updateStatus;
    export let removeItem;
</script>

<label
    class="{`
    ${color}
    ${complete ? 'complete' : undefined}
`}"
>
    <input
        type="checkbox"
        bind:checked="{complete}"
        on:change="{() => updateStatus(id, complete)}"
    />
    <div class="text">{text}</div>
    <button class="deleteButton" on:click="{() => removeItem(id)}">
        {@html DeleteIcon}
    </button>
</label>
