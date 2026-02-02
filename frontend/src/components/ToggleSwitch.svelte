<script>
  export let label = '';
  export let checked = false;
  export let onChange = () => {};
  export let id = Math.random().toString(36).substr(2, 9);
</script>

<label class="toggle-switch" for={id}>
  <input type="checkbox" {id} {checked} on:change={() => onChange(!checked)} />
  <span class="slider"></span>
  <span class="label">{label}</span>
</label>

<style>
  .toggle-switch {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
  }

  input {
    display: none;
  }

  .slider {
    width: 50px;
    height: 26px;
    background: #6b4d3d;
    border-radius: 13px;
    position: relative;
    transition: background 0.3s;
  }

  .slider::before {
    content: '';
    position: absolute;
    width: 22px;
    height: 22px;
    background: #d4a574;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: left 0.3s;
  }

  input:checked ~ .slider {
    background: #d4a574;
  }

  input:checked ~ .slider::before {
    left: 26px;
    background: #2a2015;
  }

  .label {
    color: #f5f1e8;
    font-weight: 500;
  }
</style>
