"use client"

import { removeMasjidImage, updateMasjidPhotos, uploadMasjidImage } from '@/app/actions'
import { useToast } from "@/components/hooks/use-toast"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2, UploadIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface MasjidImagesProps {
    initialImages: string[]
    masjidId: string
}

export function MasjidImages({ initialImages, masjidId }: MasjidImagesProps) {
    const [images, setImages] = useState<string[]>(initialImages)
    const [isUploading, setIsUploading] = useState(false)
    const [removingIndex, setRemovingIndex] = useState<number | null>(null)
    const { toast } = useToast()

    const showToast = (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
        toast({
            title,
            description,
            variant,
        })
    }

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setIsUploading(true)
        try {
            const uploadPromises = acceptedFiles.slice(0, 5 - images.length).map(file => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = async event => {
                        if (event.target?.result && typeof event.target.result === 'string') {
                            const base64Content = event.target.result.split(',')[1]
                            const fileData = {
                                name: file.name,
                                type: file.type,
                                size: file.size,
                                content: base64Content
                            }
                            try {
                                const result = await uploadMasjidImage(fileData)
                                resolve(result)
                            } catch (error) {
                                reject(error)
                            }
                        } else {
                            reject(new Error('Failed to read file'))
                        }
                    }
                    reader.onerror = () => reject(new Error('Failed to read file'))
                    reader.readAsDataURL(file)
                })
            })

            const uploadedImages = await Promise.all(uploadPromises)
            const newImages = [...images, ...uploadedImages]
            console.log('newImages: ', newImages)
            setImages(newImages)
            await updateMasjidPhotos(masjidId, newImages)
            showToast("Images uploaded successfully", "Your masjid photos have been updated.")
        } catch (error) {
            console.error('Error uploading images:', error)
            showToast("Error uploading images", "There was a problem uploading your images. Please try again.", "destructive")
        } finally {
            setIsUploading(false)
        }
    }, [images, masjidId, showToast])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 5,
        multiple: true,
        disabled: isUploading
    })

    const removeImage = async (index: number) => {
        setRemovingIndex(index)
        try {
            const imageUrl = images[index]
            await removeMasjidImage(imageUrl)
            const newImages = images.filter((_, i) => i !== index)
            setImages(newImages)
            await updateMasjidPhotos(masjidId, newImages)
            showToast("Image removed successfully", "Your masjid photos have been updated.")
        } catch (error) {
            console.error('Error removing image:', error)
            showToast("Error removing image", "There was a problem removing the image. Please try again.", "destructive")
        } finally {
            setRemovingIndex(null)
        }
    }

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Masjid Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative aspect-square shadow-inner border border-gray-300 rounded-lg overflow-hidden">
                        <Button
                            variant="destructive"
                            className="absolute top-2 right-2 w-8 h-8 p-0 bg-red-500 hover:bg-red-600 z-10"
                            onClick={() => removeImage(index)}
                            disabled={removingIndex === index}
                        >
                            {removingIndex === index ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <XIcon className="w-4 h-4" />
                            )}
                        </Button>
                        {image && (
                            <Image
                                src={image}
                                alt={`Masjid photo ${index + 1}`}
                                className="object-contain w-full h-full"
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                quality={25}
                            />
                        )}
                    </div>
                ))}
                {images.length < 5 && (
                    <div
                        {...getRootProps()}
                        className={cn(
                            "relative aspect-square shadow-inner border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer",
                            "flex items-center justify-center text-gray-400 transition-colors",
                            isDragActive && "border-emerald-500 bg-emerald-50",
                            isUploading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <input {...getInputProps()} />
                        <div className="text-center">
                            {isUploading ? (
                                <Loader2 className="h-10 w-10 animate-spin mx-auto mb-2" />
                            ) : (
                                <UploadIcon className="w-10 h-10 mx-auto mb-2" />
                            )}
                            <p className="text-sm">
                                {isUploading ? "Uploading..." : isDragActive ? "Drop the image here" : "Drag & drop or click to upload"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}