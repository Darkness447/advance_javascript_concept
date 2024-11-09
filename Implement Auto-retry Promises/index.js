// Auto Retry when a network call fails


// async function processBatch(items) {
//    return await Promise.allSettled(items.map(async (item,index) => {
//     try {
//         const metricName = item.metricName
//         const criteria = item.criteria
//         const projectId = item.projectId
//         const onlyCustomerResponses = item.onlyCustomerResponses

//         if (!item.metricName || !item.criteria || !item.timestamp || !item.projectId) {
//             return {
//                 status: "rejected",
//                 reason: "Missing required fields",
//             };
//         }

//         console.log(
//         `Metric: ${item.metricName}, 
//         Criteria: ${item.criteria}, 
//         Timestamp: ${item.timestamp}, 
//         Project ID: ${item.projectId},prompt Id:${item.promptId}`);

//         const gEvalParams = {
//             name: metricName,
//             input: item.input,
//             actualOutput: onlyCustomerResponses === "true" ? "" : item.output,
//             criteria: criteria,
//         };

//         const gEvalResponse = await fetch(`${process.env.GEVAL_SERVICE_URL}/api/geval`, {
//             method: 'POST',
//             headers: 
//             { 
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.GEVAL_API_TOKEN}`
//             },
//             body: JSON.stringify(gEvalParams),
//         });

//         if (!gEvalResponse.ok) {
//             throw new Error(`GEval API responded with status: ${gEvalResponse.status}`);
//         }

//         const gEvalResult = await gEvalResponse.json();

//         console.log("checking ...",metricName,criteria)
//         // Update the DynamoDB table with the gEvalResult
//         const updateCommand = new UpdateCommand({
//             TableName: process.env.DYNAMODB_PROMPT_ANALYTICS_TABLE,
//             Key: {
//                 projectId: projectId,
//                 timestamp: item.timestamp, // Ensure `timestamp` is included in the item
//             },
//             UpdateExpression: 'SET #metricName = :gEvalResult',
//             ExpressionAttributeNames: {
//                 '#metricName': metricName,
//             },
//             ExpressionAttributeValues: {
//                 ':gEvalResult': gEvalResult,
//             },
//         });

//         console.log("updating");
//         await docClient.send(updateCommand);

//         return {
//             status: "fulfilled",
//             gEvalResult,
//         };

//     } catch (error) {
//         console.error(`Error processing item with projectId ${item.projectId} and timestamp ${item.timestamp} , prompt Id:${item.promptId}`, error);
//         return {
//             status: "rejected",
//             reason: error.message,
//         };
//     }
// }));
// }

function fetchWithAutoRetry(fetcher, maxRetryCount) {

    let retries = 0;
    return new Promise((resolve, reject) => {
        const caller = () => fetcher().then((data) => {
            console.log("data", data)
            resolve(data)
        }).catch((error) => {
            if (retries < maxRetryCount) {
                retries++;
                caller()
            }
            else {
                reject(error)
            }
        });

        retries = 1;
        caller();
    })
}

const fetchGithubProfile = async () => {
    console.log("fetching...")
    const rawResponse = await fetch("https://api.github.com/users/Deepesh76780")
    const jsonResponse = await rawResponse.json();
    console.log(jsonResponse)
    return jsonResponse
}

fetchWithAutoRetry(fetchGithubProfile, 5)

