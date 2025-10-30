# 復職RPG - Agent_work_space インデックス

このフォルダは、AIエージェントによる分業開発のための作業スペースです。

---

## 📚 主要ドキュメント（読む順序）

### 1️⃣ まず読むべきドキュメント
0. **[CONCEPT_SUMMARY.md](CONCEPT_SUMMARY.md)** - ⭐️ コンセプト要約（最初に読むべき）
   - ゲームの本質（モニタリング、作業療法、復職体験）
   - 核となる3つの要素
   - なぜこのゲームを作るのか

1. **[00_PROJECT_OVERVIEW.md](00_PROJECT_OVERVIEW.md)** - プロジェクト全体概要
   - ゲームコンセプト
   - 8つのエージェントの役割
   - 開発の進め方

2. **[ROADMAP.md](ROADMAP.md)** - 開発ロードマップ
   - Phase 1〜5の詳細
   - 開発期間（7-11週間）
   - マイルストーン

3. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - プロジェクト構造
   - フォルダ構成
   - エージェント間の依存関係図
   - 開発フロー

### 2️⃣ 作業開始時に読むドキュメント
4. **[PROTOTYPE_TODO.md](PROTOTYPE_TODO.md)** - ⭐️ 最小プロトタイプ実装TODO（実装者必読）
   - 既存game.jsへの最小限の追加
   - Phase 1〜6の具体的タスク
   - 6-8日で完成する実装計画

5. **[GETTING_STARTED.md](GETTING_STARTED.md)** - 作業開始ガイド
   - エージェント別の開始手順
   - 作業の進め方
   - 連携方法

---

## 🤖 8つのAIエージェント

| # | エージェント | 役割 | Phase 1から開始 |
|---|------------|------|----------------|
| 01 | [GameDesigner](01_GameDesigner/) | 仕様策定、バランス調整 | ✅ |
| 02 | [StatusSystem](02_StatusSystem/) | ステータス管理実装 | |
| 03 | [BattleSystem](03_BattleSystem/) | 戦闘システム実装 | |
| 04 | [UIDesigner](04_UIDesigner/) | UI設計・実装 | |
| 05 | [MapEventSystem](05_MapEventSystem/) | マップ・イベント実装 | |
| 06 | [IntegrationTest](06_IntegrationTest/) | 統合テスト | |
| 07 | [ScenarioWriter](07_ScenarioWriter/) | テキスト執筆 | ✅ |
| 08 | [OccupationalTherapist](08_OccupationalTherapist/) | CBT監修 | ✅ |

---

## 📁 共有リソース

### [shared/](shared/) フォルダ
- **[data_structures.md](shared/data_structures.md)** - データ構造定義
- **[constants.md](shared/constants.md)** - 定数定義

すべてのエージェントが参照する共通の定義ファイルです。

---

## 🎯 プロジェクトの目標

**モニタリング（自己観察）と作業療法を模倣した復職体験シミュレーションRPG**を開発する

### コアコンセプト（資料準拠）
- **セルフモニタリング**: 自分の状態（HP, MP, 疲労度, 気分, 体調, 不安度等）を段階的に知る
- **作業療法の実践**: CBT技法を学び、実際に使用する体験
- **休職体験の模倣**: 復職プロセスの疑似体験、対人関係、心理的ハードル
- **気づきのプロセス**: 潜在的に変化する状態に気づく重要性を体験
- **おばけシステム**: 心理的症状の擬人化、物理攻撃無効、CBT技法で対処
- **モニタリング4段階**: 非表示 → 黒塗り → 三段階 → 数値（自己理解の深化）

### プロトタイプ目標
- **1つの小規模ステージ**を完成させる
- テーマ: 「職場復帰の朝」
- 自宅から職場までの道のり

---

## 🚀 今すぐできること

### Phase 1開始（即座に着手可能）
1. **01_GameDesigner**: 仕様書作成を開始
2. **07_ScenarioWriter**: キャラクター設定を開始  
3. **08_OccupationalTherapist**: CBT技法ガイドを作成

### 各エージェントのREADME
各フォルダ内の `README.md` に詳細なタスクリストがあります。

---

## 📋 開発の流れ（簡易版）

```
Phase 1（1-2週間）
  仕様策定
  ↓
Phase 2（2-3週間）
  コアシステム実装
  ↓
Phase 3（2-3週間）
  戦闘システム実装
  ↓
Phase 4（1-2週間）
  プロトタイプステージ完成
  ↓
Phase 5（1週間）
  ポリッシュ・仕上げ
  ↓
✅ プロトタイプ完成
```

---

## 🔄 重要な連携関係

### 監修フロー
```
08_OccupationalTherapist（専門監修）
         │
         ├─→ 01_GameDesigner（おばけ設計）
         ├─→ 02_StatusSystem（MP減少ロジック）
         ├─→ 03_BattleSystem（CBT技法）
         └─→ 07_ScenarioWriter（石板テキスト）
```

### テキスト統合フロー
```
07_ScenarioWriter（執筆）
         │
         ├─→ 05_MapEventSystem（会話データ統合）
         └─→ 04_UIDesigner（表示）
```

---

## 📊 現在の状態

**Phase**: Phase 0完了、Phase 1開始準備完了

**完了事項**:
- ✅ フォルダ構造作成
- ✅ 8エージェント体制構築
- ✅ ドキュメント整備
- ✅ タスク定義
- ✅ 依存関係の明確化

**次のアクション**:
- ⏳ 01_GameDesigner: 仕様書作成
- ⏳ 07_ScenarioWriter: キャラクター設定
- ⏳ 08_OccupationalTherapist: CBT技法ガイド

---

## ❓ 困ったときは

1. **仕様が不明確**: → 01_GameDesignerに確認
2. **専門知識が必要**: → 08_OccupationalTherapistに確認
3. **テキストの表現**: → 07_ScenarioWriterに確認
4. **技術的問題**: → 06_IntegrationTestに相談

---

## 📝 更新履歴

- **2025/10/30**: Agent_work_space作成、8エージェント体制構築

---

**次に読むべきドキュメント**: ⭐️ [CONCEPT_SUMMARY.md](CONCEPT_SUMMARY.md) - ゲームの本質を理解する

