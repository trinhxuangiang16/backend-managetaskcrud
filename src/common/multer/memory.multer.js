import multer from "multer";

const storageMemory = multer.memoryStorage();

export const uploadMemory = multer({ storage: storageMemory });
