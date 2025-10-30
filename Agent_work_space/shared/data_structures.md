# 共有データ構造定義

このファイルは全エージェントが参照する共通のデータ構造を定義します。

**重要**: このゲームは**セルフモニタリング（自己観察）**と**作業療法**、**復職体験の模倣**を目的としています。

---

## ステータス構造（提案/ドラフト）

```javascript
// プレイヤーステータス
const PlayerStatus = {
  // 基本ステータス
  hp: {
    current: 100,
    max: 100,
    visibility: 'numeric' // 'hidden', 'redacted', 'level', 'numeric'
  },
  mp: {
    current: 100,
    max: 100,
    visibility: 'hidden', // 初期は非表示
    internalValue: 100    // 内部の潜在値
  },
  
  // 心理的ステータス
  fatigue: {          // 疲労度
    current: 0,
    max: 100,
    visibility: 'hidden'
  },
  mood: {             // 気分
    current: 50,
    max: 100,
    visibility: 'hidden'
  },
  health: {           // 体調
    current: 80,
    max: 100,
    visibility: 'hidden'
  },
  anxiety: {          // 不安度
    current: 20,
    max: 100,
    visibility: 'hidden'
  },
  arousal: {          // 覚醒度
    current: 50,
    max: 100,
    visibility: 'hidden'
  },
  emotion: {          // 感情
    current: 50,
    max: 100,
    visibility: 'hidden'
  },
  physicalReaction: { // 身体的反応
    current: 10,
    max: 100,
    visibility: 'hidden'
  },
  cognitiveBias: {    // 考えの偏り度
    current: 30,
    max: 100,
    visibility: 'hidden'
  },
  dichotomousThinking: { // 白黒思考度
    current: 40,
    max: 100,
    visibility: 'hidden'
  },
  
  // 特殊ステータス
  mode: null,         // 'rabbit', 'turtle', 'cobra', null
  
  // 位置情報
  position: {
    x: 10,
    y: 7
  }
};
```

---

## セルフモニタリングレベル定義（自己理解の深化）

```javascript
const MonitoringLevel = {
  UNAWARE: 'unaware',     // 気づかない（非表示）
  VAGUE: 'vague',         // なんとなく分かる（黒塗り）
  ROUGH: 'rough',         // おおよそ分かる（三段階）
  PRECISE: 'precise'      // 正確に把握（数値）
};

// 自己理解の段階的表現
const SelfAwarenessStage = {
  UNAWARE: {
    display: null,        // 何も表示されない
    message: '自分の状態が分からない'
  },
  VAGUE: {
    display: '███',       // 黒塗り
    message: 'なんとなく感じる'
  },
  ROUGH: {
    display: 'level',     // 三段階表記
    message: 'おおよその状態が分かる'
  },
  PRECISE: {
    display: 'numeric',   // 数値
    message: '正確に把握できる'
  }
};

// 三段階表記の変換
function convertToLevel(value, max) {
  const ratio = value / max;
  if (ratio >= 0.7) return 'たくさん';
  if (ratio >= 0.3) return 'ふつう';
  return 'ほとんど無い';
}
```

---

## NPCデータ構造（提案/ドラフト）

```javascript
const NPC = {
  id: 'string',           // 一意識別子
  name: 'string',         // 表示名
  position: {
    x: 0,
    y: 0
  },
  sprite: 'emoji',        // 表示用絵文字/画像
  compatibility: 'normal', // 'friendly', 'normal', 'difficult'
  mpCost: 5,              // 会話時のMP減少量
  dialogues: [            // 会話データ
    {
      id: 'greeting',
      text: 'セリフ',
      next: 'response_1',  // 次の会話ID
      choices: null        // 選択肢がある場合
    }
  ],
  hasSpoken: false        // 会話済みフラグ
};
```

---

## おばけデータ構造（提案/ドラフト）

```javascript
const Ghost = {
  id: 'string',
  type: 'anxiety',        // 'anxiety', 'tension', etc.
  name: '不安のおばけ',
  position: {
    x: 0,
    y: 0
  },
  sprite: '👻',
  
  // 戦闘関連
  hp: {
    current: 100,
    max: 100
  },
  autoRegenRate: 5,       // 毎ターンのHP回復量
  
  // 弱点（専用対処方法）
  weaknesses: [
    'cognitive_restructuring',  // 認知再構成
    'mindfulness'               // マインドフルネス
  ],
  
  // 行動パターン
  actions: [
    {
      name: '不安を煽る',
      effect: { anxiety: +10, mp: -5 }
    }
  ],
  
  defeated: false
};
```

---

## アイテムデータ構造（提案/ドラフト）

```javascript
const Item = {
  id: 'string',
  name: 'string',
  type: 'recovery',       // 'recovery', 'tablet', 'clear', 'trap'
  sprite: '🍖',
  position: {
    x: 0,
    y: 0
  },
  
  // 効果
  effect: {
    hp: 0,
    mp: 20,
    fatigue: -10,
    // ... その他のステータス変化
  },
  
  // 石板の場合（セルフモニタリングを促進）
  unlocks: null,          // 例: { status: 'mp', level: 'vague' }
  
  // CBT知見とセルフモニタリング（石板の場合）
  knowledge: {
    title: 'セルフモニタリング',
    description: '自分の状態を観察することの重要性...',
    technique: 'self_monitoring',
    awarenessMessage: 'MPの存在に気づいた！なんとなく感じるようになった。'
  },
  
  collected: false
};
```

---

## イベントデータ構造（提案/ドラフト）

```javascript
const GameEvent = {
  id: 'string',
  type: 'dialogue',       // 'dialogue', 'battle', 'item', 'clear'
  trigger: {
    type: 'collision',    // 'collision', 'auto', 'flag'
    target: 'npc_01'
  },
  
  // イベント内容
  data: {
    // typeによって異なる
  },
  
  // 実行条件
  conditions: [
    { flag: 'flag_name', value: true }
  ],
  
  // 実行後の処理
  afterEffects: [
    { type: 'setFlag', flag: 'flag_name', value: true },
    { type: 'modifyStatus', status: 'mp', amount: -5 }
  ],
  
  executed: false
};
```

---

## ステージデータ構造（提案/ドラフト）

```javascript
const Stage = {
  id: 'prototype_stage_01',
  name: '職場復帰の朝',
  description: '自宅から職場まで移動し、上司に挨拶する',
  
  // マップ設定
  map: {
    width: 20,
    height: 15,
    tiles: [], // 2次元配列
    tileRates: {
      GROUND: 0.70,
      GRASS: 0.20,
      ROCK: 0.08,
      GHOST: 0.02
    }
  },
  
  // 配置要素
  entities: {
    player: { x: 1, y: 1 },
    npcs: [],    // NPC配列
    ghosts: [],  // おばけ配列
    items: [],   // アイテム配列
    clearItem: { x: 18, y: 13 }
  },
  
  // イベント
  events: [],
  
  // クリア条件
  clearCondition: {
    type: 'getItem',
    target: 'clear_item_01'
  }
};
```

---

## 戦闘データ構造（提案/ドラフト）

```javascript
const BattleState = {
  active: false,
  turn: 0,
  
  player: {
    // PlayerStatusへの参照
  },
  
  enemy: {
    // Ghost or Monster
  },
  
  log: [],  // 戦闘ログ
  
  playerAction: null,  // 選択されたアクション
  enemyAction: null,   // 敵のアクション
  
  result: null  // 'victory', 'defeat', 'escaped'
};
```

---

**最終更新**: 2025/10/30
**状態**: 提案/ドラフト段階

