"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, FileText, Image as ImageIcon, Archive, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function FileCenterForm({ projectId }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("success");
    const [dialogMessage, setDialogMessage] = useState("");


    useEffect(() => {
        fetch(`/api/files/list?projectId=${projectId}`)
            .then((res) => res.json())
            .then(setFiles);
    }, [projectId]);

    async function handleUpload(e) {
        const file = e.target.files[0];
        console.log(file);
        if (!file) return;

        setUploading(true);

        setProgress(10);
        try {
            const res = await fetch("/api/files/create-upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectId,
                    fileName: file.name,
                    fileSize: file.size,
                    mimeType: file.type,
                }),
            });

            if (!res.ok) {
                throw new Error(res.error || "Upload failed");
            }

            setProgress(40);

            const { uploadUrl, fileId } = await res.json();

            await fetch(uploadUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type || "application/octet-stream",
                },
            });

            setProgress(80);

            await fetch("/api/files/confirm-upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileId }),
            });

            setProgress(100);

            setDialogType("success");
            setDialogMessage("File uploaded successfully.");
            setDialogOpen(true);

            fetch(`/api/files/list?projectId=${projectId}`)
                .then((res) => res.json())
                .then(setFiles);
        } catch (error) {
            console.error(error);

            setDialogType("error");
            setDialogMessage(error.message || "Something went wrong");
            setDialogOpen(true);
        } finally {
            setUploading(false);
            setProgress(0);
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">File Center</h2>
                <label className="cursor-pointer">
                    <Input type="file" ref={fileInputRef} className="hidden" onChange={handleUpload} />
                    <Button size="sm" disabled={uploading} onClick={handleButtonClick}>
                        <Upload className="mr-2 h-4 w-4" /> Upload File
                    </Button>
                </label>
            </CardHeader>

            <CardContent className="space-y-3">
                {uploading && <Progress value={progress} />}

                {files.length === 0 && (
                    <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
                )}

                {files.map((file) => (
                    <FileRow key={file._id} file={file} />
                ))}
            </CardContent>
        </Card>
    );
}

function FileRow({ file }) {
    const icon = getIcon(file.category);

    async function download() {
        try {
            const res = await fetch(`/api/files/download?fileId=${file._id}`);
            const { url } = await res.json();
            window.open(url, "_blank");
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
                {icon}
                <div>
                    <p className="text-sm font-medium">{file.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                </div>
            </div>

            <Button size="icon" variant="ghost" onClick={download}>
                <Download className="h-4 w-4" />
            </Button>
        </div>
    );
}

function getIcon(category) {
    if (category === "image") return <ImageIcon className="h-5 w-5" />;
    if (category === "archive") return <Archive className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
}
