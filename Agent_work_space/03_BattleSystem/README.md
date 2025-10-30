# 03_BattleSystem - 戦闘システムエージェント

## 役割
おばけ/モンスターとの戦闘ロジックの実装を担当

---

## 担当タスク

### Phase 1: 戦闘システム基盤（優先度: 高）
- [ ] 戦闘システムの基本フレームワーク設計
- [ ] 戦闘状態管理
- [ ] ターン制 or リアルタイム制の決定

### Phase 2: おばけシステム（優先度: 最高）
- [ ] おばけエンティティクラス実装
- [ ] おばけの種類別挙動
  - [ ] 不安のおばけ
  - [ ] 緊張のおばけ
  - [ ] その他の心理的症状おばけ
- [ ] **物理攻撃無効化**ロジック
- [ ] **専用対処方法**実装
  - [ ] CBT技法による対処
  - [ ] 石板で習得した技の適用
- [ ] おばけのHP自動回復ロジック

### Phase 3: 普通のモンスター（優先度: 中）
- [ ] モンスターエンティティクラス
- [ ] 通常攻撃が効くモンスター実装
- [ ] モンスターAI

### Phase 4: 戦闘アクション（優先度: 高）
- [ ] 攻撃システム
  - [ ] 物理攻撃
  - [ ] 専用対処技（おばけ用）
- [ ] 防御/回避システム
- [ ] アイテム使用（戦闘中）

### Phase 5: ダメージ計算（優先度: 高）
- [ ] ダメージ計算式
- [ ] クリティカルヒット
- [ ] ステータスによるダメージ変動
- [ ] MP消費計算

### Phase 6: 戦闘結果処理（優先度: 中）
- [ ] 勝利時の処理
- [ ] 敗北時の処理（ゲームオーバー？）
- [ ] 逃走処理
- [ ] 経験値/報酬システム

---

## 実装ファイル

1. `battleManager.js` - 戦闘管理メインクラス
2. `ghostEntity.js` - おばけエンティティ
3. `monsterEntity.js` - モンスターエンティティ
4. `battleActions.js` - 戦闘アクション
5. `damageCalculator.js` - ダメージ計算
6. `cbtTechniques.js` - CBT技法実装
7. `testBattleSystem.js` - ユニットテスト

---

## 依存関係

### 必要な情報（依存先）
- **01_GameDesigner**: おばけ/モンスター設計書
- **01_GameDesigner**: 専用対処方法の仕様
- **02_StatusSystem**: プレイヤーのステータス
- 既存の `game.js` - ゲーム状態

### 提供する情報（依存元）
- **04_UIDesigner**: 戦闘状態データ
- **05_MapEventSystem**: 戦闘開始/終了イベント

---

## 戦闘システム設計（提案/ドラフト）

### おばけの特殊性
```javascript
// おばけは物理攻撃が効かない
class GhostEntity {
  constructor(type, location) {
    this.type = type; // '不安', '緊張', etc.
    this.hp = 100;
    this.maxHp = 100;
    this.autoRegenRate = 5; // 毎ターンHP回復
    this.weaknesses = []; // 専用対処方法
  }
  
  // 物理攻撃は無効
  receiveDamage(damage, attackType) {
    if (attackType === 'physical') {
      return { damage: 0, message: '物理攻撃は効かない！' };
    }
    
    // 専用対処技のみ有効
    if (this.weaknesses.includes(attackType)) {
      this.hp -= damage;
      return { damage, message: '効果がある！' };
    }
    
    return { damage: 0, message: 'あまり効果がない...' };
  }
  
  // 自動HP回復
  autoRegen() {
    this.hp = Math.min(this.hp + this.autoRegenRate, this.maxHp);
  }
}
```

### CBT技法の例
- **認知再構成**: 考えの偏りを修正 → 不安のおばけに有効
- **段階的曝露**: 恐怖に段階的に慣れる → 緊張のおばけに有効
- **マインドフルネス**: 現在に集中 → 複数のおばけに中程度有効
- **呼吸法**: リラックス → 身体症状系おばけに有効

---

## 作業ログ

### 2025/10/30
- フォルダ作成
- README.md作成
- おばけシステムの提案設計

---

**次のアクション**: 01_GameDesignerのおばけ設計書完成を待って実装開始

