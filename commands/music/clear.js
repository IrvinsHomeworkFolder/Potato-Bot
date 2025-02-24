module.exports = {
    name: 'clear',
    aliases: [],

    async execute(message, args, cmd, client) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, No music currently playing. ❌`);

        if (!queue.tracks[0]) return message.channel.send(`${message.author}, There is already no music in queue after the current one ❌`);

        await queue.clear();

        message.channel.send(`The queue has just been cleared. 🗑️`);
    },
};