const moment = require('moment');

module.exports = {
	name: 'user',
	aliases: ['member', 'whois', 'memberInfo', 'userInfo'],
	description: 'Show user info!',
	category: 'utility',
	usage: '<@user>',
	enabled: true,
	execute(Yuki, message, args) {
		const target = message.mentions.members.first() || args[0] ? message.guild.members.cache.get(args[0]) || { id: args[0] } : message.member;
		const status = { online: 'Online', idle: 'Idle', dnd: 'Do Not Disturb', offline: 'Offline' };

		message.guild.members.fetch(target.id)
			.then((member) => {
				message.channel.send(new Yuki.MessageEmbed()
					.setColor(Yuki.util.hexColor.default)
					.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
					.addFields([
						{
							name: ':mag: Name:',
							value: Yuki.util.sendCode(member.user.tag, { code: 'fix' }),
							inline: true
						},
						{
							name: ':black_small_square: Nickname:',
							value: Yuki.util.sendCode(member.nickname, { code: 'js' }),
							inline: true
						},
						{
							name: ':robot: Bot:',
							value: Yuki.util.sendCode(member.user.bot ? 'Yes' : 'No'),
							inline: true
						},
						{
							name: ':id: ID:',
							value: Yuki.util.sendCode(member.id, { code: 'py' }),
							inline: false
						},
						{
							name: 'Status:',
							value: Yuki.util.sendCode(status[member.presence.status], { code: 'py' }),
							inline: true
						},
						{
							name: ':desktop: Presence:',
							value: Yuki.util.sendCode(member.user.presence.game ? member.user.presence.game.name: 'Nothing', { code: 'py' }),
							inline: true
						},
						{
							name: ':pushpin: Highest Role:',
							value: member.roles.hoist,
							inline: true
						},
						{
							name: ':art: Roles:',
							value: Yuki.util.sendCode(member.roles.cache.filter(r => r.name !== 'everyone').map(r =>  r.name).join(', ')),
							inline: false
						},
						{
							name: ':globe_with_meridians: Joined Discord:',
							value: Yuki.util.sendCode(moment(member.user.createdAt).format('lll')),
							inline: true
						},
						{
							name: ':inbox_tray: Joined Server:',
							value: Yuki.util.sendCode(moment(member.joinedAt).format('lll')),
							inline: true
						}
					])
				);
			})
			.catch((error) => {
                        	message.channel.send(new Yuki.MessageEmbed()
                                	.setColor(Yuki.util.hexColor.error)
                                	.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
                        	);
			});
	}
};