const { QueryType } = require('discord-player');
module.exports = {
    name: "play",
    aliases: ["p"],
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.channel.send(`${message.author}, Write the name of the music you want to search. ❌`);
        console.log(client)
        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`${message.author}, No results found! ❌`);

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.channel.send(`${message.author}, I can't join audio channel. ❌`);
        }

        await message.channel.send(`Your ${res.playlist ? 'Playlist' : 'Track'} Loading... 🎧`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    }
}