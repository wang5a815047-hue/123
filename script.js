// 簡單示範題庫（新手可直接替換成想出的題目）
const questions = [
    {
        q: "姆莉醬的內褲是甚麼顏色？",
        options: ["紫色", "黑色", "白色", "沒穿"],
        answer: 1,
        tip: "有圖有真相"
    },
    {
        q: "姆莉醬的觀眾名叫什麼？",
        options: ["蚵學家", "蚵P", "小蚵仔", "蠔小"],
        answer: 3,
        tip: "就你啊"
    },
    {
        q: "姆莉醬想要誰的CP小本本？",
        options: ["小智、皮卡丘", "小傑、奇牙", "小當家、阿飛", "柯南、基德"],
        answer: 2,
        tip: "酒砸直播"
    },
    {
        q: "姆莉醬初配信用什麼廚具做料理？",
        options: ["吹風機", "電磁爐", "瓦斯爐", "電熱棒"],
        answer: 0,
        tip: "出配信"
    },
    {
        q: "姆莉醬吃水餃會配什麼？",
        options: ["番茄醬", "草莓醬", "東泉辣椒醬", "醬油"],
        answer: 1,
        tip: "你認為哪個答案最不可能"
    },
    {
        q: "姆莉醬的身高是多少？",
        options: ["6.9公分", "8.7公分", "87公分", "187公分"],
        answer: 0,
        tip: "小小的妳是大大的存在"
    },
    {
        q: "姆莉醬中秋烤肉時沒有加什麼？",
        options: ["東泉辣椒醬", "布丁", "烤肉醬", "草莓醬"],
        answer: 0,
        tip: "台中靈魂醬汁"
    },
    {
        q: "姆莉醬中秋做的月餅沒有加什麼？",
        options: ["水煮蛋", "鳳梨酥", "香腸", "紅豆泥"],
        answer: 3,
        tip: "歌曲〈中秋節的那晚〉"
    },
    {
        q: "姆莉醬酒砸的時候強吻了誰？",
        options: ["Elina", "魷魷", "仙兔", "西希"],
        answer: 1,
        tip: "同類"
    },
    {
        q: "姆莉醬最常說的姆語是什麼？",
        options: ["真蚌", "蠔可愛", "靠悲", "幹"],
        answer: 2,
        tip: "這不需要提示八"
    }
];


let order = [];
let current = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const currentEl = document.getElementById("current");
const totalEl = document.getElementById("total");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", () => {
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

// 初始化
totalEl.textContent = questions.length;

// 隨機排序（簡單打亂）
function shuffle(arr) {
    return arr.slice().sort(() => Math.random() - 0.5);
}

function startGame() {
    order = shuffle(questions);
    current = 0;
    score = 0;
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    feedbackEl.classList.add("hidden");
    nextBtn.classList.add("hidden");
    optionsEl.innerHTML = "";
    const q = order[current];
    currentEl.textContent = current + 1;
    questionEl.textContent = q.q;

    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.dataset.index = i;
        btn.addEventListener("click", onSelect);
        optionsEl.appendChild(btn);
    });
}

function onSelect(e) {
    const btn = e.currentTarget;
    const idx = Number(btn.dataset.index);
    const q = order[current];

    // 禁用所有按鈕
    Array.from(optionsEl.children).forEach(b => b.disabled = true);

    if (idx === q.answer) {
        btn.classList.add("correct");
        score++;
        feedbackEl.textContent = q.tip ? `答對！${q.tip}` : "答對！";
    } else {
        btn.classList.add("wrong");
        // 標示正確答案
        const correctBtn = Array.from(optionsEl.children).find(b => Number(b.dataset.index) === q.answer);
        if (correctBtn) correctBtn.classList.add("correct");
        feedbackEl.textContent = q.tip ? `答錯。${q.tip}` : "答錯。";
    }

    feedbackEl.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    // 如果是最後一題，顯示「看結果」
    if (current === order.length - 1) {
        nextBtn.textContent = "看結果";
    } else {
        nextBtn.textContent = "下一題";
    }
}

function nextQuestion() {
    current++;
    if (current >= order.length) {
        endGame();
    } else {
        showQuestion();
    }
}

function endGame() {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    scoreEl.textContent = score + " / " + questions.length;

    // 存最佳分數
    const best = Number(localStorage.getItem("muri_best") || 0);
    if (score > best) localStorage.setItem("muri_best", score);
    bestScoreEl.textContent = Math.max(score, best);
    if (score === questions.length) {
        document.getElementById("reward").style.display = "block";
    }
    if (score === questions.length) {
        document.getElementById("reward").style.display = "block";
    }

}
