# 共通定数定義

全エージェントで使用する共通定数を定義します。

---

## ゲーム基本設定（資料準拠）

```javascript
// 既存の設定（game.jsより）
const TILE_SIZE = 32;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;
const MOVE_ANIMATION_DURATION = 150; // ms

// マップ再生成（プロトタイプでは無効化する可能性）
const MAP_REGENERATE_INTERVAL = 30000; // 30秒
```

---

## ステータス定数（提案/ドラフト）

```javascript
// ステータス名
const STATUS_NAMES = {
  HP: 'hp',
  MP: 'mp',
  FATIGUE: 'fatigue',
  MOOD: 'mood',
  HEALTH: 'health',
  ANXIETY: 'anxiety',
  AROUSAL: 'arousal',
  EMOTION: 'emotion',
  PHYSICAL_REACTION: 'physicalReaction',
  COGNITIVE_BIAS: 'cognitiveBias',
  DICHOTOMOUS_THINKING: 'dichotomousThinking'
};

// 初期ステータス値
const INITIAL_STATUS = {
  hp: 100,
  mp: 100,
  fatigue: 0,
  mood: 50,
  health: 80,
  anxiety: 20,
  arousal: 50,
  emotion: 50,
  physicalReaction: 10,
  cognitiveBias: 30,
  dichotomousThinking: 40
};

// 表示レベル
const VISIBILITY_LEVELS = {
  HIDDEN: 0,
  REDACTED: 1,
  LEVEL: 2,
  NUMERIC: 3
};
```

---

## ステータス変化定数（提案/ドラフト）

```javascript
// ステータス変化量（01_GameDesignerで調整）
const STATUS_CHANGES = {
  // 移動（複数ステータスに影響）
  MOVE: {
    mp: -0.5,
    fatigue: +0.3
  },
  
  // NPC会話
  NPC_FRIENDLY: {
    mp: -2,
    mood: +5
  },
  NPC_NORMAL: {
    mp: -5,
    mood: 0
  },
  NPC_DIFFICULT: {
    mp: -15,
    anxiety: +10,
    mood: -5
  },
  
  // アクション
  WORK: {
    mp: -10,
    fatigue: +15,
    anxiety: +5
  },
  REST: {
    mp: +20,
    fatigue: -30,
    mood: +10
  },
  
  // 戦闘
  BATTLE_TURN: {
    mp: -3,
    anxiety: +2
  },
  SPECIAL_TECHNIQUE: {
    mp: -15
  }
};

// ステータス条件による特殊動作（資料準拠）
const STATUS_CONDITIONS = {
  // 「一見バグだと思わせるような動作」
  HIGH_ANXIETY_PATTERN: {
    condition: { anxiety: '>70' },
    effect: '移動が不規則になる'
  },
  EXHAUSTION_PATTERN: {
    condition: { arousal: '>80', fatigue: '>80' },
    effect: '予期しない動作'
  }
};
```

---

## おばけ定数（提案/ドラフト）

```javascript
// おばけタイプ
const GHOST_TYPES = {
  ANXIETY: 'anxiety',
  TENSION: 'tension',
  DEPRESSION: 'depression',
  PANIC: 'panic'
};

// おばけの基本HP
const GHOST_BASE_HP = {
  anxiety: 80,
  tension: 100,
  depression: 120,
  panic: 150
};

// HP自動回復率
const GHOST_REGEN_RATE = {
  anxiety: 5,
  tension: 8,
  depression: 3,
  panic: 10
};
```

---

## CBT技法定数（提案/ドラフト）

```javascript
// 専用対処方法（CBT技法）
const CBT_TECHNIQUES = {
  COGNITIVE_RESTRUCTURING: {
    id: 'cognitive_restructuring',
    name: '認知再構成',
    description: '考え方のパターンを見直す',
    mpCost: 15,
    baseDamage: 30
  },
  GRADED_EXPOSURE: {
    id: 'graded_exposure',
    name: '段階的曝露',
    description: '恐怖に少しずつ慣れる',
    mpCost: 12,
    baseDamage: 25
  },
  MINDFULNESS: {
    id: 'mindfulness',
    name: 'マインドフルネス',
    description: '今この瞬間に意識を向ける',
    mpCost: 10,
    baseDamage: 20
  },
  BREATHING: {
    id: 'breathing',
    name: '呼吸法',
    description: 'ゆっくりとした呼吸でリラックス',
    mpCost: 5,
    baseDamage: 15
  },
  BEHAVIORAL_ACTIVATION: {
    id: 'behavioral_activation',
    name: '行動活性化',
    description: '小さな行動から始める',
    mpCost: 8,
    baseDamage: 18
  }
};

// おばけと技法の相性
const GHOST_WEAKNESSES = {
  anxiety: ['cognitive_restructuring', 'mindfulness', 'breathing'],
  tension: ['graded_exposure', 'breathing'],
  depression: ['behavioral_activation', 'cognitive_restructuring'],
  panic: ['breathing', 'mindfulness']
};
```

---

## アイテム定数（提案/ドラフト）

```javascript
// アイテムタイプ
const ITEM_TYPES = {
  RECOVERY: 'recovery',
  TABLET: 'tablet',
  CLEAR: 'clear',
  TRAP: 'trap'
};

// 回復アイテム効果
const RECOVERY_ITEMS = {
  MEAT: { id: 'meat', sprite: '🍖', mp: 20, hp: 10 },
  BEANS: { id: 'beans', sprite: '大豆', mp: 15, fatigue: -10 },
  WATER: { id: 'water', sprite: '💧', health: 10 },
  PRAYER: { id: 'prayer', sprite: '🙏', anxiety: -15, mood: 10 },
  BASKETBALL: { id: 'basketball', sprite: '🏀', fatigue: -20, mood: 15 },
  SOCCER: { id: 'soccer', sprite: '⚽️', fatigue: -18, mood: 12 },
  FRISBEE: { id: 'frisbee', sprite: '🥏', mood: 10 },
  CARDS: { id: 'cards', sprite: '🃏', anxiety: -10 },
  MAHJONG: { id: 'mahjong', sprite: '🀄️', mood: 8 },
  CHESS: { id: 'chess', sprite: '♟️', cognitiveBias: -10 }
};

// トラップアイテム（一見良さそうだが実は…）
const TRAP_ITEMS = {
  PHONE: {
    id: 'phone',
    sprite: '📱',
    immediate: { mp: 10 },        // 即座の効果（プラス）
    delayed: { anxiety: 15 }      // 遅延効果（マイナス）
  }
};
```

---

## スプライト描画定数（資料準拠）

```javascript
// カラーパレット（インデックス0=透明）
const PALETTE = [
    null,        // 0: 透明
    '#FFDAB9',   // 1: 肌色
    '#3D2B1F',   // 2: 黒髪
    '#F0F0F0',   // 3: ワイシャツ（白）
    '#1E3A5F',   // 4: スーツ（紺）
    '#111111',   // 5: 靴（黒）
    '#CC2200',   // 6: ネクタイ（赤）
    '#E8EAFF',   // 7: おばけ（青白）
    '#4455FF',   // 8: おばけの目（青）
];

// 8×8ドットスプライト定義
// 各セルはPALETTEのインデックス番号（0=透明）
const SPRITES = {
    PLAYER_DOWN: [  // 正面（下向き）
        [0,0,2,2,2,2,0,0],
        [0,2,1,1,1,1,2,0],
        [0,1,0,1,1,0,1,0],
        [0,1,1,1,1,1,1,0],
        [0,4,3,6,6,3,4,0],
        [0,4,4,4,4,4,4,0],
        [0,0,4,0,0,4,0,0],
        [0,0,5,0,0,5,0,0],
    ],
    PLAYER_UP: [    // 後ろ（上向き）
        [0,0,2,2,2,2,0,0],
        [0,2,2,2,2,2,2,0],
        [0,2,1,1,1,1,2,0],
        [0,0,1,1,1,1,0,0],
        [0,4,4,4,4,4,4,0],
        [0,4,4,4,4,4,4,0],
        [0,0,4,0,0,4,0,0],
        [0,0,5,0,0,5,0,0],
    ],
    PLAYER_LEFT: [  // 左向き
        [0,0,2,2,2,0,0,0],
        [0,2,1,1,1,2,0,0],
        [0,2,0,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,4,3,6,4,0,0],
        [0,4,4,4,4,0,0,0],
        [0,0,4,0,4,0,0,0],
        [0,0,5,0,5,0,0,0],
    ],
    PLAYER_RIGHT: [ // 右向き
        [0,0,0,2,2,2,0,0],
        [0,0,2,1,1,1,2,0],
        [0,0,1,1,1,0,2,0],
        [0,0,1,1,1,1,0,0],
        [0,0,4,6,3,4,0,0],
        [0,0,0,4,4,4,4,0],
        [0,0,0,4,0,4,0,0],
        [0,0,0,5,0,5,0,0],
    ],
    GHOST: [        // おばけ
        [0,0,7,7,7,7,0,0],
        [0,7,7,7,7,7,7,0],
        [0,7,8,7,7,8,7,0],
        [0,7,8,7,7,8,7,0],
        [0,7,7,7,7,7,7,0],
        [0,7,7,7,7,7,7,0],
        [7,7,0,7,7,0,7,7],
        [7,0,0,7,7,0,0,7],
    ],
};

// スプライト描画ルール
// - TILE_SIZE = 32 のとき、1ドット = 4px（TILE_SIZE / 8）
// - 座標は Math.floor() で整数スナップ必須
// - ctx.imageSmoothingEnabled = false をrender()先頭で設定
// - グリッド線は描画しない
```

---

## タイルタイプ（既存 + 追加）

```javascript
const TILES = {
  GROUND: 0,
  GRASS: 1,
  ROCK: 2,
  GHOST: 3,
  PLAYER: 4,
  NPC: 5,      // 追加
  ITEM: 6,     // 追加
  TABLET: 7    // 追加（石板）
};
```

---

## イベントタイプ（提案/ドラフト）

```javascript
const EVENT_TYPES = {
  DIALOGUE: 'dialogue',
  BATTLE: 'battle',
  ITEM: 'item',
  TABLET: 'tablet',
  CLEAR: 'clear',
  CUSTOM: 'custom'
};
```

---

## UI定数（提案/ドラフト）

```javascript
// カラーパレット
const COLORS = {
  HP: '#e74c3c',
  MP: '#3498db',
  FATIGUE: '#f39c12',
  ANXIETY: '#9b59b6',
  RECOVERY: '#2ecc71',
  DANGER: '#c0392b',
  
  // UI背景
  UI_BG: '#34495e',
  UI_BORDER: '#2c3e50',
  TEXT: '#ecf0f1'
};

// アニメーション時間
const ANIMATION_DURATION = {
  DAMAGE: 500,
  NOTIFICATION: 2000,
  FADE: 300,
  STATUS_CHANGE: 1000
};
```

---

## 戦闘定数（提案/ドラフト）

```javascript
// ダメージ計算
const DAMAGE_MULTIPLIER = {
  WEAKNESS: 2.0,      // 弱点技
  NORMAL: 1.0,        // 通常
  RESIST: 0.5,        // 耐性
  INVALID: 0.0        // 無効（物理攻撃など）
};

// クリティカル
const CRITICAL_RATE = 0.1;  // 10%
const CRITICAL_MULTIPLIER = 1.5;
```

---

**最終更新**: 2026/03/12
**状態**: スプライト描画定数（資料準拠）追加。その他は提案/ドラフト段階（01_GameDesignerで確定）

