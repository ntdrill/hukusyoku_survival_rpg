// ゲーム設定
const TILE_SIZE = 32;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;
const MAP_REGENERATE_INTERVAL = 30000; // 30秒ごとにマップ再生成（ミリ秒）
const MOVE_ANIMATION_DURATION = 150; // 移動アニメーション時間（ミリ秒）

// タイルの出現比率（合計が1.0になるように調整）
let TILE_SPAWN_RATES = {
    GROUND: 0.60,   // 60% 地面
    GRASS: 0.25,    // 25% 草
    ROCK: 0.10,     // 10% 岩
    GHOST: 0.05     // 5% おばけ
};

// タイルタイプ
const TILES = {
    GROUND: 0,
    GRASS: 1,
    ROCK: 2,
    GHOST: 3,
    PLAYER: 4
};

// プレイヤーの向き
const DIRECTIONS = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

// ゲーム状態
const game = {
    canvas: null,
    ctx: null,
    player: { 
        x: 10, 
        y: 7,
        direction: DIRECTIONS.UP,  // 初期は上向き
        animX: 10,  // アニメーション用の実座標
        animY: 7,
        isMoving: false  // 移動中フラグ
    },
    map: [],
    tilePatterns: {},  // タイルごとの固定パターン
    lastMapRegenTime: 0,
    animationFrame: null
};

// マップの初期化（ランダムに配置）
function initMap() {
    game.map = [];
    game.tilePatterns = {};  // パターンをリセット
    
    // 累積比率を計算
    const cumulativeRates = [];
    let sum = 0;
    for (const key in TILE_SPAWN_RATES) {
        sum += TILE_SPAWN_RATES[key];
        cumulativeRates.push({ type: TILES[key], rate: sum });
    }
    
    for (let y = 0; y < GRID_HEIGHT; y++) {
        game.map[y] = [];
        for (let x = 0; x < GRID_WIDTH; x++) {
            // ランダムに地形を配置（比率に基づく）
            const rand = Math.random();
            let tileType = TILES.GROUND;
            
            for (const entry of cumulativeRates) {
                if (rand < entry.rate) {
                    tileType = entry.type;
                    break;
                }
            }
            
            game.map[y][x] = tileType;
            
            // 各タイルの固定パターンを生成
            const patternKey = `${x}_${y}`;
            game.tilePatterns[patternKey] = generateTilePattern(tileType);
        }
    }
    
    // プレイヤーの初期位置を地面にする
    game.map[game.player.y][game.player.x] = TILES.GROUND;
    const playerKey = `${game.player.x}_${game.player.y}`;
    game.tilePatterns[playerKey] = generateTilePattern(TILES.GROUND);
    
    // マップ再生成時刻を記録
    game.lastMapRegenTime = Date.now();
}

// タイルごとの固定パターンを生成
function generateTilePattern(tileType) {
    const pattern = { type: tileType, data: [] };
    
    switch(tileType) {
        case TILES.GROUND:
            // 地面の模様位置を固定
            for (let i = 0; i < 4; i++) {
                pattern.data.push({
                    x: Math.random(),
                    y: Math.random()
                });
            }
            break;
            
        case TILES.GRASS:
            // 草の模様を固定
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    pattern.data.push({
                        i: i,
                        j: j,
                        show: Math.random() > 0.5
                    });
                }
            }
            break;
    }
    
    return pattern;
}

// ドット絵を描画する関数（固定パターン使用）
function drawPixelArt(ctx, x, y, size, type, direction = DIRECTIONS.UP, pattern = null) {
    const pixelSize = size / 8; // 8x8のドット絵
    
    switch(type) {
        case TILES.GROUND:
            // 地面（茶色）
            ctx.fillStyle = '#8B7355';
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = '#A0826D';
            if (pattern && pattern.data) {
                for (let i = 0; i < pattern.data.length; i++) {
                    const px = x + pattern.data[i].x * size;
                    const py = y + pattern.data[i].y * size;
                    ctx.fillRect(px, py, pixelSize, pixelSize);
                }
            }
            break;
            
        case TILES.GRASS:
            // 草（緑）
            ctx.fillStyle = '#2ECC40';
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = '#01FF70';
            // 草の模様（固定パターン使用）
            if (pattern && pattern.data) {
                for (let idx = 0; idx < pattern.data.length; idx++) {
                    const item = pattern.data[idx];
                    if (item.show) {
                        ctx.fillRect(x + item.i * pixelSize * 2.5, y + item.j * pixelSize * 2.5, pixelSize, pixelSize * 2);
                    }
                }
            }
            break;
            
        case TILES.ROCK:
            // 岩（グレー）
            ctx.fillStyle = '#555555';
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = '#777777';
            ctx.fillRect(x + pixelSize, y + pixelSize, size - pixelSize * 2, size - pixelSize * 2);
            ctx.fillStyle = '#333333';
            ctx.fillRect(x + pixelSize * 2, y + pixelSize * 3, pixelSize * 2, pixelSize);
            break;
            
        case TILES.GHOST:
            // おばけ（白）
            ctx.fillStyle = '#FFFFFF';
            // 頭部
            ctx.fillRect(x + pixelSize * 2, y + pixelSize, pixelSize * 4, pixelSize * 4);
            // 体部
            ctx.fillRect(x + pixelSize, y + pixelSize * 3, pixelSize * 6, pixelSize * 3);
            // 裾のギザギザ
            ctx.fillRect(x + pixelSize, y + pixelSize * 6, pixelSize * 2, pixelSize);
            ctx.fillRect(x + pixelSize * 4, y + pixelSize * 6, pixelSize * 2, pixelSize);
            // 目
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + pixelSize * 2.5, y + pixelSize * 2.5, pixelSize, pixelSize);
            ctx.fillRect(x + pixelSize * 4.5, y + pixelSize * 2.5, pixelSize, pixelSize);
            break;
            
        case TILES.PLAYER:
            // 矢印（主人公）- 向きによって変化
            ctx.fillStyle = '#FF4136';
            ctx.strokeStyle = '#85001B';
            ctx.lineWidth = 1;
            
            switch(direction) {
                case DIRECTIONS.UP:
                    // 上向き矢印
                    ctx.beginPath();
                    ctx.moveTo(x + size / 2, y + pixelSize);
                    ctx.lineTo(x + size - pixelSize, y + pixelSize * 3);
                    ctx.lineTo(x + pixelSize * 5, y + pixelSize * 3);
                    ctx.lineTo(x + pixelSize * 5, y + size - pixelSize);
                    ctx.lineTo(x + pixelSize * 3, y + size - pixelSize);
                    ctx.lineTo(x + pixelSize * 3, y + pixelSize * 3);
                    ctx.lineTo(x + pixelSize, y + pixelSize * 3);
                    ctx.closePath();
                    break;
                    
                case DIRECTIONS.RIGHT:
                    // 右向き矢印
                    ctx.beginPath();
                    ctx.moveTo(x + size - pixelSize, y + size / 2);
                    ctx.lineTo(x + size - pixelSize * 3, y + pixelSize);
                    ctx.lineTo(x + size - pixelSize * 3, y + pixelSize * 3);
                    ctx.lineTo(x + pixelSize, y + pixelSize * 3);
                    ctx.lineTo(x + pixelSize, y + pixelSize * 5);
                    ctx.lineTo(x + size - pixelSize * 3, y + pixelSize * 5);
                    ctx.lineTo(x + size - pixelSize * 3, y + size - pixelSize);
                    ctx.closePath();
                    break;
                    
                case DIRECTIONS.DOWN:
                    // 下向き矢印
                    ctx.beginPath();
                    ctx.moveTo(x + size / 2, y + size - pixelSize);
                    ctx.lineTo(x + pixelSize, y + size - pixelSize * 3);
                    ctx.lineTo(x + pixelSize * 3, y + size - pixelSize * 3);
                    ctx.lineTo(x + pixelSize * 3, y + pixelSize);
                    ctx.lineTo(x + pixelSize * 5, y + pixelSize);
                    ctx.lineTo(x + pixelSize * 5, y + size - pixelSize * 3);
                    ctx.lineTo(x + size - pixelSize, y + size - pixelSize * 3);
                    ctx.closePath();
                    break;
                    
                case DIRECTIONS.LEFT:
                    // 左向き矢印
                    ctx.beginPath();
                    ctx.moveTo(x + pixelSize, y + size / 2);
                    ctx.lineTo(x + pixelSize * 3, y + size - pixelSize);
                    ctx.lineTo(x + pixelSize * 3, y + pixelSize * 5);
                    ctx.lineTo(x + size - pixelSize, y + pixelSize * 5);
                    ctx.lineTo(x + size - pixelSize, y + pixelSize * 3);
                    ctx.lineTo(x + pixelSize * 3, y + pixelSize * 3);
                    ctx.lineTo(x + pixelSize * 3, y + pixelSize);
                    ctx.closePath();
                    break;
            }
            
            ctx.fill();
            ctx.stroke();
            break;
    }
}

// 画面全体を描画
function render() {
    // 背景をクリア
    game.ctx.fillStyle = '#1a252f';
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
    
    // マップを描画（固定パターン使用）
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const tileType = game.map[y][x];
            const patternKey = `${x}_${y}`;
            const pattern = game.tilePatterns[patternKey];
            
            drawPixelArt(
                game.ctx, 
                x * TILE_SIZE, 
                y * TILE_SIZE, 
                TILE_SIZE, 
                tileType,
                DIRECTIONS.UP,
                pattern
            );
            
            // グリッド線（薄く）
            game.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            game.ctx.lineWidth = 1;
            game.ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    
    // プレイヤーを描画（最前面、アニメーション座標使用）
    drawPixelArt(
        game.ctx, 
        game.player.animX * TILE_SIZE, 
        game.player.animY * TILE_SIZE, 
        TILE_SIZE, 
        TILES.PLAYER,
        game.player.direction
    );
}

// イージング関数（ease-out）
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// 移動アニメーション
function animateMove(startX, startY, endX, endY, startTime) {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / MOVE_ANIMATION_DURATION, 1);
    const easedProgress = easeOutCubic(progress);
    
    // アニメーション座標を更新
    game.player.animX = startX + (endX - startX) * easedProgress;
    game.player.animY = startY + (endY - startY) * easedProgress;
    
    render();
    
    if (progress < 1) {
        // アニメーション継続
        game.animationFrame = requestAnimationFrame(() => {
            animateMove(startX, startY, endX, endY, startTime);
        });
    } else {
        // アニメーション完了
        game.player.animX = endX;
        game.player.animY = endY;
        game.player.isMoving = false;
        render();
    }
}

// プレイヤーの移動
function movePlayer(dx, dy) {
    // 移動中は新しい移動を受け付けない
    if (game.player.isMoving) {
        return false;
    }
    
    // 移動方向に応じて向きを更新
    if (dy < 0) {
        game.player.direction = DIRECTIONS.UP;
    } else if (dy > 0) {
        game.player.direction = DIRECTIONS.DOWN;
    } else if (dx < 0) {
        game.player.direction = DIRECTIONS.LEFT;
    } else if (dx > 0) {
        game.player.direction = DIRECTIONS.RIGHT;
    }
    
    const newX = game.player.x + dx;
    const newY = game.player.y + dy;
    
    // 範囲チェック
    if (newX < 0 || newX >= GRID_WIDTH || newY < 0 || newY >= GRID_HEIGHT) {
        // 向きだけ変更して描画
        render();
        return false;
    }
    
    // 衝突判定（岩は通過不可）
    const targetTile = game.map[newY][newX];
    if (targetTile === TILES.ROCK) {
        // 向きだけ変更して描画
        render();
        return false;
    }
    
    // おばけとの遭遇
    if (targetTile === TILES.GHOST) {
        alert('👻 おばけに遭遇した！');
        // おばけを消す
        game.map[newY][newX] = TILES.GROUND;
        const patternKey = `${newX}_${newY}`;
        game.tilePatterns[patternKey] = generateTilePattern(TILES.GROUND);
    }
    
    // 移動アニメーション開始
    game.player.isMoving = true;
    const startX = game.player.x;
    const startY = game.player.y;
    
    game.player.x = newX;
    game.player.y = newY;
    
    animateMove(startX, startY, newX, newY, Date.now());
    
    return true;
}

// キーボード入力処理
function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    
    switch(key) {
        case 'arrowup':
        case 'w':
            movePlayer(0, -1);
            break;
        case 'arrowdown':
        case 's':
            movePlayer(0, 1);
            break;
        case 'arrowleft':
        case 'a':
            movePlayer(-1, 0);
            break;
        case 'arrowright':
        case 'd':
            movePlayer(1, 0);
            break;
    }
}

// マップ再生成チェック
function checkMapRegeneration() {
    const currentTime = Date.now();
    if (currentTime - game.lastMapRegenTime >= MAP_REGENERATE_INTERVAL) {
        console.log('マップを再生成します！');
        
        // プレイヤーの現在位置を保存
        const playerX = game.player.x;
        const playerY = game.player.y;
        
        // マップ再生成
        initMap();
        
        // プレイヤー位置を復元
        game.player.x = playerX;
        game.player.y = playerY;
        game.player.animX = playerX;
        game.player.animY = playerY;
        
        // プレイヤーの位置を地面にする
        game.map[playerY][playerX] = TILES.GROUND;
        const patternKey = `${playerX}_${playerY}`;
        game.tilePatterns[patternKey] = generateTilePattern(TILES.GROUND);
        
        render();
    }
    
    // 次のチェックをスケジュール
    setTimeout(checkMapRegeneration, 1000); // 1秒ごとにチェック
}

// ゲームの初期化
function init() {
    game.canvas = document.getElementById('gameCanvas');
    game.ctx = game.canvas.getContext('2d');
    
    // キャンバスサイズを設定
    game.canvas.width = GRID_WIDTH * TILE_SIZE;
    game.canvas.height = GRID_HEIGHT * TILE_SIZE;
    
    // マップ初期化
    initMap();
    
    // プレイヤーのアニメーション座標を初期化
    game.player.animX = game.player.x;
    game.player.animY = game.player.y;
    
    // イベントリスナー登録
    document.addEventListener('keydown', handleKeyPress);
    
    // マップ再生成チェック開始
    checkMapRegeneration();
    
    // 初回描画
    render();
    
    console.log('ゲーム開始！矢印キーまたはWASDで移動できます。');
    console.log(`マップは${MAP_REGENERATE_INTERVAL / 1000}秒ごとに再生成されます。`);
}

// ページ読み込み完了後にゲームを初期化
window.addEventListener('load', init);

// タイル比率UIの初期化
function initTileRateUI() {
    const sliders = {
        ground: document.getElementById('groundSlider'),
        grass: document.getElementById('grassSlider'),
        rock: document.getElementById('rockSlider'),
        ghost: document.getElementById('ghostSlider')
    };

    const valueLabels = {
        ground: document.getElementById('groundValue'),
        grass: document.getElementById('grassValue'),
        rock: document.getElementById('rockValue'),
        ghost: document.getElementById('ghostValue')
    };

    const totalIndicator = document.getElementById('totalIndicator');

    // スライダー変更時の処理
    function updateTotal() {
        const ground = parseInt(sliders.ground.value);
        const grass = parseInt(sliders.grass.value);
        const rock = parseInt(sliders.rock.value);
        const ghost = parseInt(sliders.ghost.value);
        const total = ground + grass + rock + ghost;

        // 値の表示を更新
        valueLabels.ground.textContent = ground + '%';
        valueLabels.grass.textContent = grass + '%';
        valueLabels.rock.textContent = rock + '%';
        valueLabels.ghost.textContent = ghost + '%';

        // 合計の表示を更新
        totalIndicator.textContent = `合計: ${total}%`;
        
        // 合計が100%かどうかで色を変更
        if (total === 100) {
            totalIndicator.className = 'total-indicator valid';
        } else {
            totalIndicator.className = 'total-indicator invalid';
        }
    }

    // 各スライダーにイベントリスナーを追加
    sliders.ground.addEventListener('input', updateTotal);
    sliders.grass.addEventListener('input', updateTotal);
    sliders.rock.addEventListener('input', updateTotal);
    sliders.ghost.addEventListener('input', updateTotal);
}

// タイル比率を適用してマップ再生成
function applyTileRates() {
    const ground = parseInt(document.getElementById('groundSlider').value);
    const grass = parseInt(document.getElementById('grassSlider').value);
    const rock = parseInt(document.getElementById('rockSlider').value);
    const ghost = parseInt(document.getElementById('ghostSlider').value);
    const total = ground + grass + rock + ghost;

    if (total !== 100) {
        alert('❌ 合計が100%になるように調整してください。\n現在の合計: ' + total + '%');
        return;
    }

    // 比率を更新（%を0.0-1.0に変換）
    TILE_SPAWN_RATES.GROUND = ground / 100;
    TILE_SPAWN_RATES.GRASS = grass / 100;
    TILE_SPAWN_RATES.ROCK = rock / 100;
    TILE_SPAWN_RATES.GHOST = ghost / 100;

    // プレイヤーの現在位置を保存
    const playerX = game.player.x;
    const playerY = game.player.y;

    // マップ再生成
    initMap();

    // プレイヤー位置を復元
    game.player.x = playerX;
    game.player.y = playerY;
    game.player.animX = playerX;
    game.player.animY = playerY;

    // プレイヤーの位置を地面にする
    game.map[playerY][playerX] = TILES.GROUND;
    const patternKey = `${playerX}_${playerY}`;
    game.tilePatterns[patternKey] = generateTilePattern(TILES.GROUND);

    render();

    console.log('✅ タイル比率を更新しました:', TILE_SPAWN_RATES);
    alert('✅ 設定を適用してマップを再生成しました！');
}

// UIの初期化もページ読み込み時に実行
window.addEventListener('load', initTileRateUI);

