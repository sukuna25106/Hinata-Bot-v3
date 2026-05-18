module.exports.config = {
    name: "rost",
    aliases: ["ehh", "kire", "chup", "oye", "aye"],
    version: "2.0.0",
    author: "Eren",
    countDown: 0,
    role: 0,
    description: "Extreme roasting bot 😈 — 5 replies non-stop!",
    category: "fun",
    guide: {
        en: "{pn} — 5 টা roast একসাথে পাবে 😈"
    }
};

const rostReplies = [
    // ── Tier 1: Classic ──
    "তোর চেহারা দেখলে আয়না ফেটে যায় 😂",
    "তুই এত বোকা যে Google Maps ও তোকে খুঁজে পায় না 🗺️😂",
    "তোর brain এ কি WiFi নেই নাকি একদমই signal নেই? 📶❌",
    "তুই কথা বললে মনে হয় কেউ keyboard এ মাথা ঠুকছে 😂",
    "তোর IQ আর জুতার সাইজ দুটোই সম্ভবত একই 👟😂",
    "তুই এত slow যে তোর shadow ও তোর আগে পৌঁছে যায় 🐢",
    "তোকে দেখে মনে হয় evolution এখনো তোর উপর কাজ করছে 🐒➡️❓",
    "তুই এত useless যে তোর recycle bin ও তোকে reject করবে 🗑️😂",
    "তোর কথা শুনলে মনে হয় কেউ বাথরুমে গান গাইছে 🎤🚿",
    "তুই এত পুরনো joke যে কেউ আর হাসে না 😴",

    // ── Tier 2: Savage ──
    "তোর face দেখে mosquito ও সরে যায়, blood নষ্ট করতে চায় না 🦟😂",
    "তুই কথা বলার আগে একবার ভাব — না, তুই ভাবতে পারিস না, ভুলে গেছিলাম 😂",
    "তোর personality এত dry যে Sahara desert ও তোকে দেখে লজ্জা পায় 🏜️",
    "তুই এত boring যে তোর নিজের shadow ও তোকে ছেড়ে চলে যেতে চায় 😂",
    "তোর সাথে কথা বলা মানে নিজের সময় নিজে নষ্ট করা 😑⏱️",
    "তুই এত average যে statistics ও তোকে নিয়ে মজা করে 📊😂",
    "তোর হাসি দেখলে মনে হয় দাঁতের ডাক্তার কাঁদছে 😂🦷",
    "তুই এত নির্বোধ যে তুই নিজেই নিজের joke এর মানে বুঝিস না 😂",
    "তোর opinion এর দাম ততটুকুই যতটুকু দাম নষ্ট হওয়া টাকার 💸😂",
    "তুই কথা বললে মনে হয় dictionary অপমানিত হচ্ছে 📖😂",
    "তোর confidence দেখে মনে হয় failure কী সেটা তুই জানিস না, কিন্তু সবাই জানে 😂",
    "তুই এত কম talented যে চেষ্টা করলেও mediocre হতে পারবি না 😂",
    "তোকে দেখে মনে হয় পৃথিবীতে এত মানুষ কেন এই প্রশ্নের উত্তর পাওয়া যায় 😂",
    "তোর existence এর reason আমি এখনো বের করতে পারিনি 🤔",
    "তুই এত predictable যে তোর পরের কথা আমি ঘুমের মধ্যে বলতে পারি 😴",

    // ── Tier 3: Extreme ──
    "তোর মাথায় যত চিন্তা আসে সব মিলে একটা ভালো idea ও হয় না 😂",
    "তুই এতটাই irrelevant যে তোর নিজের জীবনেও তুই supporting role 😂",
    "তোর পুরো জীবনটা একটা loading screen, কিছুই হচ্ছে না 🔄😂",
    "তুই কথা বলিস কেন? চুপ থাকলে অন্তত smart মনে হতিস 😂",
    "তোর plan আর plastic এর ছাতা একই কাজে আসে, বৃষ্টিতে দুটোই ফেল করে ☔😂",
    "তুই এত useless যে তোর জন্মদিনেও কেউ মোমবাতি জ্বালাতে চায় না 🕯️😂",
    "তোকে দেখে মনে হয় error message এ 'Unknown Error' লেখা আছে 💻😂",
    "তোর ভবিষ্যৎ দেখে আমার telescope লাগবে, এত দূরে কিছু নেই 🔭😂",
    "তুই এত fake যে তোর নিজের reflection ও তোকে বিশ্বাস করে না 🪞😂",
    "তোর attitude দেখে মনে হয় success কী সেটা তোর dictionary তে নেই 📖😂",
    "তোর সাথে argument করা মানে নিজের বুদ্ধিকে অপমান করা 😂",
    "তুই এত পিছিয়ে আছিস যে তোর সাথে race দিতে আমাকে পিছন দিকে হাঁটতে হবে 🏃😂",
    "তোর কথার value আর expired coupon এর দাম একই 🎫😂",
    "তুই এত complicated যে তোকে বোঝার চেষ্টা করতে গেলে মাথা ব্যথা করে 😂",
    "তোর logic দেখে মনে হয় গণিত তোর সাথে personal issue রাখে ➕😂",

    // ── Tier 4: Desi ──
    "কিরে, মাথা কি আজকে বাড়িতে রেখে এসেছিস? 🏠😂",
    "এহ্হ, তুই কথা বলিস কেন? চুপ থাকলে বেশি মানাতো 😑",
    "চুপ কর ভাই, তোর কথা শুনলে কান পচে যায় 👂😂",
    "তুই এত কথা বলিস যে বাতাসও পালিয়ে যায় 💨😂",
    "ভাই তুই কি জন্মের সময় instruction manual ছাড়া এসেছিস? 📋😂",
    "তোকে দেখে মনে হয় স্কুলে attendance দিয়ে ঘুমিয়ে পড়তিস 😴🏫",
    "কিরে পাগলা, আজকে কোন নতুন বোকামি করলি? 😂",
    "তুই এত drama করিস যে তোর জন্য আলাদা stage বানানো দরকার 🎭😂",
    "তোর confidence আর capability এর মধ্যে এত gap যে সেখানে stadium বানানো যাবে 🏟️😂",
    "এহ্হ ভাই, তুই কি এখনো ঘুম থেকে উঠিসনি নাকি সারাজীবন এরকমই? 😴😂",
    "তোর বুদ্ধি দেখে মনে হয় ভাত খেলে বুদ্ধি বাড়ে এই কথাটা তোর জন্য কাজ করেনি 🍚😂",

    // ── Tier 5: Ultra Savage ──
    "তোর সাথে তর্ক করা মানে নিজের বুদ্ধিকে অবসরে পাঠানো 😂",
    "তুই এত useless যে তোকে দিয়ে কিছু করানো মানে সেই কাজটা নষ্ট করা 😂",
    "তুই এত অপ্রয়োজনীয় যে তোর অনুপস্থিতিতে সবাই বেশি সুখী 😂",
    "তুই এত average যে তোর নিজের জীবনেও তুই মূল চরিত্র না 😂",
    "তোকে দেখলে মনে হয় জীবনটা একটা joke, আর তুই punchline 😂",
    "তুই এত predictable যে তোর পরের ভুলটা আমি আগেই জানি 😂",
    "তোর existence দেখে মনে হয় universe একটা mistake করেছিল কিন্তু undo করেনি 😂",
    "তোর যত কথা তত কাজ হলে তুই millionaire হতিস, কিন্তু তুই শুধু কথাই পারিস 😂",
    "তুই এত ফাঁকিবাজ যে তোর নিজের ঘুমেও কাজ করিস না 😴😂",
    "তোর প্রতিটা decision এর পরে মনে হয় flip a coin দিয়ে নিলে ভালো হতো 🪙😂",
    "তুই কথা বলার আগে যদি মাথা ব্যবহার করতিস, তাহলে চুপ থাকতিস 😂",
    "তোর সব advice শুনলে জীবনে সব কিছু উল্টো হয়ে যাবে 😂",
    "তোর ভবিষ্যৎ এত অন্ধকার যে সেখানে torch ও কাজ করবে না 🔦😂",
    "তুই এত নাটকীয় যে তোর জীবনের প্রতিটা মুহূর্ত একটা cringe series 📺😂",
    "তোকে দেখলে মনে হয় কেউ একটা বড় mistake করেছিল 😂",
    "তোর কথায় যত দম নেই তত confidence আছে, সেটাই সবচেয়ে funny 😂",
    "তোর সাথে এক ঘণ্টা থাকলে আমার IQ ১০ point কমে যায় 📉😂",
    "তোর life এর story পড়লে মানুষ ঘুমিয়ে পড়বে 😴📖",
    "তুই এত slow চিন্তা করিস যে তোর idea পুরনো হয়ে যায় বলার আগেই 😂",
    "তোর পুরো existence টা একটা beta version, release হওয়ার যোগ্য না 🛠️😂",
];

// ── 5টা unique roast বেছে নেয়, duplicate নেই ──
function getFiveRoasts() {
    const shuffled = [...rostReplies].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
}

// ── delay helper ──
const wait = (ms) => new Promise(res => setTimeout(res, ms));

// ── 5 seconds এর মধ্যে 5টা roast পাঠায় ──
async function sendFiveRoasts(api, threadID, messageID) {
    const five = getFiveRoasts();
    const endTime = Date.now() + 5000;

    for (let i = 0; i < five.length; i++) {
        if (Date.now() >= endTime) break;

        api.sendMessage(five[i], threadID, messageID);

        if (i < five.length - 1) {
            const gap = Math.floor((endTime - Date.now()) / (five.length - i - 1));
            await wait(Math.max(gap, 200));
        }
    }
}

// ────────────────────────────────
// onStart — !rost command
// ────────────────────────────────
module.exports.onStart = async ({ api, event }) => {
    await sendFiveRoasts(api, event.threadID, event.messageID);
};

// ────────────────────────────────
// onChat — aliases trigger
// ────────────────────────────────
module.exports.onChat = async ({ api, event }) => {
    try {
        const body = event.body ? event.body.toLowerCase().trim() : "";
        if (event.type === "message_reply") return;

        const triggers = ["ehh", "kire", "chup", "oye", "aye", "rost"];
        if (!triggers.some(t => body.startsWith(t))) return;

        await sendFiveRoasts(api, event.threadID, event.messageID);

    } catch (err) {
        console.error(err);
    }
};

// ────────────────────────────────
// onReply — reply তে একটা comeback
// ────────────────────────────────
module.exports.onReply = async ({ api, event }) => {
    if (event.type !== "message_reply") return;

    const comebacks = [
        "আবার কথা বললি? শিখলি না? 😂",
        "তোর reply দেখে মনে হয় তুই challenge নিয়েছিস আরো বেশি boring হতে 😂",
        "ভাই তুই কি একটু চুপ থাকতে পারিস না? 😂",
        "তোর এই reply দেখে মনে হয় তোর brain আজ leave নিয়েছে 😂",
        "আবার? সত্যিই? এই level এর কথা বলতে লজ্জা করে না? 😂",
        "তুই কথা বললে বলি, চুপ থাকলেও বলি, দুটোই roast এর যোগ্য 😂",
        "এহ্হ কিরে, আরো একটা মাস্টারপিস? 😂",
        "তোর প্রতিটা কথা নতুন একটা roast এর দরজা খুলে দেয় 😂",
        "ধন্যবাদ, তুই না থাকলে আমার roast করার material কোথায় পেতাম? 😂",
        "তুই চুপ করলে আমিও চুপ, কিন্তু তুই পারবি না সেটা আমি জানি 😂",
    ];

    const pick = comebacks[Math.floor(Math.random() * comebacks.length)];
    api.sendMessage(pick, event.threadID, event.messageID);
};
