<script setup>
import { ref } from 'vue'
import { simulate4096 } from './components/simulator.js'

const results = ref([])
let nextId = 0

function recordResult() {
  const simulationData = simulate4096()
  const newResult = { ...simulationData, id: nextId++ }
  results.value.unshift(newResult)
}

// 結果の値に基づいてスタイルを計算する
function getResultStyle(result) {
  const maxResult = 8192
  // 結果を 1 から maxResult の範囲に正規化する
  const normalizedResult = Math.min(Math.max(result, 1), maxResult)

  // Hueを計算 (120 = 緑, 0 = 赤)
  const hue = 120 - (normalizedResult / maxResult) * 120

  const color = `hsl(${hue}, 85%, 55%)`
  const shadowColor = `hsl(${hue}, 85%, 70%)`

  return {
    color: color,
    textShadow: `0 0 12px ${shadowColor}`
  }
}
</script>

<template>
  <header>
    <h1>4096 Simulator</h1>
    <p>ボタンを押すごとに1/4096を引くまでシミュレーションを実行します。</p>
  </header>

  <main>
    <div class="controls">
      <button @click="recordResult"><span>Run Simulation</span></button>
    </div>

    <div class="results-container">
      <h2>結果</h2>
      <TransitionGroup v-if="results.length > 0" name="list" tag="ul" class="results-list">
        <li v-for="item in results" :key="item.id" class="result-item">
          <span class="timestamp">[{{ item.timestamp }}]</span>
          <span class="text">Result:</span>
          <strong class="value" :style="getResultStyle(item.result)">{{ item.result }}</strong>
          <span class="attempts">attempts</span>
        </li>
      </TransitionGroup>
    </div>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

h1 {
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-heading);
  letter-spacing: -1px;
}

header p {
  font-size: 1.1rem;
  color: var(--color-text-dark-2);
  margin-top: 0.5rem;
}

main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.controls {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

button {
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(145deg, hsla(160, 100%, 37%, 1), hsl(160, 80%, 32%));
  border: none;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.2),
    inset 0 2px 2px rgba(255, 255, 255, 0.2);
}

button:hover {
  transform: translateY(-3px);
  box-shadow:
    0 7px 20px rgba(0, 0, 0, 0.3),
    inset 0 2px 2px rgba(255, 255, 255, 0.2);
}

button:active {
  transform: translateY(-1px);
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.3),
    inset 0 2px 2px rgba(255, 255, 255, 0.2);
}

.results-container {
  background: var(--color-background-mute);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.results-container h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.results-list {
  list-style: none;
  padding: 0;
  max-height: 50vh;
  overflow-y: auto;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-radius: 10px;
  background: var(--color-background-soft);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.result-item:last-child {
  margin-bottom: 0;
}

.result-item .timestamp {
  font-size: 0.85rem;
  color: var(--color-text-dark-2);
  flex-shrink: 0;
}

.result-item .text {
  color: var(--color-text);
}

.result-item .value {
  font-size: 1.4rem;
  font-weight: 700;
}

.result-item .attempts {
  font-size: 0.9rem;
  color: var(--color-text-dark-2);
}

.no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--color-text-dark-2);
}

.no-results p {
  margin: 0;
  line-height: 1.8;
}

/* List animation */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
</style>