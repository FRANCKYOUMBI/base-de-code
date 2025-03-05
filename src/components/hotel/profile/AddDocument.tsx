'use client'
import Link from 'next/link'
import { useState } from "react";

export const AddDocument = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setFile(file);
    };
    return (
        <div
            className="w-[100%] shadow-profile-hotel p-[30px] h-full flex flex-col justify-start items-start gap-[30px] rounded-[20px]"
        >
            <h4 className="text-xl font-[600]">
                Documents à disposition des Extra
            </h4>
            <label className="w-[100%] border-dashed border-[1px] border-black p-[30px] cursor-pointer"
                htmlFor="file-upload">
                <div className="flex justify-between items-center">
                    <div className="text-center">
                        <p>Charger un fichier ou</p>
                        <p>Glisser / déposer</p>
                    </div>
                    <img src="/upload.svg" alt="upload-icon" />
                </div>
                <input className="hidden"
                     onChange={handleFileChange} 
                    id="file-upload" type="file" />
            </label>
            {/* <div className="flex justify-end w-[100%]">
                            <Link
                                className="text-primary underline text-[16px] font-[700] leading-[26px]"
                                href={"#"}
                            >
                                Mettre à jour
                            </Link>
                        </div> */}
            <div className="flex flex-col justify-center items-start gap-[10px] w-[100%]">
                {Array(4).fill(0).map((_) =>
                    <div className="flex justify-between items-center w-[100%]">
                        <div className="flex justify-start items-center gap-[20px]">
                            <img
                                src="/document_purple_icon.svg"
                                alt="document file pdf"
                                className="w-auto h-[40px]"
                            />
                            <Link
                                href={"#"}
                                className="text-[18px] text-[#373737] underline font-[400] leading-[24px]"
                            >
                                Codes d’accès ...
                            </Link>
                        </div>
                        <img
                            src="/attach-file.svg"
                            alt="document file pdf"
                            className="w-[20px] h-[20px]"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
