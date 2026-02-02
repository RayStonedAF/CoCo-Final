<script>
  export let text = 'Loading...';
</script>

<div class="loading-container">
  <div class="spinner"></div>
  <p>{text}</p>
</div>

<style>
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    min-height: 60vh;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #6b4d3d;
    border-top: 4px solid #d4a574;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  p {
    color: #d4a574;
    font-size: 1.1rem;
    text-align: center;
  }
</style>
