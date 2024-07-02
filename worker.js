const Queue = require('bull');
const imageThumbnail = require('image-thumbnail');
const dbClient = require('./utils/db');
const { redisClient } = require('./utils/redis');

const fileQueue = new Queue('fileQueue', 'redis://localhost:6379');

fileQueue.process(async (job) => {
    try {
        const { userId, fileId } = job.data;

        if (!fileId) {
            throw new Error('Missing fileId');
        }
        if (!userId) {
            throw new Error('Missing userId');
        }

        const file = await dbClient.db.collection('files').findOne({
            _id: new ObjectId(fileId),
            userId: new ObjectId(userId),
        });

        if (!file) {
            throw new Error('File not found');
        }

        if (file.type === 'image') {
            await imageThumbnail(file.localPath, { width: 500 }).then((buffer) => fs.writeFileSync(`${file.localPath}_500`, buffer));
            await imageThumbnail(file.localPath, { width: 250 }).then((buffer) => fs.writeFileSync(`${file.localPath}_250`, buffer));
            await imageThumbnail(file.localPath, { width: 100 }).then((buffer) => fs.writeFileSync(`${file.localPath}_100`, buffer));
        }
    } catch (err) {
        console.error('Error processing job:', err);
        job.retries(3);
        job.retry();
    }
});
