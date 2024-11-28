const { QueueMessageType } = require("../constants/QueueMessageType");
const RabbitConnectionManager = require("../message_stream/RabbitMQConnectionManager");
const BUDGETS_SERVER = process.env.BUDGETS_SERVER;
const RABBIT_MQ_INSTANCE_NAME = process.env.RABBIT_MQ_INSTANCE_NAME;
const serviceLogic = require("../serviceHandler/serviceLogic");
const { sendToLog } = require("./sendToLogQueue");

const messageTypeQueue = async (incomingMessage) => {
  let parsedMessage;
  try {
    try {
      parsedMessage = JSON.parse(incomingMessage.content.toString());
      const { type} = parsedMessage;
      // await sendToLog("info", type);
      let extractData;
      let response;
      console.log(parsedMessage)
      switch (type) {

        case QueueMessageType.GET_SUM_BUDGETS:
          console.log("fdhsfhfgjfg")
          extractData = parsedMessage.data.userId

          response = await serviceLogic.getSumIncomes(extractData);
          break;

          case QueueMessageType.CREATE_BUDGETS:
            console.log("fdhsfhfgjfg")
            extractData = parsedMessage.data.userBudgets
  
             await serviceLogic.createBudgets(extractData);
            break;
            case QueueMessageType.CHECK_IS_EXSIST:
              //console.log("fdhsfhfgjfg")
              extractData = parsedMessage.data.userId
    
               await serviceLogic.checkIsExsist(extractData);
              break;
              case QueueMessageType.UPDATE_BUDGETS:
              //console.log("fdhsfhfgjfg")
              extractData = parsedMessage.data.updateBudgets
    
               await serviceLogic.updateBudgets(extractData);
              break;
  
        default:


      }

      const responseMessage = {
        type: parsedMessage.type,
        id: parsedMessage?.id,
        code: 200,
        data: response,
        error: false,
      };



      await RabbitConnectionManager.pushMessageToQueue(
        RABBIT_MQ_INSTANCE_NAME,
        BUDGETS_SERVER,
        JSON.stringify(responseMessage)
      );
    } catch (error) {
      console.log(error)
      // await sendToLog(
      //   "error",
      //   `$type: ${parsedMessage.type} error: ${error.errorType.message}`
      // );
      if (error.errorType.returnMessageToUser === false) {
        let generalError = {
          httpCode: 400,
          message: "Something went wrong please try again",
          returnMessageToUser: true,
          sendEmail: false,
          writeToFile: true,
        };
        const responseMessageError = {
          type: parsedMessage.type,
          id: parsedMessage?.id,
          code: generalError.httpCode,
          data: generalError.message,
          error: true,
        };
        await RabbitConnectionManager.pushMessageToQueue(
          RABBIT_MQ_INSTANCE_NAME,
          USER_BOND,
          JSON.stringify(responseMessageError)
        );
      } else {
        const responseMessageError = {
          type: parsedMessage.type,
          id: parsedMessage?.id,
          code: error.errorType.httpCode,
          data: error.errorType.message,
          error: true,
        };
        await RabbitConnectionManager.pushMessageToQueue(
          RABBIT_MQ_INSTANCE_NAME,
          USER_BOND,
          JSON.stringify(responseMessageError)
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  messageTypeQueue,
};
