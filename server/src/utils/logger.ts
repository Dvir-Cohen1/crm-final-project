import winston, { createLogger, format, transports } from "winston";
import { format as dateFormat } from "date-fns";
import { Request } from "express";
import crypto from "crypto";

const isDevelopment = process.env.NODE_ENV === "development";
const loggerTransports: winston.transport[] = [];

// Different logger transport for different environment
if (isDevelopment) {
  loggerTransports.push(
    new winston.transports.File({
      filename: `./src/logs/${dateFormat(new Date(), "dd-MM-yy")}-app.log`,
    })
  );
} else {
  loggerTransports.push(new winston.transports.Console());
}

// Filter properties from the header request
const filterRequestHeaders = (headers: any) => {
  const allowedHeaders = [
    "host",
    "origin",
    "pragma",
    "content-type",
    "user-agent",
  ];
  const filteredHeaders: any = {};

  for (const header of allowedHeaders) {
    if (headers[header]) {
      filteredHeaders[header] = headers[header];
    }
  }

  return filteredHeaders;
};

// Add requestId property to the log message
const addRequestId = format((info, opts) => {
  const { requestId } = opts;
  if (requestId) {
    info.requestId = requestId;
  }
  return info;
});

// Generate random RequestId for each log message
const generateRequestId = (): string => {
  return crypto.randomBytes(16).toString("hex");
};

// Logger object
// const logger = createLogger({
//   level: isDevelopment ? "silly" : "info",
//   format: format.combine(
//     format.timestamp({ format: "DD-MM-YY HH:mm:ss" }),
//     addRequestId({ requestId: "" }), // Default empty string
//     format.printf(({ timestamp, level, message, tag, requestId, ...meta }) => {
//       const logMessage = `${timestamp} [${level.toUpperCase()}] ${message}`;
//       const logMeta = Object.keys(meta).length
//         ? `\n${JSON.stringify(meta, null, 2)}`
//         : "";

//       const logRequestId = requestId ? `[requestId=${requestId}] ` : "";

//       return tag
//         ? `${logMessage} ${logRequestId} [tag=${tag}] ${logMeta}`
//         : `${logMessage} ${logRequestId} ${logMeta}`;
//     })
//   ),
//   transports: loggerTransports,
// });

const logger = createLogger({
  level: isDevelopment ? "silly" : "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message, requestId, ...meta }) => {
      const logObject = {
        timestamp,
        level,
        message,
        requestId,
        ...meta
      };

      return JSON.stringify(logObject, null, 2);
    })
  ),
  transports: loggerTransports,
});



// Send log message - use this function to log something
export const sendLogger = (
  severity: string = "info",
  message: string,
  options: {} | null = null,
  request: Request | null = null,
  requestId: string = ""
) => {
  const requestInfo = request
    ? `\n  [method=${request.method}] [url=${request.url}]` +
      `\n  [headers=${JSON.stringify(
        filterRequestHeaders(request.headers),
        null,
        2
      )}]` +
      (request.ip ? `\n  [userIP=${request.ip}]` : "")
    : "";

  const userData = !isDevelopment ? ` ${requestInfo}` : "";
  const finalRequestId = requestId || generateRequestId();

  logger.log(severity, `${message} ${userData}`, {
    ...options,
    requestId: finalRequestId,
  });
};

export default logger;
