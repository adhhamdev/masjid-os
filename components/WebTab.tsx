"use client"

import { updateWebInfo } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { useState, useTransition } from "react";

export default function WebTab({ webInfo }: { webInfo: any }) {

    const [message, setMessage] = useState<any>(null)
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (formData: FormData) => {
        setMessage(null)
        startTransition(async () => {
            const response = await updateWebInfo(formData, webInfo)
            setMessage(response)
        })
    }

    return (
        <form action={handleSubmit}>
            <Card>
                <CardContent className="space-y-4 pt-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="title01">HISTORY 01</label>
                        <Input
                            id="title01"
                            className="focus-visible:ring-gray-500"
                            defaultValue={webInfo[0]}
                            name="title01"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="desc1">Description</label>
                        <Textarea
                            id="desc01"
                            rows={4}
                            className="focus-visible:ring-gray-500"
                            defaultValue={webInfo[1]}
                            name="desc01"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="title02">HISTORY 02</label>
                        <Input
                            id="title02"
                            className="focus-visible:ring-gray-500"
                            defaultValue={webInfo[2]}
                            name="title02"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="desc02">Description</label>
                        <Textarea
                            id="desc02"
                            rows={4}
                            className="focus-visible:ring-gray-500"
                            defaultValue={webInfo[3]}
                            name="desc02"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="title03">HISTORY 03</label>
                        <Input
                            id="title03"
                            className="focus-visible:ring-gray-500"
                            defaultValue={webInfo[4]}
                            name="title03"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="desc03">Description</label>
                        <Textarea
                            id="desc03"
                            rows={4}
                            className="focus-visible:ring-gray-500"
                            defaultValue={webInfo[5]}
                            name="desc03"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="title04">HISTORY 04</label>
                        <Input
                            id="title04"
                            className="focus-visible:ring-gray-500"
                            defaultValue={webInfo[6]}
                            name="title04"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="desc04">Description</label>
                        <Textarea
                            id="desc04"
                            rows={4}
                            className="focus-visible:ring-gray-500"
                            defaultValue={webInfo[7]}
                            name="desc04"
                        />
                    </div>
                    <div className='space-y-2'>
                        <Button
                            type="submit"
                            className='bg-emerald-500 hover:bg-emerald-600 text-white'
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                            ) : (
                                <Save className='w-4 h-4 mr-2' />
                            )}
                            Save Web Info
                        </Button>
                        {message && (
                            <FormMessage message={message} />
                        )}
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}