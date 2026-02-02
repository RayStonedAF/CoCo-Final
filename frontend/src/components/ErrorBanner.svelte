<script>
  export let message = '';
  export let onClose = () => {};

  let visible = !!message;

  $: if (message) {
    visible = true;
  }
</script>

{#if visible && message}
  <div class="error-banner" class:visible>
    <span>{message}</span>
    <button on:click={() => { visible = false; onClose(); }} class="close">✕</button>
  </div>
{/if}

<style>
  .error-banner {
    position: fixed;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    padding: 1rem;
    background: #e74c3c;
    color: white;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 200;
    animation: slideIn 0.3s ease;
  }

  .error-banner.visible {
    opacity: 1;
  }

  .close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    margin-left: 1rem;
  }

  @keyframes slideIn {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
</style>
