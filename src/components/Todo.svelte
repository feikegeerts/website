<script>
    import moment from 'moment';

    export let uid;
    export let id;
    export let index;
    export let complete;
    export let color;
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
        margin: 0 .5em;
    }

    .complete .text,
    .complete .created {
        text-decoration: line-through;
        color: #757575;
    }

    .created {
        font-size: 11px;
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

    .darkGreen {
        border: 2px solid var(--dark-green-color);
    }
    .green {
        border: 2px solid var(--green-color);
    }
    .yellow {
        border: 2px solid var(--yellow-color);
    }
    .orange {
        border: 2px solid var(--orange-color);
    }
    .red {
        border: 2px solid var(--red-color);
    }
    .complete {
        border: 2px solid #d4d4d4;
        background-color: #eee;
    }
</style>

<label class={`
    ${color}
    ${complete ? "complete" : undefined}
`}>
    <input
        type=checkbox
        bind:checked={complete}
        on:change={() => updateStatus(id, complete)}
    >
    <div class="text">
        {text}
    </div>
    <div class="created">
        <span class="Date">{moment(created).format('DD MMMM YYYY')}</span>
        <span class="Time">{moment(created).format('HH:mm')}</span>
    </div>
    <button class="deleteButton" on:click="{() => removeItem(id)}">x</button>
</label>
