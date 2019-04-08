const { CQWebSocket, CQAt } = require('cq-websocket')

// 配置文件，请更改好后再开启否则要崩
const config = {
  host: '', // ws的api地址，例如: api.example.com，这里不需要ws://
  port: 5031, // 我使用的websocket端口，你可以看情况更改
  adminQQ: 123456789, // 这里输入一个私聊qq好友号码来做提醒，请改成你自己的
  groups: [1234, 4567], // QQ群设定返还信息
}

const bot = new CQWebSocket({
  host: config.host,
  port: config.port,
})

// bot监听信息
bot
  .on('socket.error', console.error)
  .on('socket.connecting', (wsType) => console.log(`[${wsType}] Connecting...`))
  .on('socket.connect', (wsType, _, attempts) => console.log(`[${wsType}] Connected in ${attempts} attempts`))
  .on('socket.failed', (wsType, attempts) => console.log(`[${wsType}] Connect failed on ${attempts} attempts`))
  .on('socket.close', (wsType, code, desc) => console.log(`[${wsType}] Connect close: ${code} ${desc}`))
  .on('ready', () => {
    console.log(`qqbot ready`)
    // 在bot准备好后给一个好友私聊信息来提醒，纯属例子
    bot('send_private_msg', {
        user_id: config.adminQQ,
        message: 'Hello World!'
      }, {
        timeout: 10000 // 10 sec
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error('time out!')
      })
  })
  .on('api.response', (resObj) => console.log('Response: %O', resObj))
  // 连接
  .connect()
  .on('message.group', (event, context) => {
    // 如果bot接受到的信息在哪个群，做什么
    if (context.group_id in config.groups)
      return
    // 不接受匿名信息
    if (context.anonymous != null)
      return
    // 输入/roll后，@用户并且返回一个简单的随机数机数
    if (context.message === "/roll") {
      const range = 100
      return `${new CQAt(context.user_id)} ${Math.floor(Math.random() * range + 1) }/${range}`
    }
  })
  // 回复任何私聊信息都带图片的一个例子
  .on('message.private', (event, context) => {
    return [{
        "type": "text",
        "data": {
          "text": "第一部分"
        }
      },
      {
        "type": "image",
        "data": {
          "file": "https://pixiv.cat/73579139.jpg"
        }
      },
      {
        "type": "text",
        "data": {
          "text": "图片之后的部分，表情："
        }
      },
      {
        "type": "face",
        "data": {
          "id": "122"
        }
      }
    ];
  })