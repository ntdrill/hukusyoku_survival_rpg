# 最小プロトタイプ実装TODO

**目標**: 既存の`game.js`に最小限の機能を追加してプロトタイプを完成させる

---

## 📋 必要な機能（資料準拠）

### ✅ 既存機能（そのまま使用）
- [x] グリッドベースのマップ（20×15）
- [x] プレイヤー移動（矢印キー/WASD）
- [x] タイル種類（地面、草、岩）
- [x] 衝突判定
- [x] 移動アニメーション

### 🆕 追加機能（最小実装）
1. [ ] 人（NPC）の追加
2. [ ] 会話システム
3. [ ] おばけの拡張（既存の👻を戦闘可能に）
4. [ ] 普通のモンスターの追加
5. [ ] 戦闘イベント処理
6. [ ] 石板の追加
7. [ ] MP欄UI表示イベント
8. [ ] クリア判定アイテムの追加
9. [ ] クリア処理

---

## 🎯 Phase 1: 基本エンティティの追加（1-2日）

### 担当: 05_MapEventSystem + プログラマー

#### 1.1 新しいタイルタイプの追加
- [ ] `game.js` の `TILES` に追加
  ```javascript
  const TILES = {
    GROUND: 0,
    GRASS: 1,
    ROCK: 2,
    GHOST: 3,      // 既存（おばけ）
    PLAYER: 4,     // 既存
    NPC: 5,        // 🆕 人（NPC）
    MONSTER: 6,    // 🆕 普通のモンスター
    TABLET: 7,     // 🆕 石板
    CLEAR_ITEM: 8  // 🆕 クリア判定アイテム
  };
  ```

#### 1.2 ドット絵描画関数に追加
- [ ] `drawPixelArt()` 関数に新タイプの描画を追加
  ```javascript
  case TILES.NPC:
    // 👤 人のドット絵
    ctx.fillStyle = '#FFD700';
    // 円形の頭と長方形の体
    break;
    
  case TILES.MONSTER:
    // 👹 モンスターのドット絵
    ctx.fillStyle = '#FF6347';
    break;
    
  case TILES.TABLET:
    // 📖 石板のドット絵
    ctx.fillStyle = '#8B4513';
    break;
    
  case TILES.CLEAR_ITEM:
    // 🎯 クリアアイテムのドット絵
    ctx.fillStyle = '#FFD700';
    // 星形
    break;
  ```

#### 1.3 固定配置データの作成
- [ ] プロトタイプステージの固定配置を定義
  ```javascript
  const prototypeStage = {
    npcs: [
      { x: 5, y: 3, name: '同僚', dialogue: 'おはよう！' }
    ],
    ghosts: [
      { x: 8, y: 7, type: '不安' }
    ],
    monsters: [
      { x: 10, y: 5, name: 'ストレス' }
    ],
    tablets: [
      { x: 9, y: 6, name: 'セルフモニタリング' }
    ],
    clearItem: { x: 18, y: 13 }
  };
  ```

#### 1.4 マップ初期化時に配置
- [ ] `initMap()` 関数を修正して固定配置を反映

---

## 🎯 Phase 2: 会話システム（1日）

### 担当: 04_UIDesigner + 07_ScenarioWriter

#### 2.1 会話ウィンドウUIの作成
- [ ] HTMLに会話ウィンドウ要素を追加
  ```html
  <div id="dialogueBox" style="display:none;">
    <div id="npcName"></div>
    <div id="dialogueText"></div>
    <button id="dialogueClose">閉じる</button>
  </div>
  ```

- [ ] CSSでスタイリング
  ```css
  #dialogueBox {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #34495e;
    padding: 20px;
    border-radius: 8px;
    color: white;
    max-width: 500px;
  }
  ```

#### 2.2 会話表示関数の実装
- [ ] `game.js` に会話システムを追加
  ```javascript
  function showDialogue(npcName, text) {
    document.getElementById('npcName').textContent = npcName;
    document.getElementById('dialogueText').textContent = text;
    document.getElementById('dialogueBox').style.display = 'block';
    game.isPaused = true;  // ゲーム一時停止
  }
  
  function closeDialogue() {
    document.getElementById('dialogueBox').style.display = 'none';
    game.isPaused = false;
  }
  ```

#### 2.3 NPC接触時の会話発動
- [ ] `movePlayer()` 関数に会話判定を追加
  ```javascript
  if (targetTile === TILES.NPC) {
    const npc = findNPCAt(newX, newY);
    showDialogue(npc.name, npc.dialogue);
  }
  ```

---

## 🎯 Phase 3: 戦闘システム（簡易版）（2-3日）

### 担当: 03_BattleSystem + 04_UIDesigner

#### 3.1 戦闘UIの作成
- [ ] HTMLに戦闘画面要素を追加
  ```html
  <div id="battleScreen" style="display:none;">
    <div id="enemyInfo">
      <div id="enemyName"></div>
      <div id="enemyHP"></div>
    </div>
    <div id="battleActions">
      <button id="attackBtn">攻撃</button>
      <button id="technique1Btn">認知再構成</button>
      <button id="escapeBtn">逃げる</button>
    </div>
    <div id="battleLog"></div>
  </div>
  ```

#### 3.2 戦闘開始処理
- [ ] おばけ/モンスター接触時に戦闘画面表示
  ```javascript
  function startBattle(enemy) {
    document.getElementById('battleScreen').style.display = 'block';
    document.getElementById('enemyName').textContent = enemy.name;
    document.getElementById('enemyHP').textContent = `HP: ${enemy.hp}`;
    game.currentBattle = {
      enemy: enemy,
      playerHP: 100,
      turn: 0
    };
  }
  ```

#### 3.3 戦闘行動処理
- [ ] 攻撃ボタンのイベント処理
  ```javascript
  document.getElementById('attackBtn').addEventListener('click', () => {
    // おばけには物理攻撃無効
    if (game.currentBattle.enemy.type === 'ghost') {
      addBattleLog('物理攻撃は効かない！');
    } else {
      const damage = 20;
      game.currentBattle.enemy.hp -= damage;
      addBattleLog(`${damage}のダメージ！`);
    }
    enemyTurn();
  });
  ```

- [ ] CBT技法ボタンの処理
  ```javascript
  document.getElementById('technique1Btn').addEventListener('click', () => {
    const damage = 30;
    game.currentBattle.enemy.hp -= damage;
    addBattleLog('認知再構成！効果がある！');
    enemyTurn();
  });
  ```

#### 3.4 戦闘終了処理
- [ ] 勝利/敗北の判定
  ```javascript
  function checkBattleEnd() {
    if (game.currentBattle.enemy.hp <= 0) {
      addBattleLog('勝利！');
      // おばけ/モンスターをマップから削除
      removeBattleEnemy();
      closeBattle();
    }
  }
  ```

---

## 🎯 Phase 4: 石板とMP欄表示（1日）

### 担当: 04_UIDesigner + 02_StatusSystem

#### 4.1 MP欄UIの作成
- [ ] HTMLにMP表示要素を追加
  ```html
  <div id="statusPanel" style="display:none;">
    <div id="mpDisplay">
      <span>MP: </span>
      <span id="mpValue">███</span> <!-- 初期は黒塗り -->
    </div>
  </div>
  ```

#### 4.2 石板獲得処理
- [ ] 石板接触時の処理
  ```javascript
  if (targetTile === TILES.TABLET) {
    const tablet = findTabletAt(newX, newY);
    showTabletMessage(tablet.name, tablet.knowledge);
    unlockMPDisplay(); // MP欄を表示
    removeTablet(newX, newY);
  }
  ```

#### 4.3 MP欄表示イベント
- [ ] MP欄を「黒塗り」状態で表示
  ```javascript
  function unlockMPDisplay() {
    document.getElementById('statusPanel').style.display = 'block';
    document.getElementById('mpValue').textContent = '███'; // 黒塗り
    showNotification('MPの存在に気づいた！');
  }
  ```

---

## 🎯 Phase 5: クリア判定（半日）

### 担当: 05_MapEventSystem

#### 5.1 クリアアイテム獲得処理
- [ ] クリアアイテム接触時の処理
  ```javascript
  if (targetTile === TILES.CLEAR_ITEM) {
    showClearScreen();
  }
  ```

#### 5.2 クリア画面の作成
- [ ] HTMLにクリア画面要素を追加
  ```html
  <div id="clearScreen" style="display:none;">
    <h1>🎉 クリア！</h1>
    <p>復職初日を無事に終えました</p>
    <button id="restartBtn">もう一度</button>
  </div>
  ```

- [ ] クリア画面表示関数
  ```javascript
  function showClearScreen() {
    document.getElementById('clearScreen').style.display = 'block';
    game.isPaused = true;
  }
  ```

---

## 🎯 Phase 6: 統合とテスト（1日）

### 担当: 06_IntegrationTest

#### 6.1 基本動作確認
- [ ] プレイヤー移動
- [ ] NPC会話
- [ ] おばけとの戦闘
- [ ] モンスターとの戦闘
- [ ] 石板獲得→MP欄表示
- [ ] クリアアイテム獲得→クリア

#### 6.2 バグ修正
- [ ] 衝突判定の調整
- [ ] UI表示の不具合修正
- [ ] 戦闘処理の調整

#### 6.3 プレイテスト
- [ ] スタートからクリアまで通しでプレイ
- [ ] 所要時間の確認
- [ ] バランス調整の提案

---

## 📁 必要なファイル

### 修正するファイル
1. **`game.js`** - メインロジック
   - タイルタイプ追加
   - エンティティ配置
   - イベント処理追加
   - 戦闘システム追加

2. **`index.html`** - UI追加
   - 会話ウィンドウ
   - 戦闘画面
   - MP欄
   - クリア画面

3. **`index.html` (style部分)** - CSS追加
   - 新UIのスタイリング

### 新規作成ファイル（オプション）
- `prototypeStage.js` - ステージデータ（分離する場合）
- `battleSystem.js` - 戦闘ロジック（分離する場合）
- `dialogueSystem.js` - 会話システム（分離する場合）

---

## 🎨 最小限のコンテンツ

### NPCセリフ（07_ScenarioWriter）
```javascript
const dialogues = {
  npc1: {
    name: '同僚A',
    text: 'おはよう！久しぶりだね。元気そうでよかった。'
  }
};
```

### 石板テキスト（07 + 08）
```javascript
const tablets = {
  monitoring: {
    name: 'セルフモニタリングの石板',
    text: '自分の状態を観察することは大切です。\nMPの存在に気づきました。'
  }
};
```

### おばけデータ（01 + 08）
```javascript
const enemies = {
  anxiety_ghost: {
    name: '不安のおばけ',
    type: 'ghost',
    hp: 80,
    weak_to: ['cognitive_restructuring']
  },
  stress_monster: {
    name: 'ストレスモンスター',
    type: 'monster',
    hp: 50
  }
};
```

---

## ⏱️ 実装スケジュール（最短）

| Phase | 内容 | 期間 | 担当 |
|-------|------|------|------|
| Phase 1 | エンティティ追加 | 1-2日 | 05 |
| Phase 2 | 会話システム | 1日 | 04, 07 |
| Phase 3 | 戦闘システム | 2-3日 | 03, 04 |
| Phase 4 | 石板/MP欄 | 1日 | 02, 04 |
| Phase 5 | クリア判定 | 0.5日 | 05 |
| Phase 6 | 統合テスト | 1日 | 06 |
| **合計** | | **6-8日** | |

---

## ✅ 完了基準

### 最小限の動作
- [x] スタート地点からクリア地点まで移動できる
- [ ] NPCに話しかけると会話が表示される
- [ ] おばけと戦闘できる（物理攻撃無効）
- [ ] モンスターと戦闘できる（物理攻撃有効）
- [ ] 石板を獲得するとMP欄が表示される（黒塗り）
- [ ] クリアアイテムを獲得するとクリア画面が表示される

### プロトタイプとして証明すること
- [ ] セルフモニタリングの概念が伝わるか（石板→MP欄表示）
- [ ] おばけと普通の敵の違いが分かるか
- [ ] 会話システムが機能するか
- [ ] 戦闘システムの基本が機能するか

---

## 🚀 開始方法

### Step 1: 既存コードの確認
```bash
# game.js の現在の構造を理解
# - TILES定義
# - movePlayer()関数
# - render()関数
# - initMap()関数
```

### Step 2: Phase 1から順に実装
```javascript
// 1. TILESに追加
// 2. drawPixelArt()に追加
// 3. prototypeStageデータ作成
// 4. initMap()で配置
```

### Step 3: 動作確認しながら進める
- 各Phaseごとにブラウザで動作確認
- バグがあればその場で修正

---

**最終更新**: 2025/10/30
**目標**: 最小限の機能で動くプロトタイプを1週間で完成

