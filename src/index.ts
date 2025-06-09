import dotenv from 'dotenv';
dotenv.config();

import {
	ActionRowBuilder,
	ButtonBuilder,
	Client,
	GatewayIntentBits,
	ButtonStyle,
	Interaction,
	Events,
	EmbedBuilder, TextChannel, Snowflake
} from 'discord.js';
import {gachiMuchi, labels, messages, orangeCats} from "./messages";
import {commandChannel, eventChannel, permittedAdmins, permittedChannels, Users} from "./permissions";
import {getRandomCatGif, includesCommand, startsWithCommand} from "./functions";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
	],
});

client.once('ready', () => {
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', async (message) => {
	const targetChannelId = '1381342459413659768';
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
			const parts = message.content.split(' ');
			const winnerCount = parseInt(parts[1], 10);

			if (isNaN(winnerCount) || winnerCount <= 0) {
				await message.reply(
					'You idiot, use it like this: `!raffle <number of raffles>, like !raffle 5`'
				);
				return;
			}

			let excludedIds: string[] = [];
			if (parts.length > 2) {
				const excludePart = parts.slice(2).join(' ').trim();
				const match = excludePart.match(/\[([^\]]+)\]/);
				if (match) {
					excludedIds = match[1]
						.split(',')
						.map(id => id.trim())
						.filter(id => id.length > 0);
				}
			}

			const joiners = new Map<string, string>();

			const embed = new EmbedBuilder()
				.setTitle('LADIES AND GENTLEMEN! WELCOME TO THIS EVENINGS MAIN EVENT!')
				.setDescription(
					`We're giving away 500 lucent per winner!\n\n\n` +
					`**Winners:** ${winnerCount}\n\n\n\n` +
					`**Participants:**\nNone\n\n\n\n` +
					`**Excluded:**\n${excludedIds.length > 0 ? excludedIds.map(id => `<@${id}>`).join(', ') : 'None'}`
				)
				.setColor(0xffcc00);

			const initialRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setCustomId('join')
					.setLabel(labels.join)
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('leave')
					.setLabel(labels.leave)
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId('start')
					.setLabel(labels.start)
					.setStyle(ButtonStyle.Primary)
			);

			const thread = await targetChannel.threads.create({
				name: labels.raffleName,
				reason: labels.raffleReason,
			});

			const raffleMessage = await thread.send({
				embeds: [embed],
				components: [initialRow],
			});

			let started = false;

			const collector = raffleMessage.createMessageComponentCollector({});

			collector.on('collect', async interaction => {
				if (interaction.user.bot) {
					await interaction.deferUpdate();
					return;
				}

				const isAdmin = permittedAdmins.includes(interaction.user.id);

				if (interaction.customId === 'join') {
					if (!excludedIds.includes(interaction.user.id)) {
						joiners.set(interaction.user.id, interaction.user.username);
					}
					await interaction.deferUpdate();
				} else if (interaction.customId === 'leave') {
					joiners.delete(interaction.user.id);
					await interaction.deferUpdate();
				} else if (interaction.customId === 'start') {
					if (!isAdmin) {
						await interaction.deferUpdate();
						return;
					}
					started = true;

					const finalJoinersArray = Array.from(joiners.keys());
					const finalJoiners = finalJoinersArray.map(id => `<@${id}>`).join(', ');

					let winners: string[] = [];
					let available = finalJoinersArray.filter(id => !excludedIds.includes(id));
					const maxWinners = Math.min(winnerCount, available.length);

					for (let i = 0; i < maxWinners; i++) {
						const winnerIndex = Math.floor(Math.random() * available.length);
						const winnerId = available.splice(winnerIndex, 1)[0];
						winners.push(`<@${winnerId}>`);
					}

					await interaction.update({
						embeds: [
							new EmbedBuilder()
								.setTitle('Liftoff! Countdown has started!')
								.setDescription('Selecting winners in **30 seconds**...\n\n\n' +
									`We're giving away 500 lucent per winner!\n\n\n\n` +
									`**Winners to draw:** ${winnerCount}\n\n\n\n` +
									`**Participants:**\n${finalJoiners || 'None'}\n\n\n\n` +
									`**Excluded:**\n${excludedIds.length > 0 ? excludedIds.map(id => `<@${id}>`).join(', ') : 'None'}`)
								.setColor(0x3498db),
						],
						components: [],
					});

					setTimeout(async () => {
						await raffleMessage.edit({
							embeds: [
								new EmbedBuilder()
									.setTitle('Aaaand it has ended! Congratulations to all the lucky ones!')
									.setDescription(
										`500 lucent per winner!\n\n\n` +
										`**Winners (${winners.length}):**\n${winners.join(', ') || 'None'}\n\n\n\n` +
										`**Participants:**\n${finalJoiners || 'None'}\n\n\n\n` +
										`**Excluded:**\n${excludedIds.length > 0 ? excludedIds.map(id => `<@${id}>`).join(', ') : 'None'}`
									)
									.setColor(0x00AE86),
							],
							components: [],
						});

						collector.stop();
					}, 30000);

					collector.stop();
				}

				if (!started && (interaction.customId === 'join' || interaction.customId === 'leave')) {
					const joinerList = joiners.size > 0
						? Array.from(joiners.keys()).map(id => `<@${id}>`).join(', ')
						: 'None';

					await interaction.editReply?.({
						embeds: [
							new EmbedBuilder()
								.setTitle('LADIES AND GENTLEMEN! WELCOME TO THIS EVENINGS MAIN EVENT!')
								.setDescription(
									`We're giving away 500 lucent per winner!\n\n\n` +
									`**Winners:** ${winnerCount}\n\n\n\n` +
									`**Participants:**\n${joinerList}\n\n\n\n` +
									`**Excluded:**\n${excludedIds.length > 0 ? excludedIds.map(id => `<@${id}>`).join(', ') : 'None'}`
								)
								.setColor(0xffcc00),
						],
						components: [initialRow],
					}).catch(async () => {
						// fallback update
						await interaction.update({
							embeds: [
								new EmbedBuilder()
									.setTitle('We are ready to start the raffle!')
									.setDescription(
										`We're giving away 500 lucent per winner!\n\n\n` +
										`**Winners:** ${winnerCount}\n\n\n\n` +
										`**Joiners:**\n${joinerList}\n\n\n\n` +
										`**Excluded:**\n${excludedIds.length > 0 ? excludedIds.map(id => `<@${id}>`).join(', ') : 'None'}`
									)
									.setColor(0xffcc00),
							],
							components: [initialRow],
						});
					});
				}
			});
		}
		if (includesCommand(message.content, 'ping') && (message.author.id === Users.Daeryox || message.author.id === Users.Finngolian)) {
			await message.reply(messages.pong)
			return;
		}
	} else {
		if (includesCommand(message.content, 'muscle')) {
			if (Math.random() < 0.3) {
				await message.reply(messages.muscle)
			}
			return;
		}
		if (includesCommand(message.content, 'gay') || includesCommand(message.content, 'gae')) {
			if (Math.random() < 0.2) {
				const cat = getRandomCatGif(gachiMuchi)
				await message.reply(cat);
			}
			return;
		}
		if (message.author.id === Users.Milzuzu && includesCommand(message.content, '??')) {
			if (Math.random() < 0.25) {
				await message.reply(messages.throat)
			}
			return;
		}
		if (message.author.id === Users.Milzuzu && includesCommand(message.content, 'fhat')) {
			if (Math.random() < 0.25) {
				await message.reply(messages.anthem(Users.Milzuzu))
			}
			return;
		}
		if (message.author.id === Users.Daeryox) {
			if (Math.random() < 0.1) {
				await message.react(messages.copium);
			}
			return;
		}
		if (message.author.id === Users.Globulina && includesCommand(message.content, 'cat')) {
			const cat = getRandomCatGif(orangeCats)
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
				await message.reply(messages.jorgis);
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
			if (Math.random() < 0.02) {
				await message.reply(messages.god)
			}
			return;
		}
	}
});

const token = process.env.MY_SECRET_DISCORD_KEY;
if (!token) {
	throw new Error('Discord bot token is missing!');
}
client.login(process.env.MY_SECRET_DISCORD_KEY);
