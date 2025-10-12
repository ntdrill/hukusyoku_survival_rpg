# 復職RPG 🎮

2DグリッドベースのRPGゲーム。主人公（矢印）を操作してマップを探索しよう！

## 🚀 プレイ方法

### 0. Gitのインストール（初回のみ）

Gitがインストールされていない場合は、まずインストールします。

#### Windowsの場合
1. [Git公式サイト](https://git-scm.com/download/win)にアクセス
2. インストーラーをダウンロード
3. インストーラーを実行（基本的にデフォルト設定でOK）
4. インストール完了後、コマンドプロンプトまたはPowerShellを開いて確認：
   ```bash
   git --version
   ```

#### Macの場合
1. ターミナルを開く
2. 以下のコマンドを実行：
   ```bash
   git --version
   ```
3. Gitがインストールされていない場合、自動的にインストーラーが起動します

#### Linuxの場合
```bash
# Ubuntu/Debian
sudo apt-get install git

# Fedora
sudo dnf install git
```

### 1. Gitの初期設定（初回のみ）

Gitを初めて使う場合は、名前とメールアドレスを設定します：

```bash
git config --global user.name "あなたの名前"
git config --global user.email "your-email@example.com"
```

**例:**
```bash
git config --global user.name "Taro Yamada"
git config --global user.email "taro@example.com"
```

※ GitHubアカウントのメールアドレスを使用してください

設定を確認：
```bash
git config --global user.name
git config --global user.email
```

### 2. リポジトリをクローン

コマンドプロンプト（Windows）またはターミナル（Mac/Linux）を開いて、以下を実行：

```bash
git clone https://github.com/ntdrill/hukusyoku_survival_rpg.git
```

### 3. フォルダに移動

エクスプローラーでhukusyoku_survival_rpgフォルダを開く

### 4. ゲームを起動

`index.html` をダブルクリックしてブラウザで開く

### 5. 操作方法

- **移動**: 矢印キー（↑↓←→）または WASD キー
- **タイル比率のスライダー**: マウスカーソルまたはクリックして矢印キー(←→)

以上！楽しんでください 🎮✨

---

## 📝 補足

- タイル比率は画面下のスライダーで調整できます
- マップは30秒ごとに自動再生成されます
- 岩は通過できません
- おばけに遭遇するとイベントが発生します

## 🔧 トラブルシューティング

### 「git: コマンドが見つかりません」と表示される
→ Gitがインストールされていないか、パスが通っていません。上記の「Gitのインストール」を参照してください。

### 「Please tell me who you are」と表示される
→ Gitの初期設定がされていません。上記の「Gitの初期設定」を参照してください。

### クローン時にパスワードを求められる
→ GitHubアカウントのユーザー名とパスワード（またはPersonal Access Token）を入力してください。
- 2021年以降、パスワード認証が廃止されたため、Personal Access Tokenが必要です
- [GitHubでトークンを作成](https://github.com/settings/tokens)し、パスワードの代わりに使用してください

### ブラウザで開いても何も表示されない
→ `index.html` が正しく開かれているか確認してください。アドレスバーに `file://` で始まるパスが表示されているはずです。
