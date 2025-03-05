import React from "react";
import { getDocuments } from "@/services/getData";

export default async function Document() {
    const documents = await getDocuments();
    return (
        <main className="">
            <div className="mb-14 px-6 md:px-12 lg:px-6 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-y-14">
                {
                    documents?.map((value, index) => {
                        const extension = value.name.substring(value.name.lastIndexOf(".") + 1)
                        return (
                            <div key={index} className=" flex flex-col cursor-pointer  items-center ">
                                {
                                    extension === "pdf" ?
                                        <img
                                            src={"/document_purple_icon.svg"}
                                            alt="document file pdf"
                                            className="!w-[100px] !h-[100px]"
                                        />
                                        :
                                        <img
                                            src={"/file.png"}
                                            alt="document file pdf"
                                            className="!w-[100px] !h-[100px]"
                                        />
                                }

                                <p className=" text-center text-black text-base break-words overflow-visible max-w-[100px] mt-2">{value.name}</p>
                            </div>
                        );
                    })
                }
            </div>
        </main>
    )
}