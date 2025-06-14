import dotenv from 'dotenv';
dotenv.config();

import {
	ActionRowBuilder,
	ButtonBuilder,
	Client,
	GatewayIntentBits,
	ButtonStyle,
	ChannelType,
	Interaction,
	Events,
	EmbedBuilder, TextChannel, Snowflake
} from 'discord.js';
import {
	gachiMuchi,
	hoarderMessages,
	khanMessages,
	labels,
	messages,
	orangeCats,
	rollMessages,
	superiorMessages
} from "./messages";
import {commandChannel, eventChannel, permittedAdmins, permittedChannels, Users} from "./permissions";
import {getRandomContent, includesCommand, startsWithCommand} from "./functions";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
	],
});

client.once(Events.ClientReady, () => {
	console.log(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async (message) => {
	if (message.author.bot) return;
	if (!permittedChannels.includes(message.channel.id)) return;
	if (!message.guild) {
		console.error('This command must be used in a server.');
		return;
	}

	if (startsWithCommand(message.content, '!') && message.channel.id === commandChannel) {
		if (
			includesCommand(message.content, 'raffle') && permittedAdmins.includes(message.author.id as string)
		) {
			const targetChannel = await message.guild.channels.fetch('1348383357083320411' as Snowflake) as TextChannel;
			const args = message.content.split(' ');
			const winnerCount = parseInt(args[1], 10) || 1;
			const excludedUsers = args.slice(2).map(arg => arg.replace('[', '').replace(']', '').replace(',', '').replace(/[<@!>]/g, ''));

			if (isNaN(winnerCount) || winnerCount <= 0) {
				await message.reply(
					'You idiot, use it like this: `!raffle <number of raffles>, like !raffle 5 / !raffle 5 [excludedid, excludedId]`'
				);
				console.log('Raffle command used incorrectly')
				return;
			}

			const raffleEmbed = new EmbedBuilder()
				.setTitle('LADIES AND GENTLEMEN! WELCOME TO THIS EVENINGS MAIN EVENT!')
				.setDescription(
					`We're giving away 500 lucent per winner!\n\n\n` +
					`**Winners:** ${winnerCount}\n\n\n\n` +
					`**Participants:**\nNone\n\n\n\n` +
					`**Excluded:**\n${excludedUsers.length > 0 ? excludedUsers.map(id => `<@${id}>`).join(', ') : 'None'}`
				)
				.setColor(0xffcc00);

			const joinButton = new ButtonBuilder()
				.setCustomId('join')
				.setLabel(labels.join)
				.setStyle(ButtonStyle.Success);

			const leaveButton = new ButtonBuilder()
				.setCustomId('leave')
				.setLabel(labels.leave)
				.setStyle(ButtonStyle.Danger);

			const startButton = new ButtonBuilder()
				.setCustomId('start')
				.setLabel(labels.start)
				.setStyle(ButtonStyle.Primary);

			const row = new ActionRowBuilder<ButtonBuilder>().addComponents(joinButton, leaveButton, startButton);

			const thread = await (targetChannel as TextChannel).threads.create({
				name: labels.raffleName + ' #' + Math.floor(Math.random() * 999 + 1),
				type: ChannelType.PublicThread,
			});

			const raffleMessage = await thread.send({
				embeds: [raffleEmbed],
				components: [row],
			});
		}
		if (includesCommand(message.content, 'ping') && (message.author.id === Users.Daeryox || message.author.id === Users.Finngolian)) {
			const ping = Math.round(message.client.ws.ping);
			await message.reply(messages.pong(ping));
			return;
		}
	} else {
		if (startsWithCommand(message.content, '!') && includesCommand(message.content, 'roll')) {
			const coinFlip = Math.random() < 0.5;

			if (coinFlip) {
				const roll = Math.floor(Math.random() * 101);

				let smugMessage = '';

				if (roll === 0) {
					smugMessage = rollMessages.zero;
				} else if (roll <= 10) {
					smugMessage = rollMessages.low(roll);
				} else if (roll <= 30) {
					smugMessage = rollMessages.bad(roll);
				} else if (roll <= 60) {
					smugMessage = rollMessages.mid(roll);
				} else if (roll <= 90) {
					smugMessage = rollMessages.high(roll);
				} else if (roll <= 99) {
					smugMessage = rollMessages.top(roll);
				} else {
					smugMessage = rollMessages.legend;
				}

				await message.reply(smugMessage);
			} else {
				await message.reply(messages.twat);
			}
			return;
		}
		if (message.author.id === Users.Finngolian) {
			if (startsWithCommand(message.content, '!')) {
				const parts = message.content.trim().split(' ');
				const command = parts[0].toLowerCase();
				const targetUserId = parts[1]?.replace(/[<@!>]/g, '');

				if (!targetUserId) {
					await message.channel.send('Learn to use your own commands fucking idiot');
					return;
				}

				if (includesCommand(command, 'horde')) {
					for (const msg of superiorMessages(targetUserId, Users)) {
						await message.channel.send(msg);
						await new Promise(res => setTimeout(res, 2500));
					}
					return;
				}

				if (includesCommand(command, 'hoarder')) {
					for (const msg of hoarderMessages(targetUserId)) {
						await message.channel.send(msg);
						await new Promise(res => setTimeout(res, 2500));
					}
					return;
				}
			}
		}
		if (includesCommand(message.content, 'muscle')) {
			if (Math.random() < 0.3) {
				await message.reply(messages.muscle)
			}
			return;
		}
		if (includesCommand(message.content, 'jesus') || includesCommand(message.content, 'god') || includesCommand(message.content, 'christ')) {
			if (Math.random() < 0.3) {
				await message.reply(messages.praise)
			}
			return;
		}
		if (includesCommand(message.content, 'gay') || includesCommand(message.content, 'gae')) {
			if (Math.random() < 0.2) {
				const gachi = getRandomContent(gachiMuchi)
				await message.reply(gachi);
			}
			return;
		}
		if (message.author.id === Users.Milzuzu) {
			if (includesCommand(message.content, '??')) {
				if (Math.random() < 0.25) {
					await message.reply(messages.throat)
				}
				return;
			}
			if (includesCommand(message.content, 'fhat')) {
				if (Math.random() < 0.25) {
					await message.reply(messages.anthem(Users.Milzuzu))
				}
				return;
			}
			if (Math.random() < 0.0001) {
				await message.reply(messages.legendary)
			}
			return;
		}
		if (message.author.id === Users.Daeryox) {
			if (startsWithCommand(message.content, '!')) {
				if (includesCommand(message.content, 'khan')) {
					for (const msg of khanMessages) {
						await message.channel.send(msg);
						await new Promise(res => setTimeout(res, 1500));
					}
					return;
				}
			}
			else {
				if (Math.random() < 0.01) {
					await message.react(messages.copium);
				}
			}
			return;
		}
		if (message.author.id === Users.Globulina && includesCommand(message.content, 'cat')) {
			const cat = getRandomContent(orangeCats)
			await message.reply(cat);
			return;
		}
		if (
			message.author.id === Users.NoPressure &&
			(includesCommand(message.content, 'jorgis') || includesCommand(message.content, 'greek'))
		) {
			if (Math.random() < 0.4) {
				await message.reply(messages.jorgis);
			}
			return;
		}
		if (message.author.id === Users.Keberion && includesCommand(message.content, 'lol')) {
			if (Math.random() < 0.25) {
				await message.reply(messages.lol);
			}
			return;
		}
		if (message.author.id === Users.Redmaur && includesCommand(message.content, 'roll')) {
			if (Math.random() < 0.25) {
				await message.reply(messages.rick);
			}
			return;
		}
		if (message.author.id === Users.WhiteDevil) {
			if (includesCommand(message.content, 'rng') || includesCommand(message.content, 'lucky')) {
				if (Math.random() < 0.1) {
					await message.reply(messages.rng);
				}
				return;
			}
			if (Math.random() < 0.002) {
				await message.reply(messages.god)
			}
			return;
		}
	}
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
	console.log('Do we log interaction')
	if (!interaction.isButton()) return;
	if (interaction.user.bot) return;

	const thread = interaction.channel;
	if (!thread?.isThread()) return;

	const message = interaction.message;
	if (!message.editable) return;

	const embed = message.embeds[0];
	if (!embed) return;

	const embedDesc = embed.description ?? '';

	const participantsLine = embedDesc.match(/\*\*Participants:\*\*\n(.+?)\n\n\n\n/)?.[1] ?? '';
	const excludedLine = embedDesc.match(/\*\*Excluded:\*\*\n(.+?)$/)?.[1] ?? '';
	const winnerCountMatch = embedDesc.match(/\*\*Winners:\*\* (\d+)/);
	const winnerCount = parseInt(winnerCountMatch?.[1] ?? '1', 10);

	const participantIds = [...participantsLine.matchAll(/<@(\d+)>/g)].map(m => m[1]);
	const excludedIds = [...excludedLine.matchAll(/<@(\d+)>/g)].map(m => m[1]);

	const joiners = new Set(participantIds);
	const isAdmin = permittedAdmins.includes(interaction.user.id);
	console.log(isAdmin, 'is user admin')
	console.log(interaction.customId, 'what is this')
	if (interaction.customId === 'join') {
		if (!excludedIds.includes(interaction.user.id)) {
			joiners.add(interaction.user.id);
		}
	} else if (interaction.customId === 'leave') {
		joiners.delete(interaction.user.id);
	} else if (interaction.customId === 'start' && isAdmin) {
			const available = [...joiners].filter(id => !excludedIds.includes(id));
			const maxWinners = Math.min(winnerCount, available.length);
			const winners: string[] = [];

			for (let i = 0; i < maxWinners; i++) {
				const index = Math.floor(Math.random() * available.length);
				const winner = available.splice(index, 1)[0];
				winners.push(`<@${winner}>`);
			}

			await interaction.update({
				components: [],
				embeds: [
					EmbedBuilder.from(embed).setFooter({ text: 'Started...' }),
				],
			});

		setTimeout(async () => {
			await thread.send({
				embeds: [
					new EmbedBuilder()
						.setTitle('Aaaand it has ended! Congratulations to all the lucky ones!')
						.setDescription(
							`**Winners (${winners.length}):**\n${winners.join(', ') || 'None'}\n\n\n\n`
						)
						.setColor(0x00AE86),
				],
				components: [],
			});
		}, 10000);

			return;
		}

	await interaction.update({
		embeds: [
			new EmbedBuilder()
				.setTitle('LADIES AND GENTLEMEN! WELCOME TO THIS EVENINGS MAIN EVENT!')
				.setDescription(
					`We're giving away 500 lucent per winner!\n\n\n` +
					`**Winners:** ${winnerCount}\n\n\n\n` +
					`**Participants:**\n${[...joiners].map(id => `<@${id}>`).join(', ') || 'None'}\n\n\n\n` +
					`**Excluded:**\n${excludedIds.map(id => `<@${id}>`).join(', ') || 'None\n\n'}`
				)
				.setColor(0xffcc00),
		],
		components: interaction.message.components,
	});
});

const token = process.env.MY_SECRET_DISCORD_KEY;
if (!token) {
	throw new Error('Discord bot token is missing!');
}
client.login(process.env.MY_SECRET_DISCORD_KEY);
