'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const { id, correo, nombre, laboratorio, fecha, horaInicio, horaFinal } = JSON.parse(event.body);

    const params = {
        TableName: "Reservas",
        Item: {
            id: id,
            correo: correo,
            nombre: nombre,
            laboratorio: laboratorio,
            fecha: fecha,
            horaInicio: horaInicio,
            horaFinal: horaFinal
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch(error) {
        responseBody = `No se pudo guardar la reservas. Error: ${error}`;
        statusCode = 403;
    }

    const response  = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*"
        },
        body: responseBody
    };

    return response;
};