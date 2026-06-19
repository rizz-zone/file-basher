import { Client, GatewayIntentBits, Message } from 'discord.js'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
})

client.on('clientReady', () => {
	console.log('file basher 2283 is online')
})

client.on('messageCreate', async (message: Message) => {
	if (message.author.bot) return

	const hasBannedFile = message.attachments.some((attachment) => {
		const name = attachment.name?.toLowerCase() || ''
		return name.endsWith('.exe') || name.endsWith('.zip')
	})

	if (hasBannedFile) {
		try {
			await message.delete()
		} catch (err) {
			console.error('failed to bash file:', err)
		}
	}
})

client.login(process.env.DISCORD_TOKEN)
