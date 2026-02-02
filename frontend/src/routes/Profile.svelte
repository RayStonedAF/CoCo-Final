<script>
  import Header from '../components/Header.svelte';
  import BottomNav from '../components/BottomNav.svelte';
  import ToggleSwitch from '../components/ToggleSwitch.svelte';
  import RadioGroup from '../components/RadioGroup.svelte';
  import { userStore } from '../stores/userStore.js';
  import { favoritesStore } from '../stores/favoritesStore.js';
  import { triedStore } from '../stores/triedStore.js';

  let userName = 'Ray';
  let userSettings = {};
  let favCount = 0;
  let triedCount = 0;

  userStore.subscribe(user => {
    userName = user.name;
    userSettings = user.settings;
  });

  favoritesStore.subscribe(fav => {
    favCount = fav.length;
  });

  triedStore.subscribe(count => {
    triedCount = count;
  });

  function changeName() {
    const newName = prompt('Enter your name:', userName);
    if (newName && newName.trim()) {
      userStore.setName(newName.trim());
    }
  }

  function handleMeasuringUnitChange(value) {
    userStore.updateSettings({ measuringUnit: value });
  }

  function handleTextToSpeechChange(value) {
    userStore.updateSettings({ textToSpeech: value });
  }
</script>

<Header />

<div class="page-container">
  <h1>Profile</h1>

  <div class="profile-section">
    <div class="name-section">
      <p class="label">User</p>
      <h2>{userName}</h2>
      <button on:click={changeName} class="change-btn">Change Profiles</button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <p class="stat-label">Favorites</p>
        <p class="stat-value">{favCount}</p>
        <span class="stat-unit">recipes</span>
      </div>
      <div class="stat-card">
        <p class="stat-label">Tried</p>
        <p class="stat-value">{triedCount}</p>
        <span class="stat-unit">recipes</span>
      </div>
    </div>
  </div>

  <div class="settings-section">
    <h3>Settings</h3>

    <RadioGroup
      label="Measuring Unit"
      options={[
        { label: 'Metric: mg/ml', value: 'metric' },
        { label: 'Imperial: lbs/oz', value: 'imperial' }
      ]}
      selected={userSettings.measuringUnit}
      onChange={handleMeasuringUnitChange}
    />

    <div class="toggle-setting">
      <ToggleSwitch
        label="Text to Speech"
        checked={userSettings.textToSpeech}
        onChange={handleTextToSpeechChange}
      />
    </div>
  </div>
</div>

<BottomNav />

<style>
  .page-container h1 {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .profile-section {
    margin-bottom: 2rem;
  }

  .name-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  .label {
    color: #a89878;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .name-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .change-btn {
    padding: 0.5rem 1.25rem;
    background: #d4a574;
    border: 1px solid #d4a574;
    border-radius: 0.5rem;
    color: #2a2015;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .change-btn:hover {
    background: #e8c8a0;
    border-color: #e8c8a0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    border: 1px solid #6b4d3d;
    border-radius: 0.75rem;
    padding: 1.5rem;
    text-align: center;
  }

  .stat-label {
    color: #a89878;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #d4a574;
    margin: 0.5rem 0;
  }

  .stat-unit {
    color: #a89878;
    font-size: 0.85rem;
  }

  .settings-section {
    margin-top: 2rem;
  }

  .settings-section h3 {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .toggle-setting {
    margin: 1.5rem 0;
  }

  @media (min-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
