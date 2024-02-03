import multer from "multer";

const storageConfig= multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, './tmp');
  },
  filename: (req, file, cb) => {
    let randomName = Math.floor(Math.random() * 99999999);
    cb(null, `${randomName+Date.now()}.jpg`);
  }
})

export const uploadFile = multer({
  limits: { fieldSize: 5500000 },
  fileFilter: (req, file, cb)=>{
    const permitidos = ['image/jpg', 'image/jpeg', 'image/png'];
    cb(null, permitidos.includes(file.mimetype));
  },
  storage: storageConfig
});