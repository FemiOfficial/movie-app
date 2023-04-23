import app from './createApp';
import { PORT } from './consts';
import Logger from './utils/logger'

const logger = new Logger('index');

app.listen(PORT, () => logger.log(`API listening on port ${PORT}`));