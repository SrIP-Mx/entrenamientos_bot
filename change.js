// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him
 
 
 
const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTMzMzU5NjAzMjc5NDYyNDI3.DxqDOw.nsqsCQ9KZoOrM-oLQgL67-j-4BM";
 
client.login(token)
 
var cookie = "551837654B4570E11FE04E97B5BA9B0865590D46B5B70B28DEC135265CC3B0B4F73AB1630FBFCD59E6FA42A798292FAB42683CD548961583760ABD126AB42020F262E509967952C72B57B30B83CAE044C4359BD527FFBAC3D5F778A7D115DBE5970E67E73F72B058FE421A7E0148DB69FB59D80E5FA3833B49AB622A109BED356F708ECDB2B6DD8C47F14F72334D02F5C99C4E16094C0CFE08EA7D0C4A3791E89BBA922407466BC9E168A34C1848D0C0DED1ACE1EFC3C90CF76AD99AE064A16C2E27148CFB4A19B0ACF103B336AFDC4763895B4AA50108686C6030BCB64EB3FDCE79189A74BBE3A2B5A2B31176303A29B2556EBE21C9A157CCF2AE5083A5E131C82891C2036C36B89415CEFD8E0B239C92A36623DB5B58D7758C67056714C98F5B5B6A2A97F86D650E120F3BE2276E606D042763D5EE6AC6C602E33F598046A391BF7E1C"
var prefix = ':';
var groupId = 4105128;
var maximumRank = 15;
 
function login() {
    return roblox.cookieLogin(cookie);
}
 
login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Sesión iniciada.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Error al iniciar sesión: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
       if(!message.member.roles.some(r=>["promociones"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("No puedes usar este comando.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Por favor inserta un rango.");
        if (username){
            message.channel.send(`Checando ROBLOX buscando a ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} es rango ${rank} y  no promovible.`)
                    } else {
                        message.channel.send(`${id} es rango ${rank} y promovible.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(promociones){
                            message.channel.send(`Rango cambiado a ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Rango Cambiado de manera exitosa!")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("No encontré al jugador en el grupo.")
                });
            }).catch(function(err){
                message.channel.send(`Disculpa, pero ${username} no existe en ROBLOX.`)
          });
      } else {
          message.channel.send("Inserta un usuario, por favor.")
      }
      return;
  }
})
