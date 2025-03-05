"use client";
import React, {Fragment} from "react";
import { Mission } from '@prisma/client';

interface ListBillingProps {
    requests: Mission[]
}

export function ListBilling({requests}: ListBillingProps) {
    return(
        <Fragment>
            <hr className=" bg-black my-6" />
            List billing {requests.length}
        </Fragment>
    )
}