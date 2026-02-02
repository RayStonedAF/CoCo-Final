<script>
  import { onMount, getContext } from 'svelte';
  import Header from '../components/Header.svelte';
  import BottomNav from '../components/BottomNav.svelte';
  import ChatBubble from '../components/ChatBubble.svelte';
  import ErrorBanner from '../components/ErrorBanner.svelte';
  import { api } from '../lib/api.js';
  import { userStore } from '../stores/userStore.js';
  import micIcon from '../assets/mic.svg';

  const goto = getContext('goto');
  let messages = [];
  let inputValue = '';
  let loading = false;
  let error = '';
  let userName = 'friend';
  let textToSpeech = false;
  let listeningForVoice = false;

  userStore.subscribe(user => {
    userName = user.name;
    textToSpeech = user.settings.textToSpeech;
  });

  onMount(() => {
    // Initial message from CoCo
    messages = [
      {
        role: 'assistant',
        content: `Hey ${userName}, what do you want to cook today?`,
        isUser: false
      }
    ];
  });

  async function sendMessage() {
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = inputValue;
    messages = [...messages, { role: 'user', content: userMsg, isUser: true }];
    inputValue = '';

    try {
      loading = true;

      // Build messages array with system context (like reference code)
      const messagesToSend = [
        {
          role: 'system',
          content: `You are CoCo, a friendly and encouraging cooking companion AI. You help ${userName} find recipes, answer cooking questions, and provide encouragement. Keep responses concise and friendly. End with a cooking tip or encouragement when appropriate.`
        },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ];

      // Call backend
      const response = await api.chatWithCoco(messagesToSend, userName);

      // Add assistant response
      const assistantMsg = response.reply || 'I\'m not sure how to respond to that.';
      messages = [
        ...messages,
        { role: 'assistant', content: assistantMsg, isUser: false }
      ];

      // Read response if TTS enabled
      if (textToSpeech) {
        const utterance = new SpeechSynthesisUtterance(assistantMsg);
        utterance.rate = 0.95;
        speechSynthesis.speak(utterance);
      }

      loading = false;
    } catch (err) {
      console.error('Chat error:', err);
      error = err.message;
      loading = false;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
      error = 'Speech recognition not supported in your browser';
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.onstart = () => {
      listeningForVoice = true;
    };
    recognition.onend = () => {
      listeningForVoice = false;
    };
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('');
      inputValue = transcript;
    };
    recognition.start();
  }

  function handleCloseError() {
    error = '';
  }
</script>

<Header />

<div class="page-container chat-page">
  <h1>CoCo says hello!</h1>

  <div class="chat-container">
    <div class="greeting-box">
      <p>Hey {userName}, what do you want to cook today?</p>
    </div>

    {#if error}
      <ErrorBanner message={error} onClose={handleCloseError} />
    {/if}

    <div class="messages">
      {#each messages as msg}
        <ChatBubble message={msg.content} isUser={msg.isUser} />
      {/each}
    </div>

    <div class="input-area">
      {#if listeningForVoice}
        <div class="listening-indicator">
          🎤 Listening...
        </div>
      {/if}
      <div class="input-row">
        <textarea
          bind:value={inputValue}
          on:keydown={handleKeydown}
          placeholder="Type here"
          class="chat-input"
          disabled={loading}
        />
        <button
          on:click={startVoiceInput}
          class="voice-btn"
          title="Voice input"
          disabled={loading || listeningForVoice}
        >
          <img src={micIcon} alt="microphone" class="mic-icon" />
        </button>
      </div>
      <button
        on:click={sendMessage}
        class="send-btn"
        disabled={loading || !inputValue.trim()}
      >
        {loading ? '...' : 'Send'}
      </button>
    </div>
  </div>
</div>

<BottomNav />

<style>
  .chat-page {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .chat-page h1 {
    margin: 0 0 1rem 0;
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  }

  .greeting-box {
    background: #1a1410;
    border: 1px solid #6b4d3d;
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
  }

  .greeting-box p {
    margin: 0;
    color: #a89878;
    font-style: italic;
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    overflow-y: auto;
    max-height: 400px;
  }

  .input-area {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #6b4d3d;
  }

  .listening-indicator {
    text-align: center;
    color: #d4a574;
    font-weight: 500;
    margin-bottom: 0.5rem;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .input-row {
    display: flex;
    gap: 0.5rem;
  }

  .chat-input {
    flex: 1;
    padding: 0.75rem;
    background: rgba(212, 165, 116, 0.1);
    border: 1px solid #6b4d3d;
    border-radius: 0.5rem;
    color: #f5f1e8;
    font-family: inherit;
    font-size: 0.95rem;
    resize: none;
    height: 56px;
    display: flex;
    align-items: center;
  }

  .chat-input:focus {
    outline: none;
    border-color: #d4a574;
  }

  .chat-input:disabled {
    opacity: 0.6;
  }

  .voice-btn {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 0;
    background: #d4a574;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mic-icon {
    width: 28px;
    height: 28px;
    color: #2a2015;
  }

  .voice-btn:hover:not(:disabled) {
    background: #e8c8a0;
  }

  .voice-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .send-btn {
    width: 100%;
    padding: 0.75rem;
    background: #d4a574;
    border: none;
    border-radius: 0.5rem;
    color: #2a2015;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 0.5rem;
  }

  .send-btn:hover:not(:disabled) {
    background: #e8c8a0;
  }

  .send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    .messages {
      max-height: 500px;
    }
  }
</style>
