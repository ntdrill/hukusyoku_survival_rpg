# プロジェクト構造図

---

## フォルダ構成

```
d:\ゲーム\復職RPG\
│
├── index.html                    # メインHTML（既存）
├── game.js                       # ゲームロジック（既存）
├── README.md                     # プロジェクト説明（既存）
├── KKmemo251016                  # デザインメモ（既存）
│
├── docs/                         # ドキュメント
│   ├── KKmemo.txt               # 参考資料
│   └── numaomemo.txt            # メモ
│
├── asset/                        # アセット
│   └── IMG_1409.png
│
└── Agent_work_space/             # ★AIエージェント作業フォルダ★
    │
    ├── 00_PROJECT_OVERVIEW.md    # プロジェクト全体概要
    ├── ROADMAP.md                # 開発ロードマップ
    ├── GETTING_STARTED.md        # 作業開始ガイド
    ├── PROJECT_STRUCTURE.md      # このファイル
    │
    ├── shared/                   # 共有リソース
    │   ├── data_structures.md   # データ構造定義
    │   └── constants.md         # 定数定義
    │
    ├── 01_GameDesigner/         # ゲームデザイナー
    │   └── README.md
    │
    ├── 02_StatusSystem/         # ステータス管理
    │   └── README.md
    │
    ├── 03_BattleSystem/         # 戦闘システム
    │   └── README.md
    │
    ├── 04_UIDesigner/           # UIデザイナー
    │   └── README.md
    │
    ├── 05_MapEventSystem/       # マップ/イベント
    │   └── README.md
    │
    ├── 06_IntegrationTest/      # 統合テスト
    │   └── README.md
    │
    ├── 07_ScenarioWriter/       # シナリオライター
    │   └── README.md
    │
    └── 08_OccupationalTherapist/ # 作業療法士
        └── README.md
```

---

## エージェント間の依存関係図

```
                    ┌───────────────────────────────┐
                    │  08_OccupationalTherapist     │
                    │    （専門知識提供・監修）      │
                    │  - CBT技法の定義              │
                    │  - 心理症状の妥当性監修       │
                    └───────┬───────────────────┬───┘
                            │                   │
                            │ 監修              │ 監修
                            ▼                   ▼
┌─────────────────────────────────┐    ┌──────────────────────┐
│     01_GameDesigner             │◀───│  07_ScenarioWriter   │
│   （ゲーム全体の仕様策定）       │    │  （テキスト執筆）     │
│ - ステータス仕様                │    │ - NPC会話            │
│ - おばけ/モンスター設計         │    │ - おばけセリフ       │
│ - アイテム仕様                  │    │ - 石板テキスト       │
│ - ステージ設計                  │    │ - キャラ設定         │
└──────┬──────┬──────┬──────────┘    └──────┬───────────────┘
       │      │      │                        │
       │      │      │                        │ テキスト提供
       ▼      ▼      ▼                        ▼
  ┌────────┐ ┌──────┐ ┌─────────┐    ┌──────────────┐
  │02_     │ │03_   │ │05_      │◀───│ 会話データ   │
  │Status  │ │Battle│ │MapEvent │    └──────────────┘
  │System  │ │System│ │System   │
  │        │ │      │ │         │
  │ステータス│ │戦闘  │ │NPC/     │
  │管理・計算│ │ロジック│ │イベント │
  └───┬────┘ └───┬──┘ └────┬────┘
      │          │         │
      └──────┬───┴────┬────┘
             │        │
             ▼        ▼
       ┌────────────────────────┐
       │   04_UIDesigner        │
       │ （すべてのUIを統合）    │
       │ - ステータスUI          │
       │ - 会話UI                │
       │ - 戦闘UI                │
       └─────────┬──────────────┘
                 │
                 ▼
       ┌─────────────────────────┐
       │  06_IntegrationTest     │
       │  （全体の統合・テスト）  │
       │  - ユニットテスト        │
       │  - 統合テスト            │
       │  - バグ修正              │
       │  - バランス調整          │
       └─────────────────────────┘
                 △
                 │ フィードバック
                 │
         ┌───────┴────────┐
         │                │
    全エージェントへフィードバック
```

---

## 開発フロー

### Phase 1: 仕様策定
```
01_GameDesigner
   │
   ├─→ game_concept.md
   ├─→ status_specification.md
   ├─→ ghost_monster_design.md
   ├─→ item_specification.md
   └─→ stage_design.md
   
   ↓ 仕様書完成
```

### Phase 2: コアシステム実装
```
02_StatusSystem          04_UIDesigner        05_MapEventSystem
   │                         │                      │
   ├─→ statusManager.js     ├─→ statusUI.js       ├─→ eventManager.js
   ├─→ mpSystem.js          ├─→ dialogueUI.js     ├─→ npcSystem.js
   └─→ visibilityCtrl.js    └─→ ui-styles.css    └─→ itemSystem.js
   
   ↓ テスト（06_IntegrationTest）
```

### Phase 3: 戦闘システム実装
```
03_BattleSystem          04_UIDesigner
   │                         │
   ├─→ battleManager.js     ├─→ battleUI.js
   ├─→ ghostEntity.js       └─→ battleEffects.js
   └─→ cbtTechniques.js
   
   ↓ テスト（06_IntegrationTest）
```

### Phase 4: プロトタイプ完成
```
05_MapEventSystem
   │
   ├─→ prototypeStage.js
   ├─→ dialogueData.js
   └─→ eventScripts.js
   
   ↓ 統合（06_IntegrationTest）
   
06_IntegrationTest
   │
   ├─→ 全システム統合テスト
   ├─→ プレイテスト
   └─→ バランス調整
   
   ↓
   
   ✅ プロトタイプ完成
```

---

## ドキュメント一覧

### ルートレベル
| ファイル | 内容 | 状態 |
|---------|------|------|
| `00_PROJECT_OVERVIEW.md` | プロジェクト全体概要 | ✅ 完成 |
| `ROADMAP.md` | 開発ロードマップ | ✅ 完成 |
| `GETTING_STARTED.md` | 作業開始ガイド | ✅ 完成 |
| `PROJECT_STRUCTURE.md` | このファイル | ✅ 完成 |

### shared/（共有リソース）
| ファイル | 内容 | 状態 |
|---------|------|------|
| `data_structures.md` | データ構造定義 | ✅ 提案完成 |
| `constants.md` | 定数定義 | ✅ 提案完成 |

### 各エージェント
| エージェント | README | 状態 |
|-------------|--------|------|
| 01_GameDesigner | ✅ | タスク定義完了 |
| 02_StatusSystem | ✅ | タスク定義完了 |
| 03_BattleSystem | ✅ | タスク定義完了 |
| 04_UIDesigner | ✅ | タスク定義完了 |
| 05_MapEventSystem | ✅ | タスク定義完了 |
| 06_IntegrationTest | ✅ | タスク定義完了 |
| 07_ScenarioWriter | ✅ | タスク定義完了 |
| 08_OccupationalTherapist | ✅ | タスク定義完了 |

---

## 次のステップ

### 即座に開始可能
✅ **01_GameDesigner**: 仕様書の作成開始
✅ **07_ScenarioWriter**: キャラクター設定開始
✅ **08_OccupationalTherapist**: CBT技法ガイド作成開始

### 01完了後に開始
⏳ **02_StatusSystem**: ステータス管理実装（08が監修）
⏳ **03_BattleSystem**: 戦闘システム実装（08が監修）
⏳ **04_UIDesigner**: UI実装
⏳ **05_MapEventSystem**: イベント/ステージ実装（07とテキスト連携）
⏳ **06_IntegrationTest**: テスト開始

---

## 重要な設計方針（資料準拠）

### セルフモニタリング（自己観察）の設計
- **自分の状態を段階的に知る体験**（HP, MP, 疲労度, 気分, 体調, 不安度, 覚醒度等）
- 初期は自分の状態が分からない、石板（CBT知見）で段階的に気づく
- 潜在的に変化するが自覚できない → **モニタリングの重要性を体験**
- **ステータス相互作用**: 不安度が高い + 覚醒度が高い + 疲労度が高い → 特殊動作

### 自己理解の4段階（モニタリングの深化）
1. **気づかない** → 2. **なんとなく分かる** → 3. **おおよそ分かる** → 4. **正確に把握**

### 作業療法・復職体験の模倣
- **休職から復職へのプロセス**を疑似体験
- **CBT技法**を実際に使って心理的症状に対処
- 対人関係、環境変化、心理的ハードルの再現

### おばけシステム
- 心理的症状の擬人化
- 物理攻撃無効
- CBT技法による専用対処が必要

### プロトタイプステージ
- 「職場復帰の朝」
- 自宅から職場まで
- NPC会話、おばけ遭遇、アイテム獲得、クリア判定

---

**最終更新**: 2025/10/30
**現在のPhase**: Phase 0完了、Phase 1開始準備完了
**体制**: 8エージェント（01-06 + 07シナリオライター + 08作業療法士）

