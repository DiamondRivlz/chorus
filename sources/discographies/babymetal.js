const Drive = require('../src/utils/drive');
const importDrive = require('../src/drivers/google-drive');
const ROOT_FOLDER = 'https://drive.google.com/drive/folders/17H3fTFd4nWmnwYK7MrZfqyQ2T-Y7h278';

module.exports = async () => {
  const rootId = ROOT_FOLDER.slice(ROOT_FOLDER.lastIndexOf('/') + 1);
  const folders = (await Drive.get({ q: `'${rootId}' in parents` }));
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    await importDrive({
      driveUrl: `https://drive.google.com/drive/folders/${folder.id}`,
      driveName: `BABYMETAL - ${folder.name}`,
      driveShort: folder.id
    });
  }
  return 0;
};