<script>
  export let tabs = [];
  export let activeTab = 0;
  export let onChange = () => {};
</script>

<div class="tabs">
  {#each tabs as tab, index}
    <button
      class="tab-button"
      class:active={index === activeTab}
      on:click={() => onChange(index)}
    >
      {tab}
    </button>
  {/each}
</div>

<style>
  .tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid #6b4d3d;
    margin: 1.5rem 0 1rem 0;
  }

  .tab-button {
    flex: 1;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: #a89878;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab-button:hover {
    color: #d4a574;
  }

  .tab-button.active {
    color: #d4a574;
    border-bottom-color: #d4a574;
  }
</style>
