# 02_StatusSystem - ステータス管理エージェント

## 役割
プレイヤーのステータス計算、セルフモニタリング（自己観察）システムの実装を担当

---

## 担当タスク

### Phase 1: ステータス管理基盤（優先度: 最高）
- [ ] ステータス管理クラスの設計
- [ ] ステータスデータ構造の実装
- [ ] ステータス初期化処理

### Phase 2: ステータス変化システム（優先度: 最高）
- [ ] ステータス変化計算ロジック実装
  - [ ] 移動時のMP、疲労度の変化
  - [ ] NPC会話時のMP、気分の変化（相性による変動）
  - [ ] 仕事アクション時の複数ステータス変化
- [ ] 内部値（潜在値）と表示値の分離

### Phase 3: セルフモニタリングシステム（優先度: 最高）
- [ ] 自己観察の段階管理
  - [ ] 気づかない状態（非表示）
  - [ ] なんとなく分かる状態（黒塗り）
  - [ ] おおよそ分かる状態（三段階表記：たくさん/ふつう/ほとんど無い）
  - [ ] 正確に把握できる状態（数値表記）
- [ ] 石板（CBT知見）による気づきの促進処理
- [ ] 段階的な自己理解の深化ロジック

### Phase 4: ステータス相互作用（優先度: 高）
- [ ] 疲労度とMPの関係
- [ ] 不安度とMPの関係
- [ ] 体調とその他ステータスの影響
- [ ] 覚醒度の計算

### Phase 5: 特殊ステータス（優先度: 中）
- [ ] ウサギモード（休憩必要状態）
- [ ] カメモード（淡々と動ける状態）
- [ ] 🐍コブラ（レアステータス）の実装

### Phase 6: デバッグ機能（優先度: 低）
- [ ] ステータス強制変更機能
- [ ] ステータスログ出力
- [ ] デバッグUI

---

## 実装ファイル

1. `statusManager.js` - ステータス管理メインクラス
2. `mpSystem.js` - MP計算ロジック
3. `visibilityController.js` - 情報開示制御
4. `statusInteraction.js` - ステータス相互作用
5. `testStatusSystem.js` - ユニットテスト

---

## 依存関係

### 必要な情報（依存先）
- **01_GameDesigner**: ステータス仕様書
- **01_GameDesigner**: MP減少ルール
- 既存の `game.js` - プレイヤーデータ構造

### 提供する情報（依存元）
- **04_UIDesigner**: ステータス表示データAPI
- **03_BattleSystem**: 現在のステータス値
- **05_MapEventSystem**: ステータス変更メソッド

---

## API設計（提案/ドラフト）

```javascript
// ステータス管理クラス
class StatusManager {
  constructor(initialStats);
  
  // ステータス取得（表示用）
  getDisplayStatus(statName); // 表示段階に応じた値
  getRawStatus(statName);     // 内部の正確な値
  
  // MP操作
  decreaseMP(amount, reason); // MP減少
  increaseMP(amount);         // MP回復
  
  // 情報開示
  unlockStatusVisibility(statName, level); // 段階解放
  getVisibilityLevel(statName);            // 現在の表示段階
  
  // ステータス変更
  modifyStatus(statName, amount);
  
  // 状態チェック
  isInRabbitMode();  // ウサギモード判定
  isInTurtleMode();  // カメモード判定
  hasCobraStatus();  // コブラステータス保持
}
```

---

## 作業ログ

### 2025/10/30
- フォルダ作成
- README.md作成
- API設計（提案段階）

---

**次のアクション**: 01_GameDesignerの仕様書完成を待って実装開始

