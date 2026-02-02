<script>
  export let value = '';
  export let onSearch = () => {};

  let searchTimeout;

  function handleInput(e) {
    value = e.target.value;
    clearTimeout(searchTimeout);
    if (value.trim()) {
      searchTimeout = setTimeout(() => {
        onSearch(value);
      }, 300);
    }
  }
</script>

<div class="search-bar">
  <input
    type="text"
    placeholder="Type here"
    {value}
    on:input={handleInput}
    class="search-input"
  />
  <img src="/search.svg" alt="Search" class="search-icon" />
</div>

<style>
  .search-bar {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: rgba(212, 165, 116, 0.15);
    border: 1px solid #6b4d3d;
    border-radius: 2rem;
    color: #f5f1e8;
    font-size: 1rem;
  }

  .search-input::placeholder {
    color: #a89878;
  }

  .search-input:focus {
    outline: none;
    border-color: #d4a574;
    box-shadow: 0 0 0 2px rgba(212, 165, 116, 0.2);
  }

  .search-icon {
    position: absolute;
    right: 1rem;
    font-size: 1.2rem;
    pointer-events: none;
    width: 20px;
    height: 20px;
  }
</style>
