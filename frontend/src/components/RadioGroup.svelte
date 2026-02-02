<script>
  export let label = '';
  export let options = [];
  export let selected = null;
  export let onChange = () => {};
</script>

<fieldset class="radio-group">
  {#if label}
    <legend>{label}</legend>
  {/if}
  <div class="options">
    {#each options as option (option.value)}
      <label class="option">
        <input
          type="radio"
          name={label}
          value={option.value}
          checked={selected === option.value}
          on:change={() => onChange(option.value)}
        />
        <span>{option.label}</span>
      </label>
    {/each}
  </div>
</fieldset>

<style>
  .radio-group {
    border: 1px solid #6b4d3d;
    border-radius: 0.75rem;
    padding: 1rem;
    margin: 1rem 0;
  }

  legend {
    color: #f5f1e8;
    font-weight: 600;
    padding: 0 0.5rem;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
  }

  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #6b4d3d;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  input:hover {
    border-color: #d4a574;
  }

  input:checked {
    border-color: #d4a574;
    background: #d4a574;
  }

  span {
    color: #f5f1e8;
  }
</style>
