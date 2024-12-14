import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'

interface IUploadImage {
  req: Request
  res: Response
  Model: any
  modelName: string
  imageField: string
}

const uploadDir = path.resolve(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

export const uploadImage = async ({
  req,
  res,
  Model,
  modelName,
  imageField,
}: IUploadImage) => {
  try {
    console.log('uploading image hi')
    const FILE_TYPE_MAP: any = {
      'image/png': 'png',
      'image/jpg': 'jpg',
      'image/jpeg': 'jpeg',
      'image/webp': 'webp',
    }

    const file = req.file
    if (!file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'No file uploaded.',
      })
    }

    const isValid = FILE_TYPE_MAP[file.mimetype]
    if (!isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Unsupported file format.',
      })
    }

    const fileName = file.originalname.replace(/ /g, '-')
    const newName =
      'img' + '-' + Date.now() + '-' + fileName.split('.')[0] + '.webp'

    // Process and convert the image
    const processedImg = await sharp(file.buffer)
      .toFormat('webp', { quality: 80 })
      .toBuffer()

    // Save the processed image to the upload directory
    const filePath = path.join(uploadDir, newName)
    fs.writeFileSync(filePath, processedImg)

    // Get the document from the database using the id in req.user or req.body
    const docId = req.query.field_id
    const document = await Model.findOne({ _id: docId })

    if (!document) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: `${modelName} not found.`,
      })
    }

    // Update the document with the image path
    if (!Array.isArray(document[imageField])) {
      document[imageField] = []
    }

    document[imageField].push(newName)
    await document.save()

    res.status(StatusCodes.CREATED).json({
      status: 'Created',
      message: `${modelName} image has been uploaded successfully!`,
      data: document,
    })
  } catch (error) {
    console.error('Error uploading the image:', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Error uploading the image.',
    })
  }
}
