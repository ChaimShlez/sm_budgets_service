require('dotenv').config()
const RabbitConnectionManager = require('./message_stream/RabbitMQConnectionManager')
const { messageTypeQueue } = require("./helper/messageType")
const RABBIT_MQ_INSTANCE_NAME = process.env.RABBIT_MQ_INSTANCE_NAME;

const SERVER_BUDGETS = process.env.SERVER_BUDGETS

const launchServer = async () => {
    try {
      await RabbitConnectionManager.initialize()
      await RabbitConnectionManager.listenToQueueMessages(RABBIT_MQ_INSTANCE_NAME,SERVER_BUDGETS,messageTypeQueue)
  
      console.log('[SERVER] budgets service is running successfully')

    } catch (error) {
    console.log(error)
    }
  }
  
  launchServer()