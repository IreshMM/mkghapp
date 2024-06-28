const https = require('https')
const fs = require('fs');

function getFormUrl() {
    const baseUrl = process.env.GITHUB_BASE_URL || 'https://github.com';
    const gitHubOrg = process.env.GITHUB_ORG;
    const randomStateString = Math.random().toString(36).substring(2, 15);
    const formUrl = `${baseUrl}/organizations/${gitHubOrg}/settings/apps/new?state=${randomStateString}`;
    return formUrl;
}

async function getAppCredentials(code) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: process.env.GITHUB_API_HOST || 'api.github.com',
            path: `/app-manifests/${code}/conversions`,
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github+json',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
            }
        };

        const req = https.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`);

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const jsonResponse = JSON.parse(data);
                resolve(jsonResponse);
            });
        });

        req.on('error', (error) => {
            console.error(error);
            reject(error);
        });

        req.end();
    });
}

async function writeStringToFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function writeAppId(appInformation) {
    const appId = appInformation.id;
    const fileName = 'app_id';
    const filePath = `${process.env.OUTPUT_DIR}/${fileName}`
    return writeStringToFile(filePath, appId.toString());
}

async function writeAppPrivateKey(appInformation) {
    const privateKey = appInformation.pem;
    const fileName = 'app_private_key.pem';
    const filePath = `${process.env.OUTPUT_DIR}/${fileName}`
    return writeStringToFile(filePath, privateKey);
}

async function writeAppWebhookSecret(appInformation) {
    const webhookSecret = appInformation.webhook_secret;
    const fileName = 'app_webhook_secret';
    const filePath = `${process.env.OUTPUT_DIR}/${fileName}`
    return writeStringToFile(filePath, webhookSecret);
}

async function writeAppInformation(code) {
    const appInformation = await getAppCredentials(code);
    console.log(appInformation);
    await writeAppId(appInformation);
    await writeAppPrivateKey(appInformation);
    await writeAppWebhookSecret(appInformation);
}

module.exports = {
    writeAppInformation,
    getFormUrl
};