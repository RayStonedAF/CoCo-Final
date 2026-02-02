<script>
  export let message;
  export let isUser = false;
</script>

<div class="chat-bubble" class:user={isUser}>
  <p>{message}</p>
</div>

<style>
  .chat-bubble {
    display: flex;
    justify-content: flex-start;
    margin: 0.75rem 0;
  }

  .chat-bubble.user {
    justify-content: flex-end;
  }

  p {
    max-width: 80%;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    margin: 0;
    word-wrap: break-word;
    line-height: 1.4;
  }

  .chat-bubble p {
    background: #1a1410;
    border: 1px solid #6b4d3d;
    color: #f5f1e8;
  }

  .chat-bubble.user p {
    background: #d4a574;
    color: #2a2015;
    border: none;
  }
</style>
