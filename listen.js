const Discord = require('discord.js');
const bot = new Discord.Client();

var fs = require("fs");

bot.login('insert token here');

bot.on('ready', () =>
{
	console.log('Time to listen!');
	bot.user.setStatus('online');
});

bot.on('message', message =>
{
	listenToMessage(message);
	
	if(message.content === '!!!ping')
	{
		if(message.author.id === '164149768040218624' || '215135968829767681')
		{
			var startTime = new Date().getTime();
			message.channel.sendMessage("Response delay: -").then(message => 
			{
				var elapsed = new Date().getTime() - startTime;
				return message.edit('Response delay: ' + elapsed + ' ms.');
			}).catch(console.error);
		}
	}	
	if(message.member.roles.find('hoist', true) !== null)
	{
		col = message.member.roles.find('hoist', true).color;
	}
	else
	{
		col = 999999;
	}	
	if(bot.users.get('164149768040218624').presence.status !== "online")
	{
		iceStatus = bot.users.get('164149768040218624').presence.status;
		inputMessage = message.content.toLowerCase(); 
		if(inputMessage.includes("icy") | inputMessage.includes("jon") | inputMessage.includes("icetech"))
		{
			nameOf = message.member;
			guildOf = message.channel;
			bot.channels.get('297924909168984064').sendMessage("While you were " + iceStatus + ", " + nameOf.displayName + " mentioned your name in " + guildOf.name, 
			{embed: 
				{
					color: col,
					author: 
					{
						name: message.member.displayName,
						icon_url: message.author.avatarURL
					},
					fields: 
					[
						{
							name: 'Person who mentioned you:',
							value: "<@" + nameOf.id + ">"
						},
						{
							name: 'Channel where you were mentioned:',
							value: "<#" + guildOf.id + ">"
						},
						{
							name: 'Message mentioning you:',
							value: message.content
						},					
					],
					timestamp: new Date(),
				}
			});		
			
		}
	}		
});

bot.on("guildMemberAdd", (member) => 
{
	embedUsers(60000,member," has joined the server.")
});

bot.on("guildMemberRemove", (member) => 
{
	embedUsers(16711680,member," has left the server.")
});

function embedUsers(inputColor,member,textMessage)
{
	bot.channels.get('269269550837530625').sendMessage("", 
	{embed: 
		{
			author: 
			{
				name: member.displayName,
			},
			thumbnail: 
			{
				url: member.user.avatarURL
			},
			color: inputColor,
			description: member.user + textMessage,
			timestamp: new Date(),
		}
	});
}

function listenToMessage(inputMessage)
{
	if (inputMessage.author.id !== '257029038273593344')
	{	
		name = inputMessage.author.username;
		idNum = inputMessage.author.id;
		if (inputMessage.channel.members.get(idNum).nickname != null) nickname = inputMessage.channel.members.get(idNum).nickname;
		else nickname = "None";
		dateSent = new Date().toString();
		dateSent = dateSent.split(' GMT');
		dateSent = dateSent[0];
		userInfo = "Username: " + name + "\r\nNickname: " + nickname + "\r\nDate Sent: " + dateSent + "\r\nMessage: " + inputMessage;
		fileInfo = idNum + ' ' + name + ' ' + nickname;	
		var contents = fs.writeFile('users/'+ fileInfo + '.txt', userInfo, function(error){});
	}
}