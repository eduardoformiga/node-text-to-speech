const axios = require("axios");
const TotalVoice = require("totalvoice-node");
const client = new TotalVoice(process.env.TOTAL_VOICE_API_KEY);

const servers = [
  {
    name: "Servidor 1",
    url: "http://localhost:4001",
    developer: {
      name: "Eduardo Formiga",
      telephone: process.env.DEVELOPER_PHONE
    }
  },
  {
    name: "Servidor 2",
    url: "http://localhost:4002",
    developer: {
      name: "Eduardo Formiga",
      telephone: process.env.DEVELOPER_PHONE
    }
  }
];

setInterval(async () => {
  console.log("Iniciando monitoramento dos servidores");
  for (const server of servers) {
    const response = await axios({
      url: server.url,
      methods: "get"
    }).catch(() => {
      console.log(`${server.name} está fora do ar`);
      const message = `${server.developer.name}, o servidor ${server.name} está fora do ar por favor faça alguma coisa o mais rápido possível`;
      const options = {
        velocidade: 2,
        tipo_voz: 'br-Recife'
      }
      const responseTTS = await client.tts.enviar(server.developer.telephone, message, options);
      console.log(`O desenvolvedor ${server.developer.name} já foi avisado`);
      
    });

    if (response) console.log(`${server.name} está no ar`);
  }
  console.log("Finalizando monitoramento dos servidores");
}, 15 * 60 * 1000); // 15 minutos
