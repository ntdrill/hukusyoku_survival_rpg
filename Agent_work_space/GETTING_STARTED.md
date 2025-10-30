# AIエージェント作業開始ガイド

このドキュメントは、各エージェントが作業を開始する際の手順を示します。

---

## 前提知識

### プロジェクト全体の理解
1. `00_PROJECT_OVERVIEW.md` を読む
2. `ROADMAP.md` で開発の流れを把握
3. `shared/data_structures.md` で共通データ構造を確認
4. `shared/constants.md` で定数を確認

### 既存コードベースの理解
1. `../index.html` - UI構造
2. `../game.js` - ゲームロジック（既存）
3. `../README.md` - プロジェクト概要

---

## エージェント別の開始手順

### 01_GameDesigner から開始

#### Step 1: アイデアの整理
既存のメモを読み込む：
- `../KKmemo251016` - 最新のアイデアメモ
- `../docs/KKmemo.txt` - 参考資料
- ユーザーからの追加情報（今回の会話内容）

#### Step 2: 仕様書の作成
優先順位順に作成：
1. `game_concept.md` - ゲーム全体のコンセプト
2. `status_specification.md` - ステータス仕様書
3. `ghost_monster_design.md` - おばけ/モンスター設計書
4. `item_specification.md` - アイテム仕様書
5. `stage_design.md` - プロトタイプステージ設計書

#### Step 3: 他エージェントへの共有
- 仕様書完成後、`shared/` フォルダにコピーまたはリンク
- 他のエージェントが実装を開始できる状態にする

---

### 02_StatusSystem の開始（01完了後）

#### Step 1: 仕様の確認
- `shared/` から最新の仕様書を読む
- 不明点があれば01_GameDesignerに確認

#### Step 2: 実装
1. `statusManager.js` - ステータス管理クラス
2. `mpSystem.js` - MP計算ロジック
3. `visibilityController.js` - 情報開示制御

#### Step 3: テスト
- `testStatusSystem.js` - ユニットテスト作成
- 06_IntegrationTestに動作確認を依頼

---

### 03_BattleSystem の開始（01完了後）

#### Step 1: 仕様の確認
- おばけ/モンスター設計書を読む
- CBT技法の仕様を理解

#### Step 2: 実装
1. `battleManager.js` - 戦闘管理
2. `ghostEntity.js` - おばけエンティティ
3. `cbtTechniques.js` - CBT技法

#### Step 3: テスト
- 06_IntegrationTestに戦闘ロジックの確認を依頼

---

### 04_UIDesigner の開始（01完了後、02と並行可）

#### Step 1: 仕様の確認
- UI仕様を確認
- 既存の `index.html` のスタイルを確認

#### Step 2: 実装
1. `statusUI.js` - ステータス表示
2. `dialogueUI.js` - 会話ウィンドウ
3. `ui-styles.css` - UI専用スタイル

#### Step 3: 統合
- 既存のHTMLに組み込む
- 06_IntegrationTestに表示確認を依頼

---

### 05_MapEventSystem の開始（01完了後、02/04と並行可）

#### Step 1: 仕様の確認
- ステージ設計書を読む
- アイテム/NPC配置を確認

#### Step 2: 実装
1. `eventManager.js` - イベント管理
2. `npcSystem.js` - NPC管理
3. `prototypeStage.js` - ステージデータ

#### Step 3: 統合
- 既存の `game.js` と統合
- 06_IntegrationTestに動作確認を依頼

---

### 06_IntegrationTest の開始（Phase 2以降）

#### Step 1: テスト計画
- `test-plan.md` を作成
- 各システムのテスト項目をリストアップ

#### Step 2: テスト実施
- 各エージェントから依頼されたテストを実行
- バグを発見したら `bug-report.md` に記録

#### Step 3: フィードバック
- 各エージェントにバグレポートを送る
- 修正確認後、次のテストへ

---

### 07_ScenarioWriter の開始（Phase 1から）

#### Step 1: 世界観の理解
- 01_GameDesignerの仕様書を読む
- ゲームのコンセプトとテーマを理解

#### Step 2: キャラクター設定
1. `character_profiles.md` - 主要キャラクター設定
2. NPC設定（性格、背景、相性）

#### Step 3: テキスト執筆
1. `npc_dialogues.md` - NPC会話台本
2. `ghost_scripts.md` - おばけのセリフ
3. `tablet_texts.md` - 石板テキスト（08と共同作業）

#### Step 4: 監修依頼
- 08_OccupationalTherapistに専門性の監修を依頼
- フィードバックを反映

---

### 08_OccupationalTherapist の開始（Phase 1から）

#### Step 1: CBT技法ガイド作成
- `cbt_techniques_guide.md` を作成
- 各技法の正確な定義

#### Step 2: 監修対象の確認
- 01_GameDesignerのおばけ設計書を読む
- 07_ScenarioWriterの石板テキストを読む

#### Step 3: 専門的監修
1. 心理的症状の表現の妥当性チェック
2. CBT技法の正確性チェック
3. スティグマ回避のチェック

#### Step 4: フィードバック提供
- 修正案を各エージェントに提供
- 専門的観点からの改善提案

---

## 作業の進め方

### 1. 自分のフォルダで作業
- `Agent_work_space/XX_YourAgent/` 内で作業
- 作業ログは `README.md` に記録

### 2. 共有リソースの活用
- `shared/` フォルダの定義を参照
- 新しい共通定義は `shared/` に追加

### 3. 他エージェントとの連携
- 依存関係を確認
- 不明点は他エージェントの `README.md` を参照

### 4. 進捗の記録
- `README.md` の作業ログを更新
- 完了したタスクにチェック

---

## コミュニケーション

### ドキュメントによる連携
各エージェントは以下を作成・更新：
- `README.md` - 役割、タスク、作業ログ
- `QUESTIONS.md` - 他エージェントへの質問
- `COMPLETED.md` - 完了した成果物リスト

### 質問の仕方
```markdown
# QUESTIONS.md の例

## 01_GameDesignerへの質問

### Q1: MP減少量について
現在のMP減少量は妥当ですか？
- 移動: 0.5/マス
- NPC会話: 2-15

回答待ち: [ ]
```

---

## トラブルシューティング

### 仕様が不明確な場合
→ 01_GameDesignerに確認

### 既存コードとの統合が難しい場合
→ 06_IntegrationTestに相談

### 技術的な問題
→ `shared/TECH_NOTES.md` に記録して共有

---

## 優先的な連携関係

### 重要な連携ペア

#### 07_ScenarioWriter ⇄ 08_OccupationalTherapist
- **石板テキスト**の共同作業
  - 07が初稿執筆 → 08が専門監修 → 07が修正
- **おばけのセリフ**の監修
  - 07が執筆 → 08が症状表現の妥当性確認

#### 01_GameDesigner ⇄ 08_OccupationalTherapist
- **おばけ設計**の監修
  - 01が設計 → 08が専門的妥当性確認
- **ステータスシステム**の監修
  - 01が設計 → 08がMP減少ロジックの妥当性確認

#### 05_MapEventSystem ⇄ 07_ScenarioWriter
- **会話データ**の統合
  - 07が会話執筆 → 05がシステムに実装

---

## 現在の状態

**Phase 0完了**
- フォルダ構造作成完了（8エージェント体制）
- ドキュメント整備完了
- **次の行動**:
  1. **01_GameDesigner**: 仕様書作成開始
  2. **07_ScenarioWriter**: キャラクター設定開始
  3. **08_OccupationalTherapist**: CBT技法ガイド作成開始

---

**最終更新**: 2025/10/30（8エージェント体制に拡張）

