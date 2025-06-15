
export const messages = {
	god: `Honestly, chance of this reply triggering, which is 0.02%, is better, than drop chances in Throne and liberty.\n\nConsider yourself lucky as hell my man.`,
	copium:  `<:Copium:1345396775434981386>`,
	anthem: (id: string) => `https://www.youtube.com/watch?v=LhO9j0G61Ac \n\nYour national anthem <@${id}>!`,
	throat: 'https://tenor.com/view/mongolian-gif-24685364 \n\n Learn throat singing!',
	muscle: '"Ha ha ha smile is not an official pose, Gunther"\n\n https://www.youtube.com/watch?v=jgb906KsxP4',
	rng: `Holy shit! God of RNG, Man of unconditional luck, kissed by Lady Luck herself`,
	rick: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
	jorgis: `https://www.youtube.com/watch?v=3MmZul0Aj0E`,
	lol: `https://tenor.com/view/laugh-out-loud-laugh-ridiculous-hilarious-lolz-gif-17376550074772904877`,
	pong: (ping: number) => `🏓 Pong! Latency is ${ping}ms.`,
	legendary: `Horniest and the most lustful woman on the planet earth. From Finngolia obviously`,
	praise: `Praise the lord!\n\n https://www.youtube.com/watch?v=Kbj2Zss-5GY`,
	twat: `Fuck off twat, roll elsewhere`,
};

export const superiorMessages = (targetId: string, Users: { Finngolian: string; Daeryox: string }) => [
	`Listen here <@${targetId}>, let me tell you about the **Horde**. Not the ragtag bands you may have heard of — but the unstoppable tide of history. The Horde doesn't ask for permission. It arrives. It conquers. It remains.`,

	`Centuries ago, the world trembled beneath the hooves of Mongolian steeds. Genghis Khan carved an empire not with whispers, but with **absolute will**. Cities burned, kings bent the knee, and maps were redrawn in dust and blood.`,

	`But from that mighty line came a refinement. A rebirth. A crystallization of power into purpose. And from it emerged the **Finngolians** — descendants of fire and ice, minds sharp as sabers, hearts colder than tundra winters.`,

	`You see, <@${targetId}>, the Finngolian legacy isn't just inherited — it's earned. Forged in battle, sealed in silence, written in the blood of challengers. We do not forget. We do not forgive. We endure.`,

	`So next time you speak the name of the Horde, speak it with reverence. Because when the Finngolians ride... the world **doesn't sleep**. It watches. It wonders. And then... it kneels.`,

	`And now, <@${targetId}>... listen well. Before you stands <@${Users.Finngolian}> — **Warlord of the Finngolians**, commander of ice-born legions.\n\nTo him, you owe your loyalty.\n\nBut beyond him stands <@${Users.Daeryox}>, the **Khan of Khanates** — the eternal flame to whom the Finngolians pledge their sacred allegiance. Remember this, and remember your place.`
];

export const khanMessages = [
	"I am the Khan, Khan of Khanates! My shadow stretches across continents, my name whispered with reverence and fear.",
	"My banners do not march — they thunder. I do not conquer lands; I reshape them in my image.",
	"Where others see sand and stone, I see thrones to be claimed and fools to be buried beneath them.",
	"I have outlived kings and outmaneuvered prophets. Destiny does not guide me — it kneels.",
	"I am not heir to an empire. I am the storm that builds it. I am Khan."
];

export const hoarderMessages = (targetId: string) => [
	`Look, <@${targetId}>. People may mock the piles of materials, gear, and obscure crafting components you stash. But they don’t understand: **this isn’t clutter — it’s preparation**.`,

	`In **Throne and Liberty**, today's vendor trash is tomorrow's treasure. The man who hoards is the man who controls the market when scarcity hits. You’re not just playing the game — you’re setting the economy’s pulse.`,

	`They see disorganized bags. You see **options**. When others scramble for one rare drop, you calmly withdraw it from your vault, unbothered, while they offer their soul for a trade.`,

	`It's not hoarding. It's **4D chess**. Where others think one step ahead, you think in patches, events, seasonal reruns. You don’t waste. You **invest**. And the dividends are power.`,

	`So keep stacking, <@${targetId}>. Let them laugh now. Because when the world burns, they’ll come crawling to you — the Hoarder King, the silent architect of survival.`,

	`And when the time comes — when the servers reset, the drop rates nerf, and the clueless cry for help — you will open your vault, whisper nothing… and profit in silence.\n\n<:EvilPepe:1379921183805411348>`
];

export const rollMessages = {
	zero: "You rolled a **0**. That's... impressively bad. You might be cursed.",
	low: (roll: number) => `You rolled a **${roll}**. Hey, at least it's not **0**. Small wins, right?`,
	bad: (roll: number) => `You rolled a **${roll}**. Not the worst, but let’s not pretend this is good.`,
	mid: (roll: number) => `You rolled a **${roll}**. You trying? Feels like you're not even trying.`,
	high: (roll: number) => `You rolled a **${roll}**. Alright alright, we’re creeping up. Getting spicy.`,
	top: (roll: number) => `You rolled a **${roll}**. God damn, this is top-tier energy right here.`,
	legend: `You rolled a **100**. Actual legend. Go buy a lottery ticket before your luck resets.`,
};

export const labels = {
	hello: 'I am THE HORDE',
	raffleName: '🎁 Raffle',
	raffleReason: 'Mega giga hyper raffle',
	join: 'Join',
	leave: 'Leave',
	start: 'Start',
}

export const orangeCats = [
	'https://tenor.com/view/cat-ears-cat-eyes-cat-hiding-hiding-cat-gif-13766270261157565025',
	'https://tenor.com/view/cat-orange-spin-hat-one-brain-cell-gif-2745719316163357325',
	'https://tenor.com/view/silly-gif-2766816926539874354',
	'https://tenor.com/view/cat-cat-turning-head-confused-cat-rizalalthur-orange-cat-behavior-gif-10491959385063137392',
	'https://tenor.com/view/pib-pibtlw-puss-in-boots-the-last-wish-cat-gif-10234399343241214111',
	'https://tenor.com/view/cat-orange-cat-red-cat-ginger-cat-awa-gif-9351538942302156572',
	'https://tenor.com/view/cat-gif-26024760',
	'https://tenor.com/view/orange-cat-bite-orange-cat-orange-cat-attack-gif-10142361798712867466',
	'https://tenor.com/view/orange-cat-cat-angry-cat-oiia-oiia-spinning-cat-gif-985988376073807130',
	'https://tenor.com/view/cat-slap-orange-cat-slap-orange-cat-slap-bum-chonky-cat-orange-chonker-cat-gif-3305480239079074923',
	'https://tenor.com/view/cat-berg-cat-orange-cat-swimming-gif-25177582',
	'https://tenor.com/view/silly-cat-cover-cat-tweaking-cat-car-gif-5479420003081529811',
	'https://tenor.com/view/orange-cat-quick-chomp-orange-cat-bite-cat-bite-orange-cat-chomp-gif-15757875513437344628',
	'https://tenor.com/view/cat-orange-orangecat-sussy-white-gif-16737208375127920744',
	'https://tenor.com/view/whiskers-mmm-hmm-suspicious-sus-gif-11609747178733891907',
];

export const gachiMuchi = [
	'https://www.youtube.com/watch?v=gq3JxkARYRk', // Classic Gachimuchi Remaster
	'https://www.youtube.com/watch?v=BH726JXRok0', // ♂ Leave the Gachimuchi on ♂
	'https://www.youtube.com/watch?v=IKgINa6E2nE', // Legendary Gachimuchi Mix (1 hour)
	'https://www.youtube.com/watch?v=cPtJVokKCnk', // 1-Hour Ecstasy Gachimuchi Music Mix
	'https://www.youtube.com/watch?v=x3HgVoJgLGM', // Memory Reboot (♂ remix)
	'https://www.youtube.com/watch?v=MAS-u8dqOgc', // Sea of Problems (♂ remix)
	'https://www.youtube.com/watch?v=WnZouWGbYDc', // Deadly Verses (♂ remix)
	'https://www.youtube.com/watch?v=WIZbHWzdKkc', // Override 300$ (♂ remix)
	'https://www.youtube.com/watch?v=QAbhrgDf83U', // We Will Rock You (♂ version)
]
