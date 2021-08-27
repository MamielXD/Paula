const fs = require('fs');

const qrcode = require('qrcode-terminal');

const SESSION_FILE_PATH = "./session.json";

const { MessageMedia } = require('whatsapp-web.js');

const { Client, } = require('whatsapp-web.js');

const msg = "Bot Inicializado ✅"

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}


const client = new Client({
    session: sessionData
});
client.initialize();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('El Cliente Esta Listo!');

    let chatId = "573212405621-1628820443@g.us";

    client.sendMessage(chatId, msg);
    
});

client.on('authenticated', session => {
    sessionData = session;

    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), err => {
        if(err) {
            console.error(err);
        }
    })
})

client.on('auth_failure', msg => {
    console.error('Ocurrio un error de autentificacion', msg);
});

//Regitro para Verfificación
client.on('message', async msg => {
    if (msg.body == 'Verificar') {
        const chat = await msg.getChat();
        const user = await msg.getContact();
        console.log(user);
      await chat.sendMessage(`Verificacion de @${user.id.user}\n` + 'Nombre: ' + '\nDesde: '  + msg.deviceType, { mentions: [user] });}
      
});
//Mensages
client.on('message', async msg => {
    if (msg.body == 'Hola') {
        msg.reply('Hola, Soy Paula (pero este no es mi numero)');
    }
    else if (msg.body == 'Cuanto me mide') {
        let ugu = Math.floor((Math.random() * ((35 + 1) - 0)) + 0)
        msg.reply("Te mide " + ugu + " CM bro");
    }

else if(msg.body == 'cuanto me mide') {
    let ugu = Math.floor((Math.random() * ((35 + 1) - 0)) + 0)
    msg.reply("Te mide " + ugu + " CM bro");
}
else if(msg.body === 'Todos') {
    const chat = await msg.getChat();
    
    let text = "*Miembros Del Grupo*\n";
    let mentions = [];

    for(let participant of chat.participants) {
        const contact = await client.getContactById(participant.id._serialized);
        
        mentions.push(contact);
        text += `XD@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
}
});

client.on('group_join', (notification) => {
    console.log('join', notification.id);
    client.sendMessage(notification.id.remote, 'Bienvenid@');
    
});

client.on('group_leave', (notification) => {
     if (notification.type == 'leave') {
        console.log('leave', notification.id);
        client.sendMessage(notification.id.remote, 'Chao');
     }
});

client.on('message', message => {
	if(message.body === 'XD') {
		client.sendMessage(message.from, 'XD');
	}
});

client.on('message', message => {
	if(message.body === 'XDDD') {
		client.sendMessage(message.from, 'XDDD');
	}
});

client.on('message', msg => {
    if (msg.body == 'Que') {
        msg.reply('so');
    }
    else if(msg.body == 'que') {
            msg.reply('so');
        }
    });
     
 
client.on('message', msg => {
    if (msg.body == 'Sexo') {
        msg.reply("Delicioso🤤");
    }
});

client.on('message', msg => {
    if (msg.body == 'onichan') {
const media = MessageMedia.fromFilePath('./audio/onichan.ogg');
        msg.reply(media);
    }
});

client.on('message', async msg => {
    if(msg.hasMedia && msg.body == "S") {
        const media = await msg.downloadMedia();
       msg.reply(media);
    }
});

client.on('message', async message => {
	if(message.hasMedia) {
        const media = await message.downloadMedia();
	client.sendMessage(message.from, media, { sendMediaAsSticker: true });
	}
});


client.on('message', message => {
    const sticker = MessageMedia.fromFilePath('./img/mvaf.jpeg');
	if(message.body === 'Funado') {
		client.sendMessage(message.from, sticker, { sendMediaAsSticker: true });
	}
});

client.on('message', message => {
    if(message.body == 'B'){
        console.log(message);
        client.sendMessage(message.from, "aq");
    }
    
});


