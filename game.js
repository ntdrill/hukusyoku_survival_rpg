// ===== 定数 =====
const TILE_SIZE = 32;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;
const MOVE_ANIMATION_DURATION = 150;

const TILES = { GROUND: 0, GRASS: 1, ROCK: 2 };
const DIRECTIONS = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };
const VISIBILITY = { HIDDEN: 0, REDACTED: 1, LEVEL: 2, NUMERIC: 3 };

// ===== カラーパレット (0=透明) =====
const PALETTE = [
    null,        // 0: 透明
    '#FFDAB9',   // 1: 肌色
    '#3D2B1F',   // 2: 黒髪
    '#F0F0F0',   // 3: ワイシャツ（白）
    '#1E3A5F',   // 4: スーツ（紺）
    '#111111',   // 5: 靴（黒）
    '#CC2200',   // 6: ネクタイ（赤）
    '#E8EAFF',   // 7: おばけ体（青白）
    '#4455FF',   // 8: おばけ目（青）
    '#FFD700',   // 9: 金色（NPC服・クリアアイテム）
    '#1565C0',   // 10: 青ズボン（NPC）
    '#FF5555',   // 11: 赤（モンスター体）
    '#8B4513',   // 12: 茶色（石板外枠）
    '#F5DEB3',   // 13: 小麦色（石板内側）
    '#FF8800',   // 14: オレンジ（モンスター目）
    '#FFFF44',   // 15: 明黄色（クリアアイテム輝き）
];

// ===== スプライト定義 8×8ピクセルアート =====
const SPRITES = {
    PLAYER_DOWN: [
        [0,0,2,2,2,2,0,0],
        [0,2,1,1,1,1,2,0],
        [0,1,0,1,1,0,1,0],
        [0,1,1,1,1,1,1,0],
        [0,4,3,6,6,3,4,0],
        [0,4,4,4,4,4,4,0],
        [0,0,4,0,0,4,0,0],
        [0,0,5,0,0,5,0,0],
    ],
    PLAYER_UP: [
        [0,0,2,2,2,2,0,0],
        [0,2,2,2,2,2,2,0],
        [0,2,1,1,1,1,2,0],
        [0,0,1,1,1,1,0,0],
        [0,4,4,4,4,4,4,0],
        [0,4,4,4,4,4,4,0],
        [0,0,4,0,0,4,0,0],
        [0,0,5,0,0,5,0,0],
    ],
    PLAYER_LEFT: [
        [0,0,2,2,2,0,0,0],
        [0,2,1,1,1,2,0,0],
        [0,2,0,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,4,3,6,4,0,0],
        [0,4,4,4,4,0,0,0],
        [0,0,4,0,4,0,0,0],
        [0,0,5,0,5,0,0,0],
    ],
    PLAYER_RIGHT: [
        [0,0,0,2,2,2,0,0],
        [0,0,2,1,1,1,2,0],
        [0,0,1,1,1,0,2,0],
        [0,0,1,1,1,1,0,0],
        [0,0,4,6,3,4,0,0],
        [0,0,0,4,4,4,4,0],
        [0,0,0,4,0,4,0,0],
        [0,0,0,5,0,5,0,0],
    ],
    GHOST: [
        [0,0,7,7,7,7,0,0],
        [0,7,7,7,7,7,7,0],
        [0,7,8,7,7,8,7,0],
        [0,7,8,7,7,8,7,0],
        [0,7,7,7,7,7,7,0],
        [0,7,7,7,7,7,7,0],
        [7,7,0,7,7,0,7,7],
        [7,0,0,7,7,0,0,7],
    ],
    NPC: [
        [0,0,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,0],
        [0,1,2,1,1,2,1,0],
        [0,0,1,1,1,1,0,0],
        [0,9,9,9,9,9,9,0],
        [0,9,9,9,9,9,9,0],
        [0,10,10,0,0,10,10,0],
        [0,10,10,0,0,10,10,0],
    ],
    MONSTER: [
        [0,11,11,11,11,11,11,0],
        [11,11,14,11,11,14,11,11],
        [11,11,14,11,11,14,11,11],
        [11,11,11,11,11,11,11,11],
        [0,11,11,11,11,11,11,0],
        [11,0,11,11,11,11,0,11],
        [0,11,0,11,11,0,11,0],
        [0,0,11,0,0,11,0,0],
    ],
    TABLET: [
        [0,12,12,12,12,12,12,0],
        [12,13,13,13,13,13,13,12],
        [12,13,12,12,12,12,13,12],
        [12,13,12,13,13,12,13,12],
        [12,13,12,13,13,12,13,12],
        [12,13,12,12,12,12,13,12],
        [12,13,13,13,13,13,13,12],
        [0,12,12,12,12,12,12,0],
    ],
    CLEAR_ITEM: [
        [0,0,0,9,9,0,0,0],
        [0,0,9,15,15,9,0,0],
        [0,9,15,9,9,15,9,0],
        [9,15,9,9,9,9,15,9],
        [9,15,9,9,9,9,15,9],
        [0,9,15,9,9,15,9,0],
        [0,0,9,15,15,9,0,0],
        [0,0,0,9,9,0,0,0],
    ],
};

// ===== プロトタイプマップ 20×15 =====
// 岩壁（col 8, col 12）が中央を縦断し、row 7 の通路（ゴーストが守る）が唯一の東西通路
const PROTOTYPE_MAP = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2],
    [2,0,1,1,0,0,0,0,2,0,0,0,2,0,0,0,1,1,0,2],
    [2,0,1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,1,0,2],
    [2,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2],
    [2,0,1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,1,0,2],
    [2,0,1,1,0,0,0,0,2,0,0,0,2,0,0,0,1,1,0,2],
    [2,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

// ===== ステージエンティティ配置 =====
const PROTOTYPE_STAGE = {
    playerStart: { x: 1, y: 7 },
    npcs: [
        {
            id: 'npc_tanaka',
            x: 5, y: 3,
            name: '田中さん（同僚）',
            dialogues: [
                '田中: おはようございます！お久しぶりですね。',
                '田中: 体の具合はいかがですか？今日は無理しないでくださいね。',
                '田中: ゆっくりペースで大丈夫ですよ。応援してます！',
            ],
            mpCost: -2,
        },
        {
            id: 'npc_yamada',
            x: 16, y: 4,
            name: '山田部長（上司）',
            dialogues: [
                '山田部長: ……戻ってきたか。',
                '山田部長: 休んでいた分、仕事が溜まっているが……',
                '山田部長: まあ、今日は様子見だ。早めに上がっていい。',
            ],
            mpCost: -15,
        },
    ],
    ghosts: [
        {
            id: 'ghost_anxiety',
            x: 9, y: 7,
            type: 'ghost',
            name: '不安のおばけ',
            hp: 80, maxHp: 80,
            weak: ['breathing', 'mindfulness'],
            attackDamage: [8, 15],
            battleIntro: '不安のおばけが立ちはだかった！物理攻撃は効かないようだ……',
        },
    ],
    monsters: [
        {
            id: 'monster_stress',
            x: 14, y: 11,
            type: 'monster',
            name: 'ストレスモンスター',
            hp: 50, maxHp: 50,
            attackDamage: [5, 12],
            battleIntro: 'ストレスモンスターが現れた！',
        },
    ],
    tablets: [
        {
            id: 'tablet_monitoring',
            x: 4, y: 11,
            name: 'セルフモニタリングの石板',
            knowledge: '【セルフモニタリング】\n\n自分の状態を観察することで、\n気づかないうちに失われていた\nエネルギーに気づくことができます。\n\n─── MPの存在に気づいた ───',
            unlocks: 'mp',
        },
    ],
    clearItem: { id: 'clear', x: 18, y: 7 },
};

// ===== CBT技法 =====
const CBT_TECHNIQUES = [
    { id: 'breathing',               name: '呼吸法',         mpCost: 5,  damage: 20 },
    { id: 'mindfulness',             name: 'マインドフルネス', mpCost: 10, damage: 28 },
    { id: 'cognitive_restructuring', name: '認知再構成',      mpCost: 15, damage: 35 },
];

// ===== ゲーム状態 =====
const game = {
    canvas: null,
    ctx: null,
    player: {
        x: 1, y: 7,
        direction: DIRECTIONS.RIGHT,
        animX: 1, animY: 7,
        isMoving: false,
    },
    status: {
        hp: { value: 100, max: 100, visibility: VISIBILITY.NUMERIC },
        mp: { value: 100, max: 100, visibility: VISIBILITY.HIDDEN },
    },
    map: [],
    tilePatterns: {},
    entities: { npcs: [], ghosts: [], monsters: [], tablets: [], clearItem: null },
    state: 'playing', // 'playing' | 'dialogue' | 'battle' | 'tablet' | 'clear' | 'gameover'
    dialogue: null,
    battle: null,
    animationFrame: null,
    notificationTimer: null,
};

// ===== スプライト描画 =====
function drawSprite(ctx, sprite, x, y, pixelSize) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const ci = sprite[row][col];
            if (ci === 0 || !PALETTE[ci]) continue;
            ctx.fillStyle = PALETTE[ci];
            ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
        }
    }
}

// ===== タイルパターン生成（固定） =====
function generateTilePattern(type) {
    const p = { data: [] };
    if (type === TILES.GROUND) {
        for (let i = 0; i < 4; i++) p.data.push({ x: Math.random(), y: Math.random() });
    } else if (type === TILES.GRASS) {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                p.data.push({ i, j, show: Math.random() > 0.5 });
    }
    return p;
}

// ===== タイル描画 =====
function drawTile(ctx, x, y, size, type, pattern) {
    const px = Math.floor(x);
    const py = Math.floor(y);
    const ps = size / 8;

    switch (type) {
        case TILES.GROUND:
            ctx.fillStyle = '#8B7355';
            ctx.fillRect(px, py, size, size);
            ctx.fillStyle = '#9B8368';
            if (pattern) {
                for (const d of pattern.data) {
                    ctx.fillRect(px + Math.floor(d.x * 8) * ps, py + Math.floor(d.y * 8) * ps, ps, ps);
                }
            }
            break;

        case TILES.GRASS:
            ctx.fillStyle = '#2D8C30';
            ctx.fillRect(px, py, size, size);
            if (pattern) {
                for (const it of pattern.data) {
                    if (!it.show) continue;
                    ctx.fillStyle = '#3ECC44';
                    ctx.fillRect(px + it.i * ps * 2 + ps, py + it.j * ps * 2, ps, ps * 2);
                    ctx.fillStyle = '#1EAC24';
                    ctx.fillRect(px + it.i * ps * 2, py + it.j * ps * 2 + ps, ps, ps);
                }
            }
            break;

        case TILES.ROCK:
            ctx.fillStyle = '#555555';
            ctx.fillRect(px, py, size, size);
            ctx.fillStyle = '#777777';
            ctx.fillRect(px + ps, py + ps, size - ps * 2, size - ps * 2);
            ctx.fillStyle = '#888888';
            ctx.fillRect(px + ps * 2, py + ps * 2, ps * 2, ps);
            ctx.fillStyle = '#333333';
            ctx.fillRect(px + ps * 2, py + ps * 4, ps * 3, ps);
            break;
    }
}

// ===== 全体描画 =====
function render() {
    game.ctx.imageSmoothingEnabled = false;
    game.ctx.fillStyle = '#1a252f';
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    for (let y = 0; y < GRID_HEIGHT; y++)
        for (let x = 0; x < GRID_WIDTH; x++)
            drawTile(game.ctx, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, game.map[y][x], game.tilePatterns[`${x}_${y}`]);

    const ps = TILE_SIZE / 8;

    for (const e of game.entities.npcs) {
        drawTile(game.ctx, e.x * TILE_SIZE, e.y * TILE_SIZE, TILE_SIZE, TILES.GROUND, game.tilePatterns[`${e.x}_${e.y}`]);
        drawSprite(game.ctx, SPRITES.NPC, e.x * TILE_SIZE, e.y * TILE_SIZE, ps);
    }
    for (const e of game.entities.ghosts) {
        drawTile(game.ctx, e.x * TILE_SIZE, e.y * TILE_SIZE, TILE_SIZE, TILES.GROUND, game.tilePatterns[`${e.x}_${e.y}`]);
        drawSprite(game.ctx, SPRITES.GHOST, e.x * TILE_SIZE, e.y * TILE_SIZE, ps);
    }
    for (const e of game.entities.monsters) {
        drawTile(game.ctx, e.x * TILE_SIZE, e.y * TILE_SIZE, TILE_SIZE, TILES.GROUND, game.tilePatterns[`${e.x}_${e.y}`]);
        drawSprite(game.ctx, SPRITES.MONSTER, e.x * TILE_SIZE, e.y * TILE_SIZE, ps);
    }
    for (const e of game.entities.tablets) {
        drawTile(game.ctx, e.x * TILE_SIZE, e.y * TILE_SIZE, TILE_SIZE, TILES.GROUND, game.tilePatterns[`${e.x}_${e.y}`]);
        drawSprite(game.ctx, SPRITES.TABLET, e.x * TILE_SIZE, e.y * TILE_SIZE, ps);
    }
    if (game.entities.clearItem) {
        const ci = game.entities.clearItem;
        drawTile(game.ctx, ci.x * TILE_SIZE, ci.y * TILE_SIZE, TILE_SIZE, TILES.GROUND, game.tilePatterns[`${ci.x}_${ci.y}`]);
        drawSprite(game.ctx, SPRITES.CLEAR_ITEM, ci.x * TILE_SIZE, ci.y * TILE_SIZE, ps);
    }

    const dirSprite = {
        [DIRECTIONS.UP]:    SPRITES.PLAYER_UP,
        [DIRECTIONS.RIGHT]: SPRITES.PLAYER_RIGHT,
        [DIRECTIONS.DOWN]:  SPRITES.PLAYER_DOWN,
        [DIRECTIONS.LEFT]:  SPRITES.PLAYER_LEFT,
    };
    const spr = dirSprite[game.player.direction] || SPRITES.PLAYER_DOWN;
    drawSprite(game.ctx, spr,
        Math.floor(game.player.animX * TILE_SIZE),
        Math.floor(game.player.animY * TILE_SIZE),
        ps
    );
}

// ===== アニメーション =====
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function animateMove(sx, sy, ex, ey, t0) {
    const p = Math.min((Date.now() - t0) / MOVE_ANIMATION_DURATION, 1);
    const e = easeOutCubic(p);
    game.player.animX = sx + (ex - sx) * e;
    game.player.animY = sy + (ey - sy) * e;
    render();
    if (p < 1) {
        game.animationFrame = requestAnimationFrame(() => animateMove(sx, sy, ex, ey, t0));
    } else {
        game.player.animX = ex;
        game.player.animY = ey;
        game.player.isMoving = false;
        render();
    }
}

// ===== ステータス管理 =====
function applyStatusChange(changes) {
    for (const [k, d] of Object.entries(changes)) {
        if (game.status[k]) {
            game.status[k].value = Math.max(0, Math.min(game.status[k].max, game.status[k].value + d));
        }
    }
    updateStatusUI();
    if (game.status.hp.value <= 0) showGameOver();
}

function updateStatusUI() {
    const hp = game.status.hp;
    document.getElementById('hpValue').textContent = Math.floor(hp.value);
    const hpPct = hp.value / hp.max;
    const hpBar = document.getElementById('hpBar');
    hpBar.style.width = (hpPct * 100) + '%';
    hpBar.style.backgroundColor = hpPct > 0.5 ? '#e74c3c' : hpPct > 0.25 ? '#e67e22' : '#c0392b';

    const mp = game.status.mp;
    const mpPanel = document.getElementById('mpPanel');
    if (mp.visibility === VISIBILITY.HIDDEN) {
        mpPanel.style.display = 'none';
    } else {
        mpPanel.style.display = 'flex';
        const mpBar = document.getElementById('mpBar');
        if (mp.visibility === VISIBILITY.REDACTED) {
            document.getElementById('mpValue').textContent = '███';
            mpBar.style.display = 'none';
        } else if (mp.visibility === VISIBILITY.LEVEL) {
            const v = mp.value;
            document.getElementById('mpValue').textContent = v > 66 ? 'たくさん' : v > 33 ? 'ふつう' : 'ほとんど無い';
            mpBar.style.display = 'none';
        } else {
            document.getElementById('mpValue').textContent = Math.floor(mp.value);
            mpBar.style.display = 'block';
            mpBar.style.width = (mp.value / mp.max * 100) + '%';
        }
    }
}

function showNotification(text) {
    const el = document.getElementById('notification');
    el.textContent = text;
    el.style.display = 'block';
    el.style.opacity = '1';
    el.style.transition = 'none';
    if (game.notificationTimer) clearTimeout(game.notificationTimer);
    game.notificationTimer = setTimeout(() => {
        el.style.transition = 'opacity 0.4s';
        el.style.opacity = '0';
        setTimeout(() => { el.style.display = 'none'; }, 400);
    }, 2500);
}

// ===== マップ初期化 =====
function initMap() {
    game.map = PROTOTYPE_MAP.map(r => [...r]);
    game.tilePatterns = {};
    for (let y = 0; y < GRID_HEIGHT; y++)
        for (let x = 0; x < GRID_WIDTH; x++)
            game.tilePatterns[`${x}_${y}`] = generateTilePattern(game.map[y][x]);

    game.entities = {
        npcs:     PROTOTYPE_STAGE.npcs.map(e => ({ ...e })),
        ghosts:   PROTOTYPE_STAGE.ghosts.map(e => ({ ...e })),
        monsters: PROTOTYPE_STAGE.monsters.map(e => ({ ...e })),
        tablets:  PROTOTYPE_STAGE.tablets.map(e => ({ ...e })),
        clearItem: { ...PROTOTYPE_STAGE.clearItem },
    };

    const ps = PROTOTYPE_STAGE.playerStart;
    game.player.x = ps.x; game.player.y = ps.y;
    game.player.animX = ps.x; game.player.animY = ps.y;
    game.player.direction = DIRECTIONS.RIGHT;
    game.player.isMoving = false;

    game.status = {
        hp: { value: 100, max: 100, visibility: VISIBILITY.NUMERIC },
        mp: { value: 100, max: 100, visibility: VISIBILITY.HIDDEN },
    };
    game.state = 'playing';
    game.dialogue = null;
    game.battle = null;
}

// ===== 移動 =====
function findAt(list, x, y) {
    return list.find(e => e.x === x && e.y === y) || null;
}

function movePlayer(dx, dy) {
    if (game.player.isMoving || game.state !== 'playing') return;

    if      (dy < 0) game.player.direction = DIRECTIONS.UP;
    else if (dy > 0) game.player.direction = DIRECTIONS.DOWN;
    else if (dx < 0) game.player.direction = DIRECTIONS.LEFT;
    else if (dx > 0) game.player.direction = DIRECTIONS.RIGHT;

    const nx = game.player.x + dx;
    const ny = game.player.y + dy;

    if (nx < 0 || nx >= GRID_WIDTH || ny < 0 || ny >= GRID_HEIGHT) { render(); return; }
    if (game.map[ny][nx] === TILES.ROCK) { render(); return; }

    const npc     = findAt(game.entities.npcs,     nx, ny);
    const ghost   = findAt(game.entities.ghosts,   nx, ny);
    const monster = findAt(game.entities.monsters, nx, ny);
    const tablet  = findAt(game.entities.tablets,  nx, ny);
    const ci = game.entities.clearItem;

    if (npc)                               { render(); showDialogue(npc);    return; }
    if (ghost)                             { render(); startBattle(ghost);   return; }
    if (monster)                           { render(); startBattle(monster); return; }
    if (tablet)                            { render(); collectTablet(tablet); return; }
    if (ci && ci.x === nx && ci.y === ny)  { render(); showClearScreen();    return; }

    applyStatusChange({ mp: -0.5 });

    game.player.isMoving = true;
    const sx = game.player.x, sy = game.player.y;
    game.player.x = nx;
    game.player.y = ny;
    animateMove(sx, sy, nx, ny, Date.now());
}

// ===== 会話システム =====
function showDialogue(npc) {
    game.state = 'dialogue';
    game.dialogue = { npc, line: 0 };
    document.getElementById('npcName').textContent = npc.name;
    document.getElementById('dialogueText').textContent = npc.dialogues[0];
    document.getElementById('dialogueBox').style.display = 'flex';
    applyStatusChange({ mp: npc.mpCost });
}

function advanceDialogue() {
    if (game.state !== 'dialogue' || !game.dialogue) return;
    game.dialogue.line++;
    if (game.dialogue.line >= game.dialogue.npc.dialogues.length) {
        closeDialogue();
    } else {
        document.getElementById('dialogueText').textContent = game.dialogue.npc.dialogues[game.dialogue.line];
    }
}

function closeDialogue() {
    game.state = 'playing';
    game.dialogue = null;
    document.getElementById('dialogueBox').style.display = 'none';
    render();
}

// ===== 石板システム =====
function collectTablet(tablet) {
    game.entities.tablets = game.entities.tablets.filter(t => t.id !== tablet.id);
    if (tablet.unlocks === 'mp') game.status.mp.visibility = VISIBILITY.REDACTED;

    game.state = 'tablet';
    document.getElementById('tabletName').textContent = tablet.name;
    document.getElementById('tabletText').textContent = tablet.knowledge;
    document.getElementById('tabletScreen').style.display = 'flex';

    updateStatusUI();
    showNotification('石板を入手！MPの存在に気づいた！');
    render();
}

function closeTablet() {
    game.state = 'playing';
    document.getElementById('tabletScreen').style.display = 'none';
    render();
}

// ===== 戦闘システム =====
function startBattle(enemy) {
    game.state = 'battle';
    game.battle = { enemy: { ...enemy }, playerTurn: true };

    document.getElementById('battleScreen').style.display = 'flex';
    document.getElementById('battleLog').innerHTML = '';

    const attackBtn = document.getElementById('attackBtn');
    if (enemy.type === 'ghost') {
        attackBtn.textContent = '攻撃（無効）';
        attackBtn.style.opacity = '0.5';
    } else {
        attackBtn.textContent = '攻撃';
        attackBtn.style.opacity = '1';
    }

    updateBattleUI();
    setTimeout(() => addBattleLog(enemy.battleIntro || `${enemy.name}が現れた！`), 200);
    setBattleButtonsEnabled(true);
}

function updateBattleUI() {
    if (!game.battle) return;
    const e = game.battle.enemy;
    document.getElementById('enemyName').textContent = e.name;
    document.getElementById('enemyHpBar').style.width = (e.hp / e.maxHp * 100) + '%';
    document.getElementById('enemyHpText').textContent = `HP: ${e.hp} / ${e.maxHp}`;
    document.getElementById('playerBattleHp').textContent = `HP: ${Math.floor(game.status.hp.value)}`;

    const mpEl = document.getElementById('playerBattleMp');
    if (game.status.mp.visibility !== VISIBILITY.HIDDEN) {
        mpEl.textContent = `MP: ${Math.floor(game.status.mp.value)}`;
        mpEl.style.display = 'inline';
    } else {
        mpEl.style.display = 'none';
    }
}

function setBattleButtonsEnabled(enabled) {
    document.querySelectorAll('.battle-btn').forEach(b => { b.disabled = !enabled; });
    if (enabled) {
        for (const t of CBT_TECHNIQUES) {
            const btn = document.getElementById(`tech_${t.id}`);
            if (btn) btn.disabled = game.status.mp.value < t.mpCost;
        }
    }
}

function addBattleLog(text) {
    const log = document.getElementById('battleLog');
    const p = document.createElement('p');
    p.textContent = text;
    log.appendChild(p);
    while (log.children.length > 8) log.removeChild(log.firstChild);
    log.scrollTop = log.scrollHeight;
}

function doBattleAction(type, techId) {
    if (!game.battle || !game.battle.playerTurn || game.state !== 'battle') return;
    game.battle.playerTurn = false;
    setBattleButtonsEnabled(false);

    const enemy = game.battle.enemy;
    let dmg = 0;

    if (type === 'attack') {
        if (enemy.type === 'ghost') {
            addBattleLog('攻撃！……しかしおばけには効かなかった！');
        } else {
            dmg = 20;
            addBattleLog(`攻撃！${dmg}のダメージを与えた！`);
        }
    } else if (type === 'technique') {
        const tech = CBT_TECHNIQUES.find(t => t.id === techId);
        if (!tech) { game.battle.playerTurn = true; setBattleButtonsEnabled(true); return; }
        if (game.status.mp.value < tech.mpCost) {
            addBattleLog('MPが足りない！');
            game.battle.playerTurn = true;
            setBattleButtonsEnabled(true);
            return;
        }
        applyStatusChange({ mp: -tech.mpCost });
        const isWeak = enemy.weak && enemy.weak.includes(techId);
        dmg = Math.floor(tech.damage * (isWeak ? 2.0 : 1.0));
        addBattleLog(`${tech.name}！${isWeak ? '弱点に効いた！' : ''}${dmg}のダメージ！`);

    } else if (type === 'escape') {
        addBattleLog('逃げた！');
        setTimeout(closeBattle, 1200);
        return;
    }

    enemy.hp = Math.max(0, enemy.hp - dmg);
    updateBattleUI();

    if (enemy.hp <= 0) {
        addBattleLog(`${enemy.name}を倒した！`);
        setTimeout(() => {
            if (enemy.type === 'ghost') {
                game.entities.ghosts = game.entities.ghosts.filter(g => g.id !== enemy.id);
            } else {
                game.entities.monsters = game.entities.monsters.filter(m => m.id !== enemy.id);
            }
            closeBattle();
            showNotification(`${enemy.name}を倒した！`);
        }, 1500);
        return;
    }

    setTimeout(enemyTurn, 900);
}

function enemyTurn() {
    if (!game.battle || game.state !== 'battle') return;
    const e = game.battle.enemy;
    const [min, max] = e.attackDamage || [5, 12];
    const dmg = Math.floor(Math.random() * (max - min + 1)) + min;

    applyStatusChange({ hp: -dmg });
    if (game.state !== 'battle') return; // HPが0になりゲームオーバーした場合

    addBattleLog(`${e.name}の攻撃！${dmg}のダメージ！`);
    updateBattleUI();
    game.battle.playerTurn = true;
    setBattleButtonsEnabled(true);
}

function closeBattle() {
    game.state = 'playing';
    game.battle = null;
    document.getElementById('battleScreen').style.display = 'none';
    render();
}

// ===== クリア =====
function showClearScreen() {
    game.state = 'clear';
    game.entities.clearItem = null;
    document.getElementById('clearHp').textContent = Math.floor(game.status.hp.value);
    document.getElementById('clearMp').textContent =
        game.status.mp.visibility !== VISIBILITY.HIDDEN
            ? Math.floor(game.status.mp.value)
            : '???';
    document.getElementById('clearScreen').style.display = 'flex';
    render();
}

// ===== ゲームオーバー =====
function showGameOver() {
    if (game.state === 'gameover') return;
    game.state = 'gameover';
    document.getElementById('battleScreen').style.display = 'none';
    document.getElementById('gameoverScreen').style.display = 'flex';
}

// ===== リスタート =====
function restartGame() {
    ['clearScreen', 'gameoverScreen', 'dialogueBox', 'battleScreen', 'tabletScreen']
        .forEach(id => { document.getElementById(id).style.display = 'none'; });
    document.getElementById('battleLog').innerHTML = '';
    initMap();
    updateStatusUI();
    render();
}

// ===== キーボード入力 =====
function handleKeyPress(ev) {
    const k = ev.key.toLowerCase();

    if (game.state === 'dialogue') {
        if (k === 'enter' || k === ' ' || k === 'z') { ev.preventDefault(); advanceDialogue(); }
        return;
    }
    if (game.state === 'tablet') {
        if (k === 'enter' || k === ' ' || k === 'z') { ev.preventDefault(); closeTablet(); }
        return;
    }
    if (game.state === 'playing') {
        const moves = {
            arrowup: [0,-1], w: [0,-1],
            arrowdown: [0,1], s: [0,1],
            arrowleft: [-1,0], a: [-1,0],
            arrowright: [1,0], d: [1,0],
        };
        if (moves[k]) { ev.preventDefault(); movePlayer(...moves[k]); }
    }
}

// ===== 初期化 =====
function init() {
    game.canvas = document.getElementById('gameCanvas');
    game.ctx = game.canvas.getContext('2d');
    game.canvas.width  = GRID_WIDTH  * TILE_SIZE;
    game.canvas.height = GRID_HEIGHT * TILE_SIZE;

    initMap();
    updateStatusUI();
    document.addEventListener('keydown', handleKeyPress);
    render();

    console.log('復職RPG 起動。矢印キー または WASD で移動。Enter/Space でイベント続行。');
}

window.addEventListener('load', init);
