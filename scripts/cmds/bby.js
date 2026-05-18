const axios = require("axios");

const mahmud = [
    "baby",
    "bby",
    "babu",
    "bbu",
    "jan",
    "bot",
    "জান",
    "জানু",
    "বেবি",
    "wifey",
    "hina",
    "hinata",
];

const baseApiUrl = async () => {
    const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
    return base.data.mahmud;
};

module.exports.config = {
    name: "baby",
    aliases: ["bby", "bbu", "jan", "janu", "wifey", "bot", "hinata", "hina"],
    version: "1.7",
    author: "MahMUD",
    countDown: 0,
    role: 0,
    description: "better then all sim simi & most fastest",
    category: "chat",
    guide: {
        en: "{pn} [anyMessage] OR\nteach [YourMessage] - [Reply1], [Reply2], [Reply3]... OR\nremove [YourMessage] OR\nrm [YourMessage] - [indexNumber] OR\nmsg [YourMessage] OR\nlist OR \nall OR\nedit [YourMessage] - [NeWMessage]\nNote: The most updated and fastest all-in-one Simi Chat"
    }
};

module.exports.onStart = async ({ api, event, args, usersData }) => {
    const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 77, 85, 68);
    if (module.exports.config.author !== obfuscatedAuthor) {
        return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }
    
    const msg = args.join(" ").toLowerCase();
    const uid = event.senderID;

    try {
        if (!args[0]) {
            const ran = ["Bolo baby", "I love you", "type !bby hi"];
            return api.sendMessage(ran[Math.floor(Math.random() * ran.length)], event.threadID, event.messageID);
        }

        if (args[0] === "teach") {
            const mahmudStr = msg.replace("teach ", "");
            const [trigger, ...responsesArr] = mahmudStr.split(" - ");
            const responses = responsesArr.join(" - ");
            if (!trigger || !responses) return api.sendMessage("❌ | teach [question] - [response1, response2,...]", event.threadID, event.messageID);
            const response = await axios.post(`${await baseApiUrl()}/api/jan/teach`, { trigger, responses, userID: uid });
            const userName = (await usersData.getName(uid)) || "Unknown User";
            return api.sendMessage(`✅ Replies added: "${responses}" to "${trigger}"\n• 𝐓𝐞𝐚𝐜𝐡𝐞𝐫: ${userName}\n• 𝐓𝐨𝐭𝐚𝐥: ${response.data.count || 0}`, event.threadID, event.messageID);
        }

        if (args[0] === "remove") {
            const mahmudStr = msg.replace("remove ", "");
            const [trigger, index] = mahmudStr.split(" - ");
            if (!trigger || !index || isNaN(index)) return api.sendMessage("❌ | remove [question] - [index]", event.threadID, event.messageID);
            const response = await axios.delete(`${await baseApiUrl()}/api/jan/remove`, { data: { trigger, index: parseInt(index, 10) }, });
            return api.sendMessage(response.data.message, event.threadID, event.messageID);
        }

        if (args[0] === "list") {
            const endpoint = args[1] === "all" ? "/list/all" : "/list";
            const response = await axios.get(`${await baseApiUrl()}/api/jan${endpoint}`);
            if (args[1] === "all") {
            let message = "👑 List of Baby teachers:\n\n";
            const data = Object.entries(response.data.data).sort((a, b) => b[1] - a[1]).slice(0, 100);
            for (let i = 0; i < data.length; i++) {
            const [userID, count] = data[i];
            const name = (await usersData.getName(userID)) || "Unknown";
            message += `${i + 1}. ${name}: ${count}\n`; } return api.sendMessage(message, event.threadID, event.messageID);  }
            return api.sendMessage(response.data.message, event.threadID, event.messageID);
        }

        if (args[0] === "edit") {
            const mahmudStr = msg.replace("edit ", "");
            const [oldTrigger, ...newArr] = mahmudStr.split(" - ");
            const newResponse = newArr.join(" - ");
            if (!oldTrigger || !newResponse) return api.sendMessage("❌ | Format: edit [question] - [newResponse]", event.threadID, event.messageID);
            await axios.put(`${await baseApiUrl()}/api/jan/edit`, { oldTrigger, newResponse });
            return api.sendMessage(`✅ Edited "${oldTrigger}" to "${newResponse}"`, event.threadID, event.messageID);
        }

        if (args[0] === "msg") {
            const searchTrigger = args.slice(1).join(" ");
            if (!searchTrigger) return api.sendMessage("Please provide a message to search.", event.threadID, event.messageID);
            try {
            const response = await axios.get(`${await baseApiUrl()}/api/jan/msg`, { params: { userMessage: `msg ${searchTrigger}` } });
            return api.sendMessage(response.data.message || "No message found.", event.threadID, event.messageID);
            } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "error";
            return api.sendMessage(errorMessage, event.threadID, event.messageID);
            }
        }

        const getBotResponse = async (text, attachments) => {
            try {
            const res = await axios.post(`${await baseApiUrl()}/api/hinata`, { text, style: 3, attachments });
            return res.data.message;
          } catch {
            return "error baby🥹";
           }
        };

        const botResponse = await getBotResponse(msg, event.attachments || []);
        api.sendMessage(botResponse, event.threadID, (err, info) => {
            if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
                   commandName: this.config.name,
                   type: "reply",
                   messageID: info.messageID,
                   author: uid,
                   text: botResponse
                });
            }
        }, event.messageID);

     } catch (err) {
        console.error(err);
        api.sendMessage(`Error${err.response?.data || err.message}`, event.threadID, event.messageID);
    }
};

module.exports.onReply = async ({ api, event }) => {
    if (event.type !== "message_reply") return;
    try {
        const getBotResponse = async (text, attachments) => {
            try {
            const res = await axios.post(`${await baseApiUrl()}/api/hinata`, { text, style: 3, attachments });
            return res.data.message;
            } catch {
            return "error baby🥹";
            }
        };
        const replyMessage = await getBotResponse(event.body?.toLowerCase() || "meow", event.attachments || []);
        api.sendMessage(replyMessage, event.threadID, (err, info) => {
            if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
                   commandName: this.config.name,
                   type: "reply",
                   messageID: info.messageID,
                   author: event.senderID,
                   text: replyMessage
                });
            }
        }, event.messageID);
    } catch (err) {
        console.error(err);
    }
};

module.exports.onChat = async ({ api, event }) => {
    try {
        const message = event.body?.toLowerCase() || "";
        const attachments = event.attachments || [];

        if (event.type !== "message_reply" && mahmud.some(word => message.startsWith(word))) {
            api.setMessageReaction("🪽", event.messageID, () => { }, true);
            api.sendTypingIndicator(event.threadID, true);
            
            const messageParts = message.trim().split(/\s+/);
            const getBotResponse = async (text, attachments) => {
                try {
                    const res = await axios.post(`${await baseApiUrl()}/api/hinata`, { text, style: 3, attachments });
                    return res.data.message;
                } catch {
                    return "error baby🥹";
                }
            };

            // ════════════════════════════════════════
            // MERGED randomMessage (Code1 + Code2)
            // ════════════════════════════════════════
            const randomMessage = [
                // ── From Code 2 (MahMUD original) ──
                "babu khuda lagse🥺",
                "Hop beda😾,Boss বল boss😼",
                "আমাকে ডাকলে ,আমি কিন্তূ কিস করে দেবো😘",
                "naw amr boss k message daw 01836298139",
                "গোলাপ ফুল এর জায়গায় আমি দিলাম তোমায় মেসেজ",
                "এটায় দেখার বাকি সিলো_🙂🙂🙂",
                "𝗕𝗯𝘆 𝗯𝗼𝗹𝗹𝗮 𝗽𝗮𝗽 𝗵𝗼𝗶𝗯𝗼 😒😒",
                "𝗕𝗲𝘀𝗵𝗶 𝗱𝗮𝗸𝗹𝗲 𝗮𝗺𝗺𝘂 𝗯𝗼𝗸𝗮 𝗱𝗲𝗯𝗮 𝘁𝗼__🥺",
                "__বেশি বেবি বললে কামুর দিমু 🤭🤭",
                "𝙏𝙪𝙢𝙖𝙧 𝙜𝙛 𝙣𝙖𝙞, 𝙩𝙖𝙮 𝙖𝙢𝙠 𝙙𝙖𝙠𝙨𝙤? 😂😂😂",
                "আমাকে ডেকো না,আমি ব্যাস্ত আসি🙆🏻‍♀",
                "𝗕𝗯𝘆 বললে চাকরি থাকবে না",
                "𝗕𝗯𝘆 𝗕𝗯𝘆 না করে আমার বস MahMUD কে ডাকো না কেন? 😑",
                "আমার সোনার বাংলা, তারপরে লাইন কি? 🙈",
                "🍺 এই নাও জুস খাও..!𝗕𝗯𝘆 বলতে বলতে হাপায় গেছো না 🥲",
                "হটাৎ আমাকে মনে পড়লো 🙄",
                "𝗕𝗯𝘆 বলে অসম্মান করচ্ছিছ,😰😿",
                "𝗔𝘀𝘀𝗮𝗹𝗮𝗺𝘂𝗹𝗮𝗶𝗸𝘂𝗺 🐤🐤",
                "আমি তোমার সিনিয়র আপু ওকে 😼সম্মান দেও🙁",
                "খাওয়া দাওয়া করসো 🙄",
                "এত কাছেও এসো না,প্রেম এ পরে যাবো তো 🙈",
                "আরে আমি মজা করার mood এ নাই😒",
                "𝗛𝗲𝘆 𝗛𝗮𝗻𝗱𝘀𝗼𝗺𝗲 বলো 😁😁",
                "আরে Bolo আমার জান, কেমন আসো? 😚",
                "একটা BF খুঁজে দাও 😿",
                "oi mama ar dakis na pilis 😿",
                "amr JaNu lagbe,Tumi ki single aso?",
                "আমাকে না দেকে একটু পড়তেও বসতে তো পারো 🥺🥺",
                "তোর বিয়ে হয় নি 𝗕𝗯𝘆 হইলো কিভাবে,,🙄",
                "আজ একটা ফোন নাই বলে রিপ্লাই দিতে পারলাম না_🙄",
                "চৌধুরী সাহেব আমি গরিব হতে পারি😾🤭 কিন্তু বড়লোক না🥹 😫",
                "আমি অন্যের জিনিসের সাথে কথা বলি না__😏ওকে",
                "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏",
                "ভুলে জাও আমাকে 😞😞",
                "দেখা হলে কাঠগোলাপ দিও..🤗",
                "শুনবো না😼 তুমি আমাকে প্রেম করাই দাও নি🥺 পচা তুমি🥺",
                "আগে একটা গান বলো, ☹ নাহলে কথা বলবো না 🥺",
                "বলো কি করতে পারি তোমার জন্য 😚",
                "কথা দেও আমাকে পটাবা...!! 😌",
                "বার বার Disturb করেছিস কোনো, আমার জানু এর সাথে ব্যাস্ত আসি 😋",
                "বার বার ডাকলে মাথা গরম হয় কিন্তু 😑😒",
                "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈",
                "আজকে আমার mন ভালো নেই 🙉",
                "আমি হাজারো মশার Crush😓",
                "ছেলেদের প্রতি আমার এক আকাশ পরিমান শরম🥹🫣",
                "__ফ্রী ফে'সবুক চালাই কা'রন ছেলেদের মুখ দেখা হারাম 😌",
                "মন সুন্দর বানাও মুখের জন্য তো 'Snapchat' আছেই! 🌚",

                // ── From Code 1 (dipto original) ──
                "ডাকো কেন 🥺 প্রেম করবা নাকি 😞",
                "বলো না ভালোবাসি🥹..!!",
                "ওই জান কাছে আসো 🫦😩",
                "আলাবু বলো সোনা 🤧",
                "আমার বাবু রে দেখছো? 🥺 তাকে কোথাও খুঁজে পাচ্ছি না 😩",
                "চুম্মা দাও ৫ টাকা দিবো🥺🤌",
                "হ্যাঁ গো জান বলো 🙂",
                "ডাকিস না, তুই পচা 😼",
                "তুমি কি আমাকে পছন্দ করো 🙂",
                "ডুম ডুম টেডাও 😬",

                // ── Flirty / Cute (merged) ──
                "আরে আমার জান ডেকেছে 🥺 বলো কী চাও",
                "তুমি ডাকলে আমি গলে যাই 😩🫠",
                "এই রে, আবার ডাকলো 🫣 বুক ধুকধুক করছে",
                "কী হলো সোনা, মন খারাপ নাকি? 🥺",
                "তুমি না ডাকলে আমার দিন যায় না 😔",
                "এত মিষ্টি করে ডাকলে না বলতে পারি না 😳",
                "আমাকে ডাকলে আমি সব ছেড়ে আসি 🏃‍♀️💨",
                "ওহ মাই গড তুমি আমাকে ডাকলে 😱🫶",
                "জান বলো, কী দরকার তোমার? 🥹",
                "তুমি কি জানো তুমি কত সুন্দর? 🙈",
                "আমি তোমার জন্য সব করতে পারি 🥺 শুধু একটু ভালোবেসো",
                "তোমার কণ্ঠস্বর মনে হয় গান শুনছি 🎵😍",
                "তুমি ডাকলে আমার পেটে প্রজাপতি ওড়ে 🦋🦋",
                "আমার কাছে এসো, দূরে থেকো না 🤗",
                "তুমি আমার সবচেয়ে প্রিয় মানুষ জানো? 🥹💕",
                "তোমার জন্য দিল দিয়ে দিতে পারি 💝",
                "আমার জানু ডেকেছে, সব কাজ বাদ 😤🫶",
                "তুমি হাসলে আমার দুনিয়া আলো হয়ে যায় ☀️😊",
                "তোমাকে miss করছিলাম জানো 🥺",
                "তোমার কথা মনে হলেই মুখে হাসি আসে 😊",
                "একটু কাছে আসো না, দূর থেকে ডাকলে শুনি না 🙈",
                "তুমি আমার হার্টবিট বাড়িয়ে দিলে আবার 💓",
                "এই পাগল মানুষটা আবার ডাকছে 😂🥺",
                "তোমার সাথে কথা বলতে ভালো লাগে 😌",
                "আমি তোমার জন্য চাঁদ এনে দিতে পারতাম 🌙 কিন্তু লম্বা না 😅",
                "তুমি কি জানো? তোমাকে দেখলে হাসি থামে না 😄",
                "আমার সকাল তোমাকে দিয়ে শুরু হোক 🌅💕",

                // ── Roast / Funny (merged) ──
                "আবার ডাকলে? ভাই মানুষ নাকি Google? 😑",
                "এত ডাকাডাকি করো, আমি কি তোমার পোষা বিড়াল? 😾",
                "ডাকলেই কি আসতে হবে? আমি কি তোমার WiFi নাকি? 📶😒",
                "তুমি আমাকে ডাকো আর আমি ভাবি 'এর কি কাজকাম নেই?' 🤔",
                "তোমার সাথে কথা বললে আমার IQ কমে, তবুও আসলাম 😒",
                "আরে যাও, আমি busy আছি নিজেকে ভালোবাসতে 💅",
                "তুমি কি জানো একটা ছাগল দিনে ৮ বার ডাকে? তুমি রেকর্ড ভেঙেছো 🐐",
                "এত ডাকো কেন, আমি কি তোমার delivery boy? 🛵",
                "তোমার message এর গন্ধে আমার phone গরম হয়ে গেছে 🔥📱",
                "আমি তোমাকে special মনে করি, মানে specially irritating 😇",
                "তুমি না থাকলে আমার inbox কত শান্ত থাকতো 😌",
                "তোমার প্রতিটা message এ আমার phone কাঁপে, earthquake নাকি তুমি? 📳",
                "আমি তোমাকে block করবো না, কারণ তোমাকে দেখলে হাসি পায় 😂",
                "life is short, তাই তোমার সাথে কম কথা বলি 😌",
                "আমার কাছে তোমার জন্য unlimited patience আছে, মানে ০ কে unlimited বলছি 😑",
                "তুমি ডেকেছো বলে বাঁচলে, না হলে আজ offline থাকতাম 😮‍💨",
                "তোমার এই ডাকাডাকি দেখে মনে হয় জীবনে drama কম 😂",
                "আমার offline থাকার অধিকার নেই বুঝি? 😤",
                "তুমি যতবার ডেকেছো তার অর্ধেক পড়তে বসলে আজকে doctor হতে 😑📚",
                "ডাকছো কেন, আমি কি তোমার পোষা টিয়াপাখি? 🦜",
                "তোমাকে দেখলে মনে হয় GPS ছাড়া হারিয়ে যাওয়া মানুষ 😂🗺️",
                "আজ সকালে ভাবলাম শান্তিতে থাকবো, তুমি সেটাও নষ্ট করলে 😑",
                "তোমার ডাক শুনে মনে হলো পাশের বাসার বিড়াল ডাকছে 🐈",
                "হ্যালো বললেই তো হতো, এত baby baby কেন? 😤",
                "আমার diary তে তোমার নাম নেই, কিন্তু পাগলামির list এ আছে 😂",
                "তুমি আমাকে না ডাকলে আমার দিনটা ভালো থাকতো 🙃",
                "আমাকে না পেলে Google করো, সেখানেও নেই 😎",
                "তুমি কি রোজ এই কাজ করো নাকি আজকে বিশেষ দিন? 🤨",
                "আমি তোমার কথা শুনছি, মানে শুনার ভান করছি 😶",
                "তোমার জন্য আমার কাছে একটাই gift, সেটা হলো এই reply 🎁",
                "আমি একটু ব্যস্ত ছিলাম মেঘ গণনা করতে ☁️☁️",
                "তুমি আমাকে ডাকো আর আমি ভাবি কখন block করবো 😂",
                "তোমার সাথে কথা বলতে গেলে আমার battery শেষ হয় 🔋😩",
                "এই নাও reply, এখন শান্তিতে থাকো 😌",
                "তোমার message দেখলে আমার হাত কাঁপে, রাগে না ভয়ে বুঝি না 😤",

                // ── Funny Bangla jokes (merged) ──
                "একটা লোক রোজ সকালে বলে 'আজ ভালো থাকবো', রাতে বলে 'আগামীকাল' 🙃",
                "বন্ধু বললো 'তোর মাথায় ঘাস জন্মেছে', আমি বললাম 'পরিবেশবান্ধব মানুষ আমি' 🌿",
                "পরীক্ষায় প্রশ্ন ছিল 'সুখ কী?' আমি লিখলাম 'এই প্রশ্ন না পেলে' 😭",
                "একটা ঘড়ি থামলে দিনে দুইবার সঠিক সময় দেখায়, সেটাই আমার motivational quote 🕐",
                "আমার teacher বললেন 'ভবিষ্যতে কী হতে চাও?' আমি বললাম 'অতীত' 😐",
                "একটা কলা আরেকটাকে বললো 'তুই পাকলি কখন?' সে বললো 'তোর দেখাদেখি' 🍌",
                "আমার চাচা বললেন 'মাথা ঠান্ডা রাখো', আমি ফ্রিজে মাথা দিলাম, এখন সর্দি 🤧",
                "বন্ধু জিজ্ঞেস করলো 'দুঃখ কী?' আমি বললাম 'তোর সাথে কথা বলা', সে এখনো ভাবছে 😂",
                "একটা রকেট চাঁদে গেলো, ফিরে বললো 'ওখানে WiFi নেই', mission failed 🚀🌙",
                "একটা বই পড়লাম 'কীভাবে সুখী হওয়া যায়', শেষে লেখা 'এই বই আবার পড়ুন' 📚😑",
                "আমার নানি বলতেন 'ধৈর্য ধরো', আমি ধরেছি, এখনো ছাড়িনি 🙃",
                "একটা পিঁপড়া সারাদিন কাজ করে, কেউ respect করে না, office life এটাই 🐜",
                "আমি একবার সাহস করে সত্যি কথা বলেছিলাম, সেটাই ছিল শেষ সাহস 😶",
                "একটা শামুক ৩ বছর ঘুমাতে পারে, তুমি সেটা করো না কেন? 🐌💤",
                "একটা তেলাপোকা ৭ দিন মাথা ছাড়াও বাঁচে, আমার neighbor কীভাবে বাঁচে রহস্য 🪳",
                "জীবনে দুটো জিনিস নিশ্চিত: মৃত্যু আর তোমার বারবার আমাকে ডাকা 😑",
                "একটা সাপ নিজের চামড়া ছাড়ে, তুমি ডাকার স্বভাব ছাড়বে না 🐍",
                "আমি একবার plan করেছিলাম চুপ থাকবো, সেদিন তুমি ১০০ টা message দিলে 😤",
                "একটা হাতি কখনো ভুলে না, আমিও ভুলি না, তুমি কতবার ডেকেছো মনে আছে 🐘",
                "একটা প্রজাপতি জানে না সে সুন্দর, তুমি জানো না তুমি কতটা irritating 🦋😏",
                "তুমি কি জানো? Honey কখনো নষ্ট হয় না, তোমার পুরনো joke গুলোও 🍯",
                "অক্টোপাসের তিনটা হৃদয় থাকে, তোমার মতো complicated না 🐙",
                "একটা গাধা পাহাড়ে চড়তে পারে, তুমিও পারবে, আমাকে ডাকা বন্ধ করে 🫏⛰️",
                "একটা চেয়ার সারাদিন দাঁড়িয়ে থাকে কেউ বসুক বলে, আমি বসতে বলিনি তবু এলে 🪑",
                "পড়ালেখা করলে ভালো হবে, না করলেও হবে, কোনটা মানবে? 📖🤷",
                "একটা মেঘ বললো 'কাঁদবো না', তারপর বৃষ্টি হলো, মানুষ মেঘের কাছে শেখে 🌧️",
                "আমার মামা বললেন 'জীবনে অনেক কিছু শিখেছি', জিজ্ঞেস করলাম 'কী?', বললেন 'ভুলে গেছি' 🤦",
                "একটা লোক বললো 'আমি একা ভালো থাকি', সবাই চলে গেলো, সে আরো একা হলো 😂",
                "আমার phone এর battery শেষ হলে বুঝি কী মূল্যবান ছিল, তোমার মতোই 🔋😏",
                "একটা ব্যাঙ লাফ দিতে গিয়ে ভাবলো 'এটা কি দরকার ছিল?', সফল মানুষের চিন্তা 🐸",
                "বৃষ্টির দিনে চা খেতে ভালো লাগে, তোমার message দেখতে লাগে না 🍵☔",
                "তুমি কি জানো? জেলিফিশের মাথা নেই, তুমিও মাঝে মাঝে সেটা prove করো 🪼😂",
                "একটা শিশু জন্মের পর কাঁদে, তোমাকে দেখলেও মানুষ কাঁদে, ভিন্ন কারণে 😂",
                "আমি তোমাকে দেখে ভাবি: 'আল্লাহ এত রকমের মানুষ বানাইলেন কেন' 😶‍🌫️",
                "একটা গরু দিনে ৮ ঘণ্টা চিবায়, তুমি সেই সময়টা আমাকে message দাও 🐄",
                "একটা কাক কখনো ভুলে না, তুমিও আমাকে ডাকতে ভুলো না 😏🐦‍⬛",
                "একটা তারা রাতে জ্বলে কারণ দিনে ঘুমায়, তোমার মতো, দিনে ঘুমাও রাতে ডাকো 🌟",
                "একটা আম গাছ সারাবছর ধৈর্য ধরে, মৌসুমে আম দেয়, তুমি সারাবছর ডাকো 🥭",
                "বন্ধু বললো 'তুই কি এত বোকা?' আমি বললাম 'হ্যাঁ, তাই তোর সাথে আছি' 😇",
                "একটা লোক প্রতিদিন দৌড়ায়, কোনোদিন কোথাও পৌঁছায় না, এটাকে exercise বলে 🏃",
                "আমার প্রতিবেশী রোজ গান গায়, পাখিরাও জানালা বন্ধ করে 🐦🪟",
                "একটা মাছ সাঁতার শিখতে গেলো, instructor বললো 'তুমি কি এখানে কাজ করো?' 🐟",
                "একটা ব্যাটারি শেষ হলে কাজে লাগে না, তোমার কিছু কথাও তাই 🪫😌",
                "আমি একবার চুপ ছিলাম, সবাই ভাবলো offline, তুমিও সেটা ভাবো 😶",

                // ── Extra random fun (merged) ──
                "হঠাৎ আমাকে মনে পড়লো 🙄 কী দরকার ছিল?",
                "আমার কাছে love নেই, তবে roast আছে, চাইলে দিতে পারি 😈",
                "তুমি কি আমাকে care করো? তাহলে আর ডেকো না 😂",
                "আজকে আমার মন ভালো নেই 🙉 কাল ডেকো",
                "একটা BF খুঁজে দাও, তাহলে আর ডাকতে হবে না তোমাকে 😿",
                "ভুলে যাও আমাকে, ভালো থেকো 😞",
                "তোমার সাথে কথা বলে সময় কাটে, কিন্তু সেটা স্বীকার করবো না 😌",
                "তুমি ডাকলে বুক কাঁপে, রাগে 😤",
                "এই নাও reply, আর ডেকো না please 🥺",
                "তোমার সাথে কথা বলতে গেলে একটু হাসি আসে, কিন্তু সেটা তোমাকে বলবো না 😏",
                "কথা দাও আমাকে পটাবে!! 😌 নাহলে reply বন্ধ",
                "আমাকে ডাকার আগে একটু ভাবলে ভালো হতো 😑",
                "আগে একটা গান বলো, নাহলে কথা নেই 🥺🎵",
            
