import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  })

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition-colors">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-green-500">Drop the image here ...</p>
      ) : (
        <p>Drag 'n' drop an image here, or click to select a file</p>
      )}
      <Button type="button" className="mt-4 bg-green-600 hover:bg-green-700 text-white">
        Select File
      </Button>
    </div>
  )
}