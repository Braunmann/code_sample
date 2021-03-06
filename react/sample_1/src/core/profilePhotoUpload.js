import { profilePhotouploadDir } from '../config';

const fs = require('fs');
const fse = require('fs-extra');
import bodyParser from 'body-parser';
import sharp from 'sharp';

import createUploadStorage from '../helpers/uploadStorage';

let upload = createUploadStorage(profilePhotouploadDir);

function removeFiles(fileName, filePath ) {
    if(fs.existsSync(filePath + fileName)) {
      // Original
      fs.unlink(filePath + fileName, (err) => {
        if (err) throw err;

      });
    }
    if(fs.existsSync(filePath + 'small_' + fileName)) {
      // small
      fs.unlink(filePath + 'small_' + fileName, (err) => {
        if (err) throw err;

      });
    }
    if(fs.existsSync(filePath + 'medium_' + fileName)) {
      // medium
      fs.unlink(filePath + 'medium_' + fileName, (err) => {
        if (err) throw err;

      });
    }
}
const profilePhotoUpload = app => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.post('/uploadProfilePhoto', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  },upload.single('file'), async (req, res, next) => {
    let file = req.file;
    // small - 100 * 100
    sharp(file.path)
      .rotate()
      .resize(100, 100)
      .crop(sharp.strategy.entropy)
      .toFile(profilePhotouploadDir + 'small_' + file.filename, function(err) {
    });
    // medium - 255 * 255
    sharp(file.path)
      .rotate()
      .resize(255, 255)
      .crop(sharp.strategy.entropy)
      .toFile(profilePhotouploadDir + 'medium_' + file.filename, function(err) {

    });
    res.send({ status: 'SuccessFully uploaded!', file });
  });
  app.post('/deleteProfilePicture', function (req, res, next) {
    if (!req.user) {
      res.send(403);
    } else {
      next();
    }
  }, async (req, res) => {
    let filePath = profilePhotouploadDir;
    let fileName = req.body.fileName;
    await removeFiles(fileName, filePath);
    res.send({ status: 'Got your file to remove!' });
  });


};
export default profilePhotoUpload;
